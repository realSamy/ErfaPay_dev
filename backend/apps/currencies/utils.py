import requests
from django.utils.dateparse import parse_datetime
from .models import MarketPrice

def fetch_and_update_prices():
    sources = {
        'tehran_cgf': [
            {"code": "USD", "cname": "USDIRT", "name": "US Dollar", "icon": "circle-flags:us"},
            {"code": "EUR", "cname": "EURIRT", "name": "Euro", "icon": "circle-flags:eu"},
            {"code": "GBP", "cname": "GBPIRT", "name": "British Pound", "icon": "circle-flags:uk"},
        ],
        'nobitex_spot': [
            {"code": "BTC", "cname": "BTCIRT", "name": "Bitcoin", "icon": "cryptocurrency-color:btc"},
            {"code": "USDT", "cname": "USDTIRT", "name": "Tether (USDT)", "icon": "cryptocurrency-color:usdt"},
            {"code": "TRX", "cname": "TRXIRT", "name": "TRON", "icon": "cryptocurrency-color:trx"},
        ]
    }
    for source, markets in sources.items():
        for market in markets:
            try:
                res = requests.get(f'https://api.bitycle.com/c1/api/exchange/market_price_info',
                                   params={'source': source, 'market': market["cname"]})
                data = res.json()

                if data['status'] != 'success' or not data['data']:
                    continue

                latest_data = max(data['data'], key=lambda x: x['updated_at'])
                price = latest_data['price']
                updated_at = parse_datetime(latest_data['updated_at'])

                MarketPrice.objects.update_or_create(
                    source=source,
                    market=market["cname"],
                    code=market["code"],
                    name=market["name"],
                    icon=market["icon"],
                    defaults={
                        'rate': price,
                        'updated_at': updated_at
                    }
                )

            except Exception as e:
                print(f"[ERROR] {source}-{market}: {str(e)}")
