from django.contrib import admin
from .models import Papers


@admin.register(Papers)
class PapersAdmin(admin.ModelAdmin):
    pass
