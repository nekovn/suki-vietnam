from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status,generics,viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer, LoginSerializer, UpdateUserSerializer, UpdateUserImgSerializer, ChangePasswordSerializer, ContactSerializer
from rest_framework.permissions import AllowAny
from .models import NewUser
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

class SendEmailContact(APIView):
     def post(self, request, *args, **kwargs):
        serializer = ContactSerializer(data = request.data)
        if serializer.is_valid():
            contact = serializer.save()
            if contact:
                data = serializer.validated_data
                name = data.get('name')
                email = data.get('email')
                message = data.get('message')
                code = data.get('code')
                context = {
                        'name': name,
                        'email': email,
                        'message': message,
                        'code': code
                    }
                # render email text
                email_html_message = render_to_string('contact/contact_email.html', context)

                msg = EmailMultiAlternatives(
                        # title:
                        "お問い合わせありがとうございます[{title}]>".format(title="自動返信"),
                        # message:
                        email_html_message,
                        # from:
                        "cuong@gomogy.co.jp",
                        # to:
                        [serializer.data.get("email")]
                    )
                msg.attach_alternative(email_html_message, "text/html")
                msg.send()

                return Response({"success": "Sent"})

        return Response({'success': "Failed"}, status=status.HTTP_400_BAD_REQUEST)



class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(generics.RetrieveAPIView):
    def get(self, request):
        try:
            user_profile = NewUser.objects.get(user_name=request.user)
            status_code = status.HTTP_200_OK

            response = {
                'success': 'true',
                'status': status_code,
                'message': 'User profile fetched successfully',
                'data': [{
                        'id': user_profile.id,
                        'user_name': user_profile.user_name,
                        'first_name': user_profile.first_name,
                        'email': user_profile.email,
                        'birthday': user_profile.birthday,
                        'gender': user_profile.gender,
                        'image': user_profile.thumbnail_preview,
                        'is_active': user_profile.is_active,
                        'is_staff': user_profile.is_staff,
                    }]
                }

        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                'success': 'false',
                'status': status_code,
                'message': 'User does not exists',
                'error': str(e)
                }
        return Response(response, status=status_code)


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    def get(self, request):
        query = NewUser.objects.all()
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data,status=status.HTTP_200_OK)


class UpdateProfileView(generics.UpdateAPIView):
    queryset = NewUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UpdateUserSerializer



class UpdateImage(generics.UpdateAPIView):
    permission_classes = [AllowAny]
    queryset = NewUser.objects.all()
    serializer_class = UpdateUserImgSerializer

class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = NewUser
    permission_classes = [AllowAny]

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["現在のパスワードが間違えます。もう一度お試しください."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'パスワードが正常に更新されました。',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

