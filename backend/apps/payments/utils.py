import requests
from django.conf import settings


def get_paypal_token():
    auth = (settings.PAYPAL_CLIENT_ID, settings.PAYPAL_SECRET)
    data = {'grant_type': 'client_credentials'}
    response = requests.post(f"{settings.PAYPAL_API_URL}/v1/oauth2/token", auth=auth, data=data)
    return response.json()['access_token']
