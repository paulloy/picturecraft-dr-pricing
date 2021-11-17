from rest_framework.decorators import permission_classes
from models import Papers
from rest_framework import viewsets, permissions
from .serializers import PapersSerializer


class PapersViewSet(viewsets.ModelViewSet):
    queryset = Papers.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PapersSerializer
