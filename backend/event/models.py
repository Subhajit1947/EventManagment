from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Event and Like model schema
class Event(models.Model):
    event_name = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    location = models.CharField(max_length=200)
    image = models.ImageField(upload_to='event_images/')
    owner_id= models.ForeignKey(User, on_delete=models.CASCADE)
    careated_at=models.DateTimeField(default=timezone.now)

class Like(models.Model):
    event_id=models.ForeignKey(Event,on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    careated_at=models.DateTimeField(default=timezone.now)

