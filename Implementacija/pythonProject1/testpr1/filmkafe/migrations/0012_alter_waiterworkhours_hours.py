# Generated by Django 4.0.4 on 2022-06-06 15:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filmkafe', '0011_alter_waiterworkhours_waiterinfo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='waiterworkhours',
            name='hours',
            field=models.FloatField(),
        ),
    ]
