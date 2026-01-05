from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from apps.users.permissions import IsSeniorSupportOrAbove
from .models import TicketCategory
from .serializers import TicketCategorySerializer


class TicketCategoryListCreateView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsSeniorSupportOrAbove()]

    def get(self, request):
        categories = TicketCategory.objects.filter(is_active=True).order_by('order')
        serializer = TicketCategorySerializer(categories, many=True)
        return Response({'ok': True, 'data': serializer.data})

    def post(self, request):
        serializer = TicketCategorySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'ok': True, 'data': serializer.data}, status=status.HTTP_201_CREATED)
        return Response({'ok': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class TicketCategoryDetailView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsSeniorSupportOrAbove()]

    def get(self, request, pk):
        category = get_object_or_404(TicketCategory, pk=pk)
        serializer = TicketCategorySerializer(category)
        return Response({'ok': True, 'data': serializer.data})

    def patch(self, request, pk):
        category = get_object_or_404(TicketCategory, pk=pk)
        serializer = TicketCategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'ok': True, 'data': serializer.data})
        return Response({'ok': False, 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        category = get_object_or_404(TicketCategory, pk=pk)
        if category.tickets.exists():
            return Response({'ok': False, 'error': 'Cannot delete category with tickets'}, status=status.HTTP_400_BAD_REQUEST)
        category.delete()
        return Response({'ok': True, 'message': 'Category deleted'})