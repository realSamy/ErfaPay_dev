from rest_framework.views import APIView
from rest_framework.response import Response
from .models import MarketPrice

class LatestPricesAPIView(APIView):
    def get(self, request):
        prices = MarketPrice.objects.all()
        return Response([
            {
                'code': p.code,
                'name': p.name,
                'icon': p.icon,
                'rate': float(p.rate),
                'updated_at': p.updated_at.isoformat()
            }
            for p in prices
        ])
