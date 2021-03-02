from django.db import models
from django.contrib.auth.models import User

# Create your models here.

# class Blogger(models.Model):
#     user_name=models.CharField(max_length=200)
#     email=models.EmailField(max_length=254)
#     password=models.CharField(max_length=50)

#     def __str__(self):
#         return self.user_name

class Blog(models.Model):
    title=models.CharField( max_length=250)
    date=models.DateField("date",auto_now=True)
    author = models.ForeignKey(User,null=True, blank=True,  on_delete=models.CASCADE )
    body = models.TextField(default=0)
    likes = models.IntegerField(default=0)
    picture = models.ImageField(upload_to='pict',blank=True,null=True)

    def __str__(self):
        return self.title 

class Comments(models.Model):
    comment_data = models.CharField(max_length=200)
    ref = models.ForeignKey(Blog, on_delete=models.CASCADE)

    