# Generated by Django 3.2.13 on 2022-05-22 20:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0012_authgroup_authgrouppermissions_authpermission_authuser_authusergroups_authuseruserpermissions_django'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='authuser',
            options={'managed': True},
        ),
    ]
