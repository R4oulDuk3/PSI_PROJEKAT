# Generated by Django 3.2.13 on 2022-05-29 15:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('filmkafe', '0002_auto_20220528_2059'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='meni',
            name='akcija',
        ),
    ]
