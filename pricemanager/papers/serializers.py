from rest_framework import serializers
from .models import Papers


class PapersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Papers
        fields = '__all__'
