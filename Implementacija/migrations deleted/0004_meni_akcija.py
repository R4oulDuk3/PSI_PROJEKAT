# Generated by Django 3.2.13 on 2022-05-29 15:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filmkafe', '0003_remove_meni_akcija'),
    ]

    operations = [
        migrations.AddField(
            model_name='meni',
            name='akcija',
            field=models.IntegerField(blank=True, db_column='Akcija', default=0, null=True),
        ),
    ]