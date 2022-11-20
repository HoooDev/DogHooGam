from rest_framework import serializers
from .models import SymptomData

class SymptomSerializer(serializers.ModelSerializer):
    class Meta:
        model = SymptomData
        fields = '__all__'