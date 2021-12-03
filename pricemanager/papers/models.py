from django.db import models
from django.contrib.auth.models import User


class Papers(models.Model):
    name = models.CharField(max_length=30, unique=True)
    cost = models.DecimalField(max_digits=5, decimal_places=2)
    owner = models.ForeignKey(
        User, related_name='papers', on_delete=models.CASCADE,
        null=True)

    class Meta:
        verbose_name_plural = 'Papers'

    def __str__(self):
        return self.name
