from rest_framework import serializers

from .models import LogoBox


class LogoBoxSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogoBox
        fields = '__all__'