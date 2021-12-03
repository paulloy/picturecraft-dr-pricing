from rest_framework.decorators import permission_classes
from .models import Papers
from rest_framework import viewsets, permissions
from .serializers import PapersSerializer


class PapersViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PapersSerializer

    def get_queryset(self):
        return self.request.user.papers.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
