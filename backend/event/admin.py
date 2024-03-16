from django.contrib import admin

# Register your models here.
from .models import Event,Like
# registering Like and Event Model
admin.site.register(Event)
admin.site.register(Like)