# Generated by Django 5.0.3 on 2024-03-16 05:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0003_like'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='like',
            name='islike',
        ),
    ]
