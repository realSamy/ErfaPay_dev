from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from .models import Category, Service
from .serializers import CategorySerializer, ServiceListSerializer, ServiceDetailSerializer


class CategoryListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categories = Category.objects.filter(is_active=True).prefetch_related('services')
        serializer = CategorySerializer(categories, many=True, context={'request': request})
        return Response({'ok': True, 'data': serializer.data})


class ServiceListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        services = (Service.objects.filter(is_active=True))
                    # .select_related('category'))
        serializer = ServiceListSerializer(services, many=True, context={'request': request})
        return Response({'ok': True, 'data': serializer.data})


class ServiceDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        service = get_object_or_404(Service, pk=pk, is_active=True)
        serializer = ServiceDetailSerializer(service, context={'request': request})
        return Response({'ok': True, 'data': serializer.data})