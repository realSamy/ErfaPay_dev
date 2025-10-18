from rest_framework.routers import DefaultRouter
from .views import ServiceCategoryViewSet, ServiceViewSet

router = DefaultRouter()
router.register(r'service-categories', ServiceCategoryViewSet, basename='service-categories')
router.register(r'services', ServiceViewSet, basename='services')

urlpatterns = router.urls
