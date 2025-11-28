from decimal import Decimal

import requests
from django.core.cache import cache
from django.utils import timezone
from .models import CurrencyRate

CACHE_KEY = "currency_rates_last_update"
CACHE_TIMEOUT = 60 * 10  # ۱۰ دقیقه کش

# تعریف ارزهای مورد نیاز (دقیقاً همون‌هایی که تو مستند داری)
CURRENCY_MAP = {
    'USD': {"source": "tehran_cgf", "cname": "USDIRT", "name": "US Dollar", "icon": "circle-flags:us"},
    'EUR': {"source": "tehran_cgf", "cname": "EURIRT", "name": "Euro", "icon": "circle-flags:eu"},
    'GBP': {"source": "tehran_cgf", "cname": "GBPIRT", "name": "British Pound", "icon": "circle-flags:uk"},
    'BTC': {"source": "nobitex_spot", "cname": "BTCIRT", "name": "Bitcoin", "icon": "cryptocurrency-color:btc"},
    'USDT': {"source": "nobitex_spot", "cname": "USDTIRT", "name": "Tether USDT", "icon": "cryptocurrency-color:usdt"},
    'TRX': {"source": "nobitex_spot", "cname": "TRXIRT", "name": "TRON", "icon": "cryptocurrency-color:trx"},
}

def fetch_and_update_rates():
    """این تابع رو هر ۱۰ دقیقه با celery beat یا management command صدا بزن"""
    updated_count = 0
    for code, info in CURRENCY_MAP.items():
        try:
            url = "https://api.bitycle.com/c1/api/exchange/market_price_info"
            params = {'source': info["source"], 'market': info["cname"]}
            response = requests.get(url, params=params, timeout=10)
            data = response.json()

            if data.get('status') != 'success' or not data.get('data'):
                continue

            latest = max(data['data'], key=lambda x: x['updated_at'])
            price = latest['price']

            CurrencyRate.objects.update_or_create(
                code=code,
                defaults={
                    'name': info["name"],
                    'icon': info["icon"],
                    'rate_to_irt': price,
                }
            )
            updated_count += 1
        except Exception as e:
            print(f"[CurrencyRate] Error fetching {code}: {e}")

    if updated_count > 0:
        cache.set(CACHE_KEY, timezone.now(), CACHE_TIMEOUT)
    return updated_count

def get_usd_to_irt_rate() -> Decimal:
    """همه جا از این استفاده کن (شارژ PayPal, Crypto, نمایش قیمت)"""
    return CurrencyRate.get_current_rate('USD')