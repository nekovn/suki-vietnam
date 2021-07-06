from django.urls import path

from .views import ProductViewSet, GetDataFromGG

urlpatterns = [
    path('logo-box', ProductViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),
    path('logo-box/<str:pk>', ProductViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy'
    })),
    path('image', GetDataFromGG.as_view({
        'post': 'list',
    })),

]
