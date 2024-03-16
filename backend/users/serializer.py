from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# make username encrypted in token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        token['username'] = user.username
        return token
# register user serializer
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password = serializers.CharField(required=True, validators=[validate_password])
    # two field are acceptable email and passrord
    class Meta:
        model = User
        fields = ('email', 'password')
    # user is created with the given data
    def create(self, validated_data):
        user=User.objects.create_user(username=validated_data['email'],email=validated_data['email'],password=validated_data['password'])
        user.save()
        return user
    # password is not sending to the user
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation.pop('password', None)  
        return representation