from .models import Event,Like
from rest_framework import serializers
from django.contrib.auth.models import User

# serializer for event model
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model=Event
        fields='__all__'

# serializer for event with extrafield likebyuser that specify current user is like or not
# it also create using modelserializer but i use this
class EventWithLikesSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    event_name = serializers.CharField(max_length=100)
    date = serializers.DateField()
    time = serializers.TimeField()
    image=serializers.CharField()
    location = serializers.CharField(max_length=200)
    liked_by_user = serializers.BooleanField()