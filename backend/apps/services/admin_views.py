# apps/services/admin_views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.users.permissions import IsSeniorSupportOrAbove
from django.shortcuts import get_object_or_404
from .models import Service, Category
from .serializers import ServiceListSerializer, ServiceDetailSerializer

class AdminServiceListCreateView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def get(self, request):
        services = Service.objects.select_related('category')
        serializer = ServiceListSerializer(services, many=True)
        return Response({'ok': True, 'data': serializer.data})

    def post(self, request):
        # You'll need a proper writable serializer later
        # For now: use Django admin or shell
        return Response({'ok': False, 'message': 'Use Django Admin to create services'})


class AdminServiceDetailView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def get(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        serializer = ServiceDetailSerializer(service)
        return Response({'ok': True, 'data': serializer.data})

    def patch(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        # Simple update
        allowed = ['title_fa', 'title_en', 'description_fa', 'description_en',
                     'commission_percent', 'commission_fixed', 'commission_type',
                     'min_amount', 'max_amount', 'tax_rate', 'delivery_time_fa',
                     'delivery_time_en', 'is_active', 'requires_manual_review', 'order']
        for field in allowed:
            if field in request.data:
                setattr(service, field, request.data[field])
        service.save()
        return Response({'ok': True, 'data': ServiceDetailSerializer(service).data})

    def delete(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        service.is_active = False
        service.save()
        return Response({'ok': True, 'message': 'سرویس غیرفعال شد'})