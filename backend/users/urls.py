
from django.urls import path
from .views import RegisterView,MyObtainTokenPairView,LogoutView
from rest_framework_simplejwt.views import TokenRefreshView
urlpatterns = [
    # register route
    path('register/', RegisterView.as_view(), name='auth_register'),
    # login route
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    # refresh token route
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # logout
    path('logout/', LogoutView.as_view(), name='auth_logout')
]