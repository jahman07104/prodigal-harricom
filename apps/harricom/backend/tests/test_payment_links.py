import hashlib
import hmac
import json
import time

from fastapi.testclient import TestClient
from uuid import uuid4


def _create_order(client: TestClient) -> str:
    payload = {
        "customer_name": "Jahman Brown",
        "customer_phone": "+18760000000",
        "idempotency_key": f"order-{uuid4().hex}",
        "items": [
            {"template_slug": "barber", "title": "Barber Pro", "quantity": 1, "unit_price_minor": 250000}
        ],
    }
    resp = client.post("/orders", json=payload)
    assert resp.status_code == 201
    return resp.json()["order"]["id"]


def _sign(secret: str, payload: bytes) -> str:
    return hmac.new(secret.encode("utf-8"), payload, hashlib.sha256).hexdigest()


def _stripe_signature_header(secret: str, payload: bytes, timestamp: int | None = None) -> str:
    ts = int(time.time()) if timestamp is None else timestamp
    signed_payload = f"{ts}.".encode("utf-8") + payload
    digest = hmac.new(secret.encode("utf-8"), signed_payload, hashlib.sha256).hexdigest()
    return f"t={ts},v1={digest}"


def test_create_payment_link_returns_201(client) -> None:
    order_id = _create_order(client)

    payload = {
        "provider": "wipay",
        "success_url": "https://harricom.com/pay/success",
        "cancel_url": "https://harricom.com/pay/cancel",
    }

    resp = client.post(f"/orders/{order_id}/payment-link", json=payload)
    assert resp.status_code == 201
    body = resp.json()
    assert body["ok"] is True
    assert body["reused"] is False
    assert body["payment"]["provider"] == "wipay"
    assert "checkout.wipayfinancial.com" in body["payment"]["url"]
    assert body["order"]["payment_status"] == "pending"


def test_create_payment_link_reuse_returns_200(client) -> None:
    order_id = _create_order(client)

    payload = {
        "provider": "stripe",
        "success_url": "https://harricom.com/pay/success",
        "cancel_url": "https://harricom.com/pay/cancel",
    }

    first = client.post(f"/orders/{order_id}/payment-link", json=payload)
    second = client.post(f"/orders/{order_id}/payment-link", json=payload)

    assert first.status_code == 201
    assert second.status_code == 200
    assert second.json()["reused"] is True
    assert second.json()["payment"]["url"] == first.json()["payment"]["url"]


def test_create_payment_link_order_not_found_returns_404(client) -> None:
    payload = {
        "provider": "wipay",
        "success_url": "https://harricom.com/pay/success",
        "cancel_url": "https://harricom.com/pay/cancel",
    }

    resp = client.post("/orders/not-a-real-order-id/payment-link", json=payload)
    assert resp.status_code == 404


def test_payment_webhook_marks_order_paid(client) -> None:
    order_id = _create_order(client)
    link_payload = {
        "provider": "stripe",
        "success_url": "https://harricom.com/pay/success",
        "cancel_url": "https://harricom.com/pay/cancel",
    }
    link_resp = client.post(f"/orders/{order_id}/payment-link", json=link_payload)
    assert link_resp.status_code == 201
    order = link_resp.json()["order"]

    webhook_event = {
        "order_number": order["order_number"],
        "payment_status": "paid",
        "amount_minor": order["total_minor"],
        "currency": order["currency"],
        "provider_payment_id": "evt_001",
    }
    raw = json.dumps(webhook_event, separators=(",", ":")).encode("utf-8")
    signature = _sign("test-stripe-secret", raw)

    resp = client.post(
        "/payments/webhook/stripe",
        content=raw,
        headers={"x-harricom-signature": signature, "content-type": "application/json"},
    )

    assert resp.status_code == 200
    body = resp.json()
    assert body["ok"] is True
    assert body["applied"] is True
    assert body["order"]["payment_status"] == "paid"
    assert body["order"]["status"] == "paid"


def test_payment_webhook_invalid_signature_returns_401(client) -> None:
    order_id = _create_order(client)
    link_payload = {
        "provider": "wipay",
        "success_url": "https://harricom.com/pay/success",
        "cancel_url": "https://harricom.com/pay/cancel",
    }
    link_resp = client.post(f"/orders/{order_id}/payment-link", json=link_payload)
    assert link_resp.status_code == 201
    order = link_resp.json()["order"]

    webhook_event = {
        "order_number": order["order_number"],
        "payment_status": "paid",
        "amount_minor": order["total_minor"],
    }
    raw = json.dumps(webhook_event, separators=(",", ":")).encode("utf-8")

    resp = client.post(
        "/payments/webhook/wipay",
        content=raw,
        headers={"x-harricom-signature": "bad-signature", "content-type": "application/json"},
    )

    assert resp.status_code == 401


def test_payment_webhook_duplicate_event_is_deduplicated(client) -> None:
    order_id = _create_order(client)
    link_payload = {
        "provider": "stripe",
        "success_url": "https://harricom.com/pay/success",
        "cancel_url": "https://harricom.com/pay/cancel",
    }
    link_resp = client.post(f"/orders/{order_id}/payment-link", json=link_payload)
    assert link_resp.status_code == 201
    order = link_resp.json()["order"]

    webhook_event = {
        "order_number": order["order_number"],
        "payment_status": "paid",
        "amount_minor": order["total_minor"],
        "provider_payment_id": "evt_replay_001",
    }
    raw = json.dumps(webhook_event, separators=(",", ":")).encode("utf-8")
    signature = _sign("test-stripe-secret", raw)
    headers = {
        "x-harricom-signature": signature,
        "x-harricom-event-id": "event-replay-001",
        "content-type": "application/json",
    }

    first = client.post("/payments/webhook/stripe", content=raw, headers=headers)
    second = client.post("/payments/webhook/stripe", content=raw, headers=headers)

    assert first.status_code == 200
    assert first.json()["applied"] is True
    assert first.json()["deduplicated"] is False

    assert second.status_code == 200
    assert second.json()["applied"] is False
    assert second.json()["deduplicated"] is True
    assert second.json()["order"]["payment_status"] == "paid"


def test_payment_webhook_stripe_native_signature_and_payload(client) -> None:
    order_id = _create_order(client)
    link_payload = {
        "provider": "stripe",
        "success_url": "https://harricom.com/pay/success",
        "cancel_url": "https://harricom.com/pay/cancel",
    }
    link_resp = client.post(f"/orders/{order_id}/payment-link", json=link_payload)
    assert link_resp.status_code == 201
    order = link_resp.json()["order"]

    stripe_event = {
        "id": "evt_native_001",
        "type": "checkout.session.completed",
        "data": {
            "object": {
                "id": "cs_test_001",
                "client_reference_id": order["order_number"],
                "amount_total": order["total_minor"],
                "currency": order["currency"].lower(),
                "payment_intent": "pi_test_001",
            }
        },
    }
    raw = json.dumps(stripe_event, separators=(",", ":")).encode("utf-8")
    stripe_sig = _stripe_signature_header("test-stripe-secret", raw)

    resp = client.post(
        "/payments/webhook/stripe",
        content=raw,
        headers={"stripe-signature": stripe_sig, "content-type": "application/json"},
    )

    assert resp.status_code == 200
    body = resp.json()
    assert body["ok"] is True
    assert body["applied"] is True
    assert body["deduplicated"] is False
    assert body["event_id"] == "evt_native_001"
    assert body["order"]["payment_status"] == "paid"


def test_payment_webhook_diagnostics_requires_admin_token(client) -> None:
    resp = client.get("/payments/webhooks/diagnostics")
    assert resp.status_code == 401


def test_payment_webhook_diagnostics_reports_recent_activity(client) -> None:
    order_id = _create_order(client)
    link_payload = {
        "provider": "stripe",
        "success_url": "https://harricom.com/pay/success",
        "cancel_url": "https://harricom.com/pay/cancel",
    }
    link_resp = client.post(f"/orders/{order_id}/payment-link", json=link_payload)
    assert link_resp.status_code == 201
    order = link_resp.json()["order"]

    failed_event = {
        "order_number": order["order_number"],
        "payment_status": "paid",
        "amount_minor": order["total_minor"],
    }
    failed_raw = json.dumps(failed_event, separators=(",", ":")).encode("utf-8")
    failed_resp = client.post(
        "/payments/webhook/stripe",
        content=failed_raw,
        headers={"x-harricom-signature": "bad-signature", "content-type": "application/json"},
    )
    assert failed_resp.status_code == 401

    success_event = {
        "id": "evt_diag_001",
        "type": "checkout.session.completed",
        "data": {
            "object": {
                "id": "cs_diag_001",
                "client_reference_id": order["order_number"],
                "amount_total": order["total_minor"],
                "currency": order["currency"].lower(),
                "payment_intent": "pi_diag_001",
            }
        },
    }
    success_raw = json.dumps(success_event, separators=(",", ":")).encode("utf-8")
    success_sig = _stripe_signature_header("test-stripe-secret", success_raw)
    success_resp = client.post(
        "/payments/webhook/stripe",
        content=success_raw,
        headers={"stripe-signature": success_sig, "content-type": "application/json"},
    )
    assert success_resp.status_code == 200

    diag_resp = client.get(
        "/payments/webhooks/diagnostics?limit=5",
        headers={"Authorization": "Bearer test-admin-token"},
    )
    assert diag_resp.status_code == 200
    body = diag_resp.json()
    assert body["total_attempts"] >= 2
    assert any(item["outcome"] == "applied" for item in body["by_outcome"])
    assert any(item["outcome"] == "failed" for item in body["by_outcome"])
    assert any(item["provider"] == "stripe" for item in body["by_provider"])
    assert any(item["outcome"] == "failed" for item in body["recent_attempts"])


