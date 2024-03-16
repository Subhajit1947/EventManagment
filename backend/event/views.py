
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Event,Like
from .serializers import EventSerializer,EventWithLikesSerializer
from django.db.models import Exists,OuterRef

class MyAllEvents(APIView):
    # to check user is login or not
    permission_classes = (IsAuthenticated,)
 
    # get all event that created by the current login user
    def get(self,request):
        try:
            # fetch the event where oner_id is equl to current login user id
            allevent=Event.objects.filter(owner_id=request.user).all()
            # if allevent not eixst return a response 500 else procede
            if not allevent:
                return Response({"message":"event not fetched"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            # serializing data using eventserializer then return the data
            s=EventSerializer(allevent,many=True)
            return Response(s.data,status=status.HTTP_200_OK)
        except Exception as e:
           return Response({"message":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # delete a specific event by then owner of the event 
    def delete(self,request,e_id):
        # here i try read a event id from queryparam if not e_id then return a reponse 404 else procede  
        if not e_id:
            return Response({"message":"event id not found"},status=status.HTTP_404_NOT_FOUND)
        try:
            # filter the event by e_id
            event=Event.objects.filter(id=e_id).first()
            # if event not exist then return a response 404
            if not event:
                return Response({"message":"event id invalid"},status=status.HTTP_404_NOT_FOUND)
            # now i check then owner of event is not equal to current login user
            #  then return 401 else delete the event return response 204
            if event.owner_id!=request.user:
                return Response({"message":"you are not authorize"},status=status.HTTP_401_UNAUTHORIZED)
            event.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
# get all event with out authorization
class GetallEvent(APIView):
    def get(self,request):
        try:
            # fetch all event that store in db
            allevent=Event.objects.all()
            # if allevent does not exist then return a response 500
            if not allevent:
                return Response({"message":"error fetch data"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            # serializing allevent by Event serializer and return response 200 and serilizer.data
            s=EventSerializer(allevent,many=True)
            return Response(s.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class GetEvent(APIView):
    permission_classes = (IsAuthenticated,)
    # get all event with likebyuser with authorization
    def get(self, request):
        try:
            # fetch all events from the database and annotates each event with a boolean field 'liked_by_user', 
            # indicating whether the current user (fetch from the 'request' object) has liked the event or not. 
            # The 'Exists' subquery filters the 'Like' objects based on the event's primary key ('pk') and the current user's ID, 
            # and the result is then used to annotate each event with the 'liked_by_user' field. 
            # Finally, the values of the event's ID, name, date, image, time, location, and 'liked_by_user' field are extracted.

            all_events_with_likes = Event.objects.annotate(
                liked_by_user=Exists(
                    Like.objects.filter(event_id=OuterRef('pk'), user_id=request.user)
                )
            ).values('id', 'event_name', 'date', 'image', 'time', 'location', 'liked_by_user')
           
            if not all_events_with_likes:
                return Response({"message":"error in annotation"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            serializer=EventWithLikesSerializer(all_events_with_likes,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # create event by login user
    def post(self,request):
        # retrieves data from a request sent by a client
        event_name = request.data.get('event_name')
        date = request.data.get('date')
        time = request.data.get('time')
        location = request.data.get('location')
        image = request.data.get('image')
        # validate all the data received
        if not event_name:
            return Response({"message":"event name not found"},status=status.HTTP_404_NOT_FOUND)
        if not date:
            return Response({"message":"date not found"},status=status.HTTP_404_NOT_FOUND)
        if not time:
            return Response({"message":"time not found"},status=status.HTTP_404_NOT_FOUND)
        if not location:
            return Response({"message":"location not found"},status=status.HTTP_404_NOT_FOUND)
        if not image:
            return Response({"message":"image not found"},status=status.HTTP_404_NOT_FOUND)
        try:
            # check this event is already exist in db or not is exist then return 302
            eventalreadyexist=Event.objects.filter(event_name=event_name,date=date,owner_id=request.user).first()
            if eventalreadyexist:
                return Response({"message":"event already exist"},status=status.HTTP_302_FOUND)
            # create a event base on given data and owner is current login user
            createevent=Event.objects.create(event_name=event_name,date=date,time=time,image=image,location=location,owner_id=request.user)
            # if any probelem in creation of event then return 500 
            if not createevent:
                return Response({"message":"event not created"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            # serialize the data and return response 201 and s.data
            s=EventSerializer(createevent)

            return Response(s.data,status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class GetLike(APIView):
    permission_classes=(IsAuthenticated,)
    # get all the event which is like by the current login user
    def get(self,request):
        try:
            #filter like by user_id is equal to current login user
            user_likes = Like.objects.filter(user_id=request.user)
            # fetch event_id associated with user_likes
            liked_event_ids = user_likes.values_list('event_id', flat=True)
            # fetch all event where id is equal to liked_event_ids
            user_liked_events = Event.objects.filter(id__in=liked_event_ids)
            # user_liked_events is not exist return response of 500
            if not user_liked_events:
                return Response({"message":"event not fetched"},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            # serialize user_liked_events using EventSerializer and return response 200 and s.data 
            serializer=EventSerializer(user_liked_events,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def post(self,request,e_id):
        # here i try read a event id from queryparam if not e_id then return a reponse 404 else procede  
        if not e_id:
            return Response({"message":"event id not found"},status=status.HTTP_404_NOT_FOUND)
        try:
            # fetch the event with id is eqal to e_id
            evnt_id=Event.objects.filter(id=e_id).first()
            # if evnt_id not exist then return response 404
            if not evnt_id:
                return Response({"message":"id not exist"},status=status.HTTP_404_NOT_FOUND)
            # check this event is like by the current login user or not
            likexist=Like.objects.filter(event_id=evnt_id,user_id=request.user).first()
            # if current user is already like then unlike this object(delete)
            if likexist:
                likexist.delete()
                return Response({"message":f"you unlike event {e_id}"},status=status.HTTP_200_OK)
            # if not like by current user then like(create the c1 object)
            cl=Like.objects.create(event_id=evnt_id,user_id=request.user)
            # is c1 exist then return response 200 like created else 500
            if not cl:
                return Response({"message":"like not created"},status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
            return Response({"message":f"you like event {e_id}"},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
