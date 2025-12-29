from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from apps.users.permissions import IsMainAdmin
from .models import GlobalSettings
from .serializers import GlobalSettingsSerializer

class GlobalSettingsView(APIView):
    def get_permissions(self):
        if self.request.method == 'GET':
            return [AllowAny()]
        return [IsMainAdmin()]

    def get(self, request):
        settings = GlobalSettings.objects.first()  # Singleton
        if not settings:
            return Response({'ok': False, 'error': 'No settings found'}, status=404)
        serializer = GlobalSettingsSerializer(settings)
        return Response({'ok': True, 'data': serializer.data})

    def patch(self, request):
        settings = GlobalSettings.objects.first()
        if not settings:
            settings = GlobalSettings(id=1)
        serializer = GlobalSettingsSerializer(settings, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'ok': True, 'data': serializer.data})
        return Response({'ok': False, 'errors': serializer.errors}, status=400)