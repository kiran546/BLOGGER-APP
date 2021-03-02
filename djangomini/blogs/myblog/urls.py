from django.urls import path
from . import views
from django.urls import path, include                 
from rest_framework import routers  



router = routers.DefaultRouter()  
router.register('blogs',views.BlogViewset)
router.register('users',views. UserViewset)
router.register('comments',views.CommentsViewset)

urlpatterns = [
    # path('',views.login, name="login"),
    # path('blogs_list/',views.blogs_list, name="blogs_list"),
     path('',include(router.urls)),
    path('index',views.index, name="index"),
    path('api-token-auth/',views.CustomAuthToken.as_view()),
   
    
] 



