from types import SimpleNamespace

from fastapi.testclient import TestClient


def _payload() -> dict:
    return {
        "product_code": "prodigal-consultation",
        "quantity": 1,
        "customer_name": "Jahman Brown",
        "customer_phone": "+18760000000",
        "customer_email": "jahman@example.com",
        "success_url": "https://harricom.netlify.app/prodigal/payment-success.html",
        "cancel_url": "https://harricom.netlify.app/prodigal/payment-cancelled.html",
    }


def test_create_stripe_checkout_session_uses_server_price(client: TestClient, monkeypatch) -> None:
    captured: dict = {}

    def retrieve_price(price_id: str):
        assert price_id == "price_test123"
        return SimpleNamespace(active=True, unit_amount=25000, currency="jmd")

    def create_session(**kwargs):
        captured.update(kwargs)
        return SimpleNamespace(url="https://checkout.stripe.com/c/pay/cs_test_123")

    monkeypatch.setattr("app.services.stripe_checkout_service.stripe.Price.retrieve", retrieve_price)
    monkeypatch.setattr("app.services.stripe_checkout_service.stripe.checkout.Session.create", create_session)

    response = client.post("/payments/stripe/checkout-session", json=_payload())

    assert response.status_code == 201
    body = response.json()
    assert body["payment"] == {
        "provider": "stripe",
        "url": "https://checkout.stripe.com/c/pay/cs_test_123",
    }
    assert body["order"]["total_minor"] == 25000
    assert body["order"]["currency"] == "JMD"
    assert captured["line_items"] == [{"price": "price_test123", "quantity": 1}]
    assert captured["metadata"]["order_id"] == body["order"]["id"]
    assert "session_id={CHECKOUT_SESSION_ID}" in captured["success_url"]


def test_create_stripe_checkout_session_rejects_untrusted_return_url(client: TestClient) -> None:
    payload = _payload()
    payload["success_url"] = "https://attacker.example/payment-success"

    response = client.post("/payments/stripe/checkout-session", json=payload)

    assert response.status_code == 422
    assert response.json()["detail"] == "Stripe checkout redirect URL is not allowed"
