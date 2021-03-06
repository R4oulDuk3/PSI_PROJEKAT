# Generated by Django 4.0.4 on 2022-06-06 11:23

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('filmkafe', '0005_alter_preferences_day'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductSold',
            fields=[
                ('idProductSold', models.AutoField(db_column='id', primary_key=True, serialize=False)),
                ('day', models.DateTimeField(db_column='day')),
                ('amount', models.PositiveIntegerField()),
                ('product', models.ForeignKey(db_column='Product', on_delete=django.db.models.deletion.DO_NOTHING, to='filmkafe.product')),
            ],
            options={
                'db_table': 'productSold',
                'managed': True,
            },
        ),
    ]
