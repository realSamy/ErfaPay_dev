from rest_framework.routers import DefaultRouter
from .views import TicketViewSet, TicketMessageViewSet, TicketCategoryViewSet

router = DefaultRouter()
router.register(r'tickets', TicketViewSet, basename='tickets')
router.register(r'ticket-messages', TicketMessageViewSet, basename='ticket-messages')
router.register(r'ticket-categories', TicketCategoryViewSet, basename='ticket-categories')

urlpatterns = router.urls
