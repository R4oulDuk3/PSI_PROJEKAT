# Generated by Django 3.2.13 on 2022-05-24 14:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0013_alter_authuser_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='authuser',
            options={'managed': False},
        ),
    ]
