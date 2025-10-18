import pytest
from unittest.mock import patch
from apps.currencies.models import MarketPrice
from apps.currencies.utils import fetch_and_update_prices

mock_api_response = {
    "status": "success",
    "message": "",
    "data": [
        {
            "source": "tehran_cgf",
            "market": "USDIRT",
            "frame": "24h",
            "open": 89600.0,
            "high": 90885.0,
            "low": 89570.0,
            "price": 90550.0,
            "volume": 0.0,
            "updated_at": "2025-07-31T21:22:06.201062+03:30"
        }
    ]
}


@pytest.mark.django_db
@patch("currencies.utils.requests.get")
def test_fetch_and_update_prices_creates_record(mock_get):
    mock_get.return_value.json.return_value = mock_api_response

    assert MarketPrice.objects.count() == 0

    fetch_and_update_prices()

    assert MarketPrice.objects.count() == 1

    obj = MarketPrice.objects.first()
    assert obj.source == "tehran_cgf"
    assert obj.market == "USDIRT"
    assert float(obj.price) == 90550.0


@pytest.mark.django_db
@patch("currencies.utils.requests.get")
def test_fetch_and_update_prices_updates_existing(mock_get):
    from django.utils.dateparse import parse_datetime
    MarketPrice.objects.create(
        source="tehran_cgf",
        market="USDIRT",
        price=80000.0,
        updated_at=parse_datetime("2024-01-01T00:00:00+00:00")
    )

    mock_get.return_value.json.return_value = mock_api_response

    fetch_and_update_prices()

    obj = MarketPrice.objects.get(source="tehran_cgf", market="USDIRT")
    assert float(obj.price) == 90550.0