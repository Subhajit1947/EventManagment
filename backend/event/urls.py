""
from django.contrib import admin
from django.urls import path,include
from .views import GetEvent,GetLike,GetallEvent,MyAllEvents

urlpatterns = [
    # get all event with likebyuser with authorization
    path('',GetEvent.as_view(),name='allevent_with_authentication'),
    # get all event with out authorization
    path('allevent/',GetallEvent.as_view(),name='allevent'),
    # get all event that created by the current login user or also create new event
    path('myevent/',MyAllEvents.as_view(),name='myevent'),
    # delete a specific event by then owner of the event
    path('myevent/<int:e_id>/',MyAllEvents.as_view(),name='delete_myevent'),
    # get all the event which is like by the current login user
    path('like/',GetLike.as_view(),name='getuserlike'),
    # like or unlike the event providing event id by current login user
    path('like/<int:e_id>/',GetLike.as_view(),name='createlike'),
]