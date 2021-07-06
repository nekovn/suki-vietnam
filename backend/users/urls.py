from django.urls import path
from .views import CustomUserCreate, LoginView, UserProfileView, UpdateProfileView, UpdateImage, ChangePasswordView, SendEmailContact

app_name = 'users'

urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('login/', LoginView.as_view(), name="login"),
    path('profile/', UserProfileView.as_view(), name="profile"),
    path('update-profile/<int:pk>/', UpdateProfileView.as_view(), name='update_profile'),
    path('upload/<int:pk>/', UpdateImage.as_view(), name='upload'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('contact/', SendEmailContact.as_view(), name='contact'),


]