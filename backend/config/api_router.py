from rest_framework.routers import DefaultRouter
from apps.notifications.urls import router as notifications_router
from apps.tickets.urls import router as tickets_router
from apps.services.urls import router as services_router
from apps.orders.urls import router as orders_router

router = DefaultRouter()

# List of all app routers
app_routers = [
    notifications_router,
    tickets_router,
    services_router,
    orders_router,
]

# Register each route from each app router
for app_router in app_routers:
    for prefix, viewset, basename in app_router.registry:
        router.register(prefix, viewset, basename=basename)
