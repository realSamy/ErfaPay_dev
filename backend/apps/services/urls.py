from django.urls import path
from . import views, admin_views

urlpatterns = [
    # Public
    path('categories/', views.CategoryListView.as_view()),
    path('', views.ServiceListView.as_view()),
    path('<int:pk>/', views.ServiceDetailView.as_view()),

    # Admin Only
    path('admin/categories/', admin_views.AdminCategoryListCreateView.as_view(), name='admin-category-list-create'),
    path('admin/categories/<int:pk>/', admin_views.AdminCategoryDetailView.as_view(), name='admin-category-detail'),
    path('admin/services/', admin_views.AdminServiceListCreateView.as_view(), name='admin-service-list-create'),
    path('admin/services/<int:pk>/', admin_views.AdminServiceDetailView.as_view(), name='admin-service-detail'),
]