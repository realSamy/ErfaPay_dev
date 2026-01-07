# apps/services/admin_views.py
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.users.permissions import IsSeniorSupportOrAbove
from django.shortcuts import get_object_or_404
from rest_framework import status
from .models import Service, Category
from .serializers import ServiceListSerializer, ServiceDetailSerializer, CategoryAdminSerializer, ServiceAdminSerializer


class AdminCategoryListCreateView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def get(self, request):
        categories = Category.objects.all().order_by('order')
        serializer = CategoryAdminSerializer(categories, many=True)
        return Response({'ok': True, 'data': serializer.data})

    def post(self, request):
        serializer = CategoryAdminSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'ok': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'ok': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class AdminCategoryDetailView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def get(self, request, pk):
        category = get_object_or_404(Category, pk=pk)
        serializer = CategoryAdminSerializer(category)
        return Response({'ok': True, 'data': serializer.data})

    def patch(self, request, pk):
        category = get_object_or_404(Category, pk=pk)
        serializer = CategoryAdminSerializer(category, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'ok': True, 'data': serializer.data})
        return Response({'ok': False, 'errors': serializer.errors}, status=400)

    def delete(self, request, pk):
        category = get_object_or_404(Category, pk=pk)
        if category.services.exists():
            return Response({'ok': False, 'error': 'Cannot delete category with active services'}, status=400)
        category.delete()
        return Response({'ok': True, 'message': 'Category deleted'})


class AdminServiceListCreateView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def get(self, request):
        services = Service.objects.all()
        #     .select_related('category')
        serializer = ServiceListSerializer(services, many=True)
        return Response({'ok': True, 'data': serializer.data})

    def post(self, request):
        serializer = ServiceAdminSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'ok': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'ok': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class AdminServiceDetailView(APIView):
    permission_classes = [IsSeniorSupportOrAbove]

    def get(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        serializer = ServiceDetailSerializer(service)
        return Response({'ok': True, 'data': serializer.data})

    def patch(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        serializer = ServiceAdminSerializer(service, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                'ok': True,
                'data': ServiceDetailSerializer(service).data  # refresh from DB
            })
        return Response({'ok': False, 'errors': serializer.errors}, status=400)

    def delete(self, request, pk):
        service = get_object_or_404(Service, pk=pk)
        service.delete()
        return Response({'ok': True, 'message': 'Service deleted'})
