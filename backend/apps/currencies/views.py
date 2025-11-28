from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CurrencyRate

class CurrencyRatesView(APIView):
    def get(self, request):
        rates = CurrencyRate.objects.all()
        data = [
            {
                "code": r.code,
                "name": r.name,
                "icon": r.icon,
                "rate": float(r.rate_to_irt),
                "updated_at": r.updated_at.isoformat()
            }
            for r in rates
        ]
        return Response({'ok': True, 'data': data})