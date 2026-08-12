from uuid import uuid4


def test_create_order_returns_201_and_total(client) -> None:
    payload = {
        "customer_name": "Jahman Brown",
        "customer_phone": "+18760000000",
        "currency": "jmd",
        "source_channel": "whatsapp",
        "items": [
            {"template_slug": "barber", "title": "Barber Pro", "quantity": 1, "unit_price_minor": 250000},
            {"template_slug": "restaurant", "title": "Restaurant Suite", "quantity": 1, "unit_price_minor": 300000},
        ],
    }

    resp = client.post("/orders", json=payload)
    assert resp.status_code == 201
    body = resp.json()
    assert body["ok"] is True
    assert body["idempotent_replay"] is False
    assert body["order"]["total_minor"] == 550000
    assert body["order"]["currency"] == "JMD"


def test_create_order_idempotent_replay_returns_200(client) -> None:
    unique_key = f"order-checkout-{uuid4().hex}"
    payload = {
        "customer_name": "Jahman Brown",
        "customer_phone": "+18760000000",
        "idempotency_key": unique_key,
        "items": [
            {"template_slug": "barber", "title": "Barber Pro", "quantity": 1, "unit_price_minor": 250000}
        ],
    }

    first = client.post("/orders", json=payload)
    second = client.post("/orders", json=payload)

    assert first.status_code == 201
    assert second.status_code == 200

    first_order = first.json()["order"]
    second_order = second.json()["order"]
    assert second.json()["idempotent_replay"] is True
    assert first_order["id"] == second_order["id"]
    assert first_order["order_number"] == second_order["order_number"]