def test_payment_webhook_csv_export_returns_content(client) -> None:
    order_id = _create_order(client)
    link_payload = {
        "provider": "stripe",
        "success_url": "https://harricom.com/pay/success",
        "cancel_url": "https://harricom.com/pay/cancel",
    }
    link_resp = client.post(f"/orders/{order_id}/payment-link", json=link_payload)
    assert link_resp.status_code == 201
    order = link_resp.json()["order"]

    stripe_event = {
        "id": "evt_export_001",
        "type": "checkout.session.completed",
        "data": {
            "object": {
                "id": "cs_export_001",
                "client_reference_id": order["order_number"],
                "amount_total": order["total_minor"],
                "currency": order["currency"].lower(),
                "payment_intent": "pi_export_001",
            }
        },
    }
    raw = json.dumps(stripe_event, separators=(",", ":")).encode("utf-8")
    stripe_sig = _stripe_signature_header("test-stripe-secret", raw)
    webhook_resp = client.post(
        "/payments/webhook/stripe",
        content=raw,
        headers={"stripe-signature": stripe_sig, "content-type": "application/json"},
    )
    assert webhook_resp.status_code == 200

    export_resp = client.get(
        "/payments/webhooks/export.csv?limit=10",
        headers={"Authorization": "Bearer test-admin-token"},
    )
    assert export_resp.status_code == 200
    assert export_resp.headers["content-type"].startswith("text/csv")
    assert "created_at,provider,event_id,order_id,outcome,failure_reason,payload_hash" in export_resp.text
    assert "evt_export_001" in export_resp.text
    assert ",applied," in export_resp.text


def test_payment_webhook_diagnostics_supports_server_side_filters(client) -> None:
    order_id = _create_order(client)
    link_payload = {
        "provider": "wipay",
        "success_url": "https://harricom.com/pay/success",
        "cancel_url": "https://harricom.com/pay/cancel",
    }
    link_resp = client.post(f"/orders/{order_id}/payment-link", json=link_payload)
    assert link_resp.status_code == 201
    order = link_resp.json()["order"]

    failed_payload = {
        "order_number": order["order_number"],
        "payment_status": "paid",
        "amount_minor": order["total_minor"],
        "provider_payment_id": "evt_filter_failed",
    }
    failed_raw = json.dumps(failed_payload, separators=(",", ":")).encode("utf-8")
    failed_resp = client.post(
        "/payments/webhook/stripe",
        content=failed_raw,
        headers={"x-harricom-signature": "bad-signature", "content-type": "application/json"},
    )
    assert failed_resp.status_code == 401

    applied_payload = {
        "order_number": order["order_number"],
        "payment_status": "paid",
        "amount_minor": order["total_minor"],
        "provider_payment_id": "evt_filter_applied",
    }
    applied_raw = json.dumps(applied_payload, separators=(",", ":")).encode("utf-8")
    applied_signature = _sign("test-wipay-secret", applied_raw)
    applied_resp = client.post(
        "/payments/webhook/wipay",
        content=applied_raw,
        headers={"x-harricom-signature": applied_signature, "content-type": "application/json"},
    )
    assert applied_resp.status_code == 200

    filtered_diag = client.get(
        "/payments/webhooks/diagnostics?limit=10&provider=wipay&outcome=applied",
        headers={"Authorization": "Bearer test-admin-token"},
    )
    assert filtered_diag.status_code == 200
    body = filtered_diag.json()
    assert body["total_attempts"] >= 1
    assert all(item["provider"] == "wipay" for item in body["recent_attempts"])
    assert all(item["outcome"] == "applied" for item in body["recent_attempts"])
    assert all(item["provider"] == "wipay" for item in body["by_provider"])
    assert all(item["outcome"] == "applied" for item in body["by_outcome"])


