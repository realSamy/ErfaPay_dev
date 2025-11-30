from django.urls import path
from . import views, admin_views

urlpatterns = [
    # Public
    path('categories/', views.CategoryListView.as_view()),
    path('', views.ServiceListView.as_view()),
    path('<int:pk>/', views.ServiceDetailView.as_view()),

    # Admin Only
    path('admin/list/', admin_views.AdminServiceListCreateView.as_view()),
    path('admin/<int:pk>/', admin_views.AdminServiceDetailView.as_view()),
]