# Generated by Django 3.2.13 on 2022-05-22 19:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0007_auto_20220520_1617'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='users',
            options={'managed': True},
        ),
        migrations.AlterModelOptions(
            name='userscoupons',
            options={'managed': True},
        ),
    ]
