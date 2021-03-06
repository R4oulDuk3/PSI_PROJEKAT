# Generated by Django 3.2.13 on 2022-05-31 16:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('filmkafe', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Preferences',
            fields=[
                ('day', models.DateTimeField(db_column='Day')),
                ('idpref', models.AutoField(db_column='idpreference', primary_key=True, serialize=False)),
                ('preferedshift', models.ForeignKey(db_column='PreferedShift', on_delete=django.db.models.deletion.DO_NOTHING, to='filmkafe.shift')),
                ('waiter', models.ForeignKey(db_column='Waiter', on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'preferences',
                'managed': True,
            },
        ),
    ]
