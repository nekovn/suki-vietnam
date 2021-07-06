from rest_framework import serializers
from users.models import NewUser, Contact
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed


# Contact
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

    def create(self, validate_data):
        instance = super(ContactSerializer, self).create(validate_data)
        return instance


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = '__all__'


class CustomUserSerializer(serializers.ModelSerializer):
# import jsons

    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = NewUser
        fields = ['email','user_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, attrs):
        email = attrs.get('email', '')
        user_name = attrs.get('user_name', '')
        if NewUser.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {'email': ('このメールは既に使用されています。')})
        if NewUser.objects.filter(user_name=user_name).exists():
            raise serializers.ValidationError(
                {'user_name': ('このユーザー名は既に使用されています。')})

        return super().validate(attrs)

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3, read_only= True)
    user_name = serializers.CharField(max_length=255, min_length=2)
    password = serializers.CharField(
        max_length=65, min_length=8,write_only=True)
    tokens = serializers.CharField(max_length=255, min_length=2,read_only= True)


    class Meta:
        model = NewUser
        fields = ['email','user_name', 'password','tokens']

    def validate(self, attrs):
        user_name = attrs.get('user_name','')
        password = attrs.get('password', '')

        user = auth.authenticate(user_name=user_name, password=password)

        if not user:
            raise AuthenticationFailed('無効なユーザー名またはパスワード。再試行してください！')
        if not user.is_active:
            raise AuthenticationFailed('アカウントが無効です。管理者に連絡してください！')

        return {
            'user_name': user.user_name,
            'email': user.email,
            'tokens': user.tokens
        }

class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(min_length=3,max_length=10,required=True)
    class Meta:
        model = NewUser
        fields = ('user_name', 'first_name', 'email','gender','birthday')

    def validate_email(self, value):
        user = self.context['request'].user
        if NewUser.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError({"email": "このメールは既に使用されています。"})
        return value

    def validate_user_name(self, value):
        user = self.context['request'].user
        if NewUser.objects.exclude(pk=user.pk).filter(user_name=value).exists():
            raise serializers.ValidationError({"user_name": "このユーザー名は既に使用されています。"})
        return value

    def update(self, instance, validated_data):
        instance.user_name = validated_data['user_name']
        instance.email = validated_data['email']
        instance.first_name = validated_data['first_name']
        instance.gender = validated_data['gender']
        instance.birthday = validated_data['birthday']

        instance.save()

        return instance



class UpdateUserImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ('image','user_name')


class ChangePasswordSerializer(serializers.Serializer):
    model = NewUser

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

