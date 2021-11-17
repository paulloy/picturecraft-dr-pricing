from django.db import models


class Papers(models.Model):
    name = models.CharField(max_length=30, unique=True)
    cost = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        verbose_name_plural = 'Papers'
    
    def __str__(self):
        return self.name