def test_payment_webhook_export_supports_server_side_filters(client) -> None:
    order_id = _create_order(client)
    link_payload = {
        "provider": "wipay",
        "success_url": "https://harricom.com/pay/success",
        "cancel_url": "https://harricom.com/pay/cancel",
    }
    link_resp = client.post(f"/orders/{order_id}/payment-link", json=link_payload)
    assert link_resp.status_code == 201
    order = link_resp.json()["order"]

    applied_payload = {
        "order_number": order["order_number"],
        "payment_status": "paid",
        "amount_minor": order["total_minor"],
        "provider_payment_id": "evt_export_filter_wipay",
    }
    applied_raw = json.dumps(applied_payload, separators=(",", ":")).encode("utf-8")
    applied_signature = _sign("test-wipay-secret", applied_raw)
    applied_resp = client.post(
        "/payments/webhook/wipay",
        content=applied_raw,
        headers={"x-harricom-signature": applied_signature, "content-type": "application/json"},
    )
    assert applied_resp.status_code == 200

    failed_resp = client.post(
        "/payments/webhook/stripe",
        content=applied_raw,
        headers={"x-harricom-signature": "bad-signature", "content-type": "application/json"},
    )
    assert failed_resp.status_code == 401

    export_resp = client.get(
        "/payments/webhooks/export.csv?limit=20&provider=wipay&outcome=applied",
        headers={"Authorization": "Bearer test-admin-token"},
    )
    assert export_resp.status_code == 200
    assert "evt_export_filter_wipay" in export_resp.text
    assert ",wipay," in export_resp.text
    assert ",applied," in export_resp.text
    assert ",stripe," not in export_resp.text
    assert ",failed," not in export_resp.text


def test_payment_webhook_filter_validation_rejects_invalid_values(client) -> None:
    bad_diag = client.get(
        "/payments/webhooks/diagnostics?provider=paypal",
        headers={"Authorization": "Bearer test-admin-token"},
    )
    assert bad_diag.status_code == 422

    bad_export = client.get(
        "/payments/webhooks/export.csv?outcome=processing",
        headers={"Authorization": "Bearer test-admin-token"},
    )
    assert bad_export.status_code == 422


def test_payment_webhook_diagnostics_supports_cursor_pagination(client) -> None:
    order_id = _create_order(client)
    link_payload = {
        "provider": "stripe",
        "success_url": "https://harricom.com/pay/success",
        "cancel_url": "https://harricom.com/pay/cancel",
    }
    link_resp = client.post(f"/orders/{order_id}/payment-link", json=link_payload)
    assert link_resp.status_code == 201
    order = link_resp.json()["order"]

    for idx in range(3):
        event_payload = {
            "order_number": order["order_number"],
            "payment_status": "paid",
            "amount_minor": order["total_minor"],
            "provider_payment_id": f"evt_cursor_{idx}",
        }
        raw = json.dumps(event_payload, separators=(",", ":")).encode("utf-8")
        signature = _sign("test-stripe-secret", raw)
        resp = client.post(
            "/payments/webhook/stripe",
            content=raw,
            headers={
                "x-harricom-signature": signature,
                "x-harricom-event-id": f"evt_cursor_page_{idx}",
                "content-type": "application/json",
            },
        )
        assert resp.status_code == 200

    first = client.get(
        "/payments/webhooks/diagnostics?limit=2",
        headers={"Authorization": "Bearer test-admin-token"},
    )
    assert first.status_code == 200
    first_body = first.json()
    assert len(first_body["recent_attempts"]) == 2
    assert first_body["paging"]["has_more"] is True
    assert isinstance(first_body["paging"]["next_cursor"], int)

    next_cursor = first_body["paging"]["next_cursor"]
    second = client.get(
        f"/payments/webhooks/diagnostics?limit=2&cursor={next_cursor}",
        headers={"Authorization": "Bearer test-admin-token"},
    )
    assert second.status_code == 200
    second_body = second.json()
    assert len(second_body["recent_attempts"]) >= 1

    first_ids = {item["event_id"] for item in first_body["recent_attempts"]}
    second_ids = {item["event_id"] for item in second_body["recent_attempts"]}
    assert first_ids.isdisjoint(second_ids)


def test_payment_webhook_diagnostics_rejects_invalid_cursor(client) -> None:
    resp = client.get(
        "/payments/webhooks/diagnostics?cursor=0",
        headers={"Authorization": "Bearer test-admin-token"},
    )
    assert resp.status_code == 422
