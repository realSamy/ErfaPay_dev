from django.urls import path
from . import views, admin_views

urlpatterns = [
    # User endpoints
    path('', views.TicketListCreateView.as_view(), name='list-create'),
    path('<str:ticket_id>/', views.TicketDetailView.as_view(), name='detail'),
    path('<str:ticket_id>/reply/', views.TicketReplyView.as_view(), name='reply'),
    path('<str:ticket_id>/close/', views.TicketCloseView.as_view(), name='close'),
    path('<str:ticket_id>/pdf/', views.TicketPDFView.as_view(), name='pdf'),

    # Admin endpoints
    path('admin/', admin_views.AdminTicketListView.as_view(), name='admin-list'),
    path('admin/<str:ticket_id>/reply/', admin_views.AdminTicketReplyView.as_view(), name='admin-reply'),
    path('admin/<str:ticket_id>/update/', admin_views.AdminTicketUpdateView.as_view(), name='admin-update'),
]