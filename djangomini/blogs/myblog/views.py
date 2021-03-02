from django.shortcuts import render,redirect
from django.shortcuts import get_object_or_404
from .models import Blog,Comments
from rest_framework.decorators import api_view          
from .serializers import BlogSerializer,UserSerializer,CommentsSerializer 
from django.contrib.auth.models import User,auth  
from django.contrib import messages   
from rest_framework.decorators import api_view
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import  viewsets
                    
def index(request):
    latest_blog = Blog.objects.all()
    return render(request,'index.html',{'latest_blog':latest_blog})

class BlogViewset(viewsets.ModelViewSet):  
  queryset = Blog.objects.all().order_by('id')     
  serializer_class = BlogSerializer         
  

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CommentsViewset(viewsets.ModelViewSet):       
  serializer_class = CommentsSerializer         
  queryset = Comments.objects.all()



class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username':user.username  
        })





