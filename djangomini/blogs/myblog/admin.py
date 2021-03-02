from django.contrib import admin
from . models import Blog,Comments

# Register your models here.
class BlogAdmin(admin.ModelAdmin):  
  list_display = ('title', 'date', 'author', 'body','picture',)
  
class CommentsAdmin(admin.ModelAdmin):  
  list_display = ('comment_data',) 
   

admin.site.register(Blog,BlogAdmin)
admin.site.register(Comments,CommentsAdmin)