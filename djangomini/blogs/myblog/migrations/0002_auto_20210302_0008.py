# Generated by Django 3.1.6 on 2021-03-01 18:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myblog', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='blog',
            old_name='images',
            new_name='picture',
        ),
    ]
