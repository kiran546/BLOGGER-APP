from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Blog,Comments

class BlogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Blog
        fields = ('id','title', 'date', 'author', 'body','picture')

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'email', 'password')
        extra_kwargs = {
        
            'password': {'write_only': True,'required':True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class CommentsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comments
        fields = ('comment_data')


        
