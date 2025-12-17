from rest_framework.views import APIView
from rest_framework.response import Response
from apps.users.permissions import IsMainAdmin
from .models import SiteSettings
from .serializers import SiteSettingsSerializer

class SiteSettingsView(APIView):
    permission_classes = [IsMainAdmin]

    def get(self, request):
        settings = SiteSettings.get_settings()
        serializer = SiteSettingsSerializer(settings)
        return Response({'ok': True, 'data': serializer.data})

    def patch(self, request):
        settings = SiteSettings.get_settings()
        serializer = SiteSettingsSerializer(settings, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(updated_by=request.user)
            return Response({'ok': True, 'data': serializer.data})
        return Response({'ok': False, 'errors': serializer.errors}, status=400)