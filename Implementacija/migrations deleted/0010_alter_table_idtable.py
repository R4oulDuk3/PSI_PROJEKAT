# Generated by Django 3.2.13 on 2022-05-30 15:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filmkafe', '0009_auto_20220530_1735'),
    ]

    operations = [
        migrations.AlterField(
            model_name='table',
            name='idtable',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]