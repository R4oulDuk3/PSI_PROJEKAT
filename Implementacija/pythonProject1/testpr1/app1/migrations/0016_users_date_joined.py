# Generated by Django 3.2.13 on 2022-05-24 14:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0015_auto_20220524_1615'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='date_joined',
            field=models.DateTimeField(db_column='DateJ', default='2022-1-1'),
            preserve_default=False,
        ),
    ]
