import json

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.contrib.auth import get_user_model
from django.core import serializers
from django.http import HttpResponse

# Create your views here.
from django.shortcuts import render
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication, BasicAuthentication, SessionAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.chat_app.authentication import BearerAuthentication
from apps.chat_app.serializers import RegistrationSerializer, UsersWithMessageSerializer, UserSerializer

User = get_user_model()


class UsersView(generics.ListAPIView):
    serializer_class = UsersWithMessageSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication, BearerAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        users = User.objects.exclude(pk=self.request.user.pk).order_by('-profile__online').all()
        return users


def notify_others(user: User):
    """

    @param user:
    @return:
    """
    serializer = UserSerializer(user, many=False)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        'notification', {
            'type': 'user_online',
            'message': serializer.data
        }
    )


def test_socket(request):
    # users = User.objects.all()
    # return render(request, template_name='test.html', context={'users': users})
    # serializer = UserSerializer(user, many=False)
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        'chat_rifat', {
            'type': 'new_call',
            'message': {
                'receiver': 'ritu',
                'sender': 'rifat'
            }
        }
    )
    return HttpResponse("hello world")
