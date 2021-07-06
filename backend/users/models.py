
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from rest_framework_simplejwt.tokens import AccessToken
from django.utils.html import mark_safe
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
import random
import string

class Contact(models.Model):
    name = models.CharField(verbose_name='氏名',max_length=255)
    email = models.EmailField(verbose_name='メールアドレス',max_length=254)
    message = models.TextField(verbose_name='内容')
    code = models.CharField(verbose_name='番号',max_length=255)
    is_active = models.IntegerField(verbose_name='状態',
                                    default=0,
                                    blank=True,
                                    null=True,
                                    help_text='Active->返答, Inactive->未返答',
                                    choices=(
                                        (1, 'Active'), (0, 'Inactive')
                                    ))
    created = models.DateTimeField(verbose_name='送信日', auto_now=False, auto_now_add=True)
    modified = models.DateTimeField(verbose_name='返答日', auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.name
    class Meta:
        db_table = 'contact'
        verbose_name_plural = 'お問い合せ'


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, user_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, user_name, password, **other_fields)

    def create_user(self, email, user_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,**other_fields)

        user.set_password(password)
        user.save()
        return user

def upload_location(instance, filename):
    return "avatar/%s" %(filename)

class NewUser(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(_('メールアドレス'), unique=True)
    user_name = models.CharField(verbose_name='ユーザー名',max_length=150, unique=True)
    first_name = models.CharField(verbose_name='氏名',max_length=150, blank=True)
    image = models.ImageField(verbose_name='画像', upload_to=upload_location, null=True, blank=True)
    birthday = models.DateField(verbose_name="誕生日", null=True,default=None)
    gender = models.IntegerField(verbose_name='性別',
                                                    default=1,
                                                    blank=True,
                                                    null=True,
                                                    choices=(
                                                    (1, '男性'), (2, '女性')
                                                    ))
    is_staff = models.BooleanField(verbose_name='スタッフ',default=False)
    is_active = models.BooleanField(verbose_name='状態',default=True)

    created = models.DateTimeField(verbose_name='作成日', auto_now=False, auto_now_add=True)
    modified = models.DateTimeField(verbose_name='更新日', auto_now=True, auto_now_add=False)

    objects = CustomAccountManager()

    @property
    def thumbnail_preview(self):
        if self.image:
           return mark_safe("<img src='/media/{}' width='40' height='40' />".format(self.image))
        return ""

    USERNAME_FIELD = 'user_name'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.user_name

    def tokens(self):
        refresh = AccessToken.for_user(self)
#         refresh.access_token
        return str(refresh)
    class Meta:
        verbose_name_plural = 'ユーザー'


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.user_name,
        'email': reset_password_token.user.email,
        'code': reset_password_token.key
    }

    # render email text
    email_html_message = render_to_string('email/user_reset_password.html', context)

    msg = EmailMultiAlternatives(
        # title:
        "<{title}>パスワード再設定をお願いします".format(title="OOnaviサイト"),
        # message:
        email_html_message,
        # from:
        "cuong@gomogy.co.jp",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()