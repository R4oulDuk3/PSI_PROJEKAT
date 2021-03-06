# Generated by Django 3.2.13 on 2022-05-19 08:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app1', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Coupon',
            fields=[
                ('idcupon', models.IntegerField(db_column='idCupon', primary_key=True, serialize=False)),
                ('exparationdate', models.DateTimeField(db_column='ExparationDate')),
                ('redeemed', models.IntegerField(blank=True, db_column='Redeemed', null=True)),
                ('description', models.CharField(blank=True, db_column='Description', max_length=100, null=True)),
            ],
            options={
                'db_table': 'coupon',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='CustomerExpenditure',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.PositiveIntegerField(db_column='Amount')),
                ('day', models.DateTimeField(db_column='Day')),
            ],
            options={
                'db_table': 'customer_expenditure',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Events',
            fields=[
                ('idevents', models.AutoField(db_column='idEvents', primary_key=True, serialize=False)),
                ('description', models.CharField(blank=True, db_column='Description', max_length=100, null=True)),
                ('start', models.DateTimeField(db_column='Start')),
                ('name', models.CharField(db_column='Name', max_length=45)),
                ('end', models.DateTimeField(db_column='End')),
            ],
            options={
                'db_table': 'events',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Meni',
            fields=[
                ('idmeni', models.IntegerField(db_column='idMeni', primary_key=True, serialize=False)),
                ('meniproduct', models.CharField(db_column='MeniProduct', max_length=100)),
                ('price', models.DecimalField(db_column='Price', decimal_places=2, max_digits=12)),
                ('amount', models.DecimalField(db_column='Amount', decimal_places=2, max_digits=12)),
                ('unit', models.CharField(blank=True, db_column='Unit', max_length=45, null=True)),
                ('subtype', models.CharField(blank=True, db_column='Subtype', max_length=45, null=True)),
            ],
            options={
                'db_table': 'meni',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('idproduct', models.AutoField(db_column='idProduct', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='Name', max_length=45)),
                ('description', models.CharField(db_column='Description', max_length=100)),
                ('type', models.CharField(db_column='Type', max_length=45)),
                ('amount', models.DecimalField(blank=True, db_column='Amount', decimal_places=2, max_digits=12, null=True)),
                ('unit', models.CharField(blank=True, db_column='Unit', max_length=10, null=True)),
            ],
            options={
                'db_table': 'product',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('idsale', models.AutoField(db_column='idSale', primary_key=True, serialize=False)),
                ('from_field', models.DateTimeField(db_column='From')),
                ('duration', models.PositiveIntegerField()),
                ('newprice', models.DecimalField(db_column='NewPrice', decimal_places=2, max_digits=12)),
            ],
            options={
                'db_table': 'sale',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('day', models.DateTimeField(db_column='Day')),
                ('idschedule', models.AutoField(db_column='idSchedule', primary_key=True, serialize=False)),
                ('started', models.DateTimeField(blank=True, db_column='Started', null=True)),
                ('ended', models.DateTimeField(blank=True, db_column='Ended', null=True)),
            ],
            options={
                'db_table': 'schedule',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Shift',
            fields=[
                ('idshift', models.IntegerField(db_column='idShift', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='Name', max_length=45)),
                ('start', models.DateTimeField(db_column='Start')),
                ('end', models.DateTimeField(db_column='End')),
            ],
            options={
                'db_table': 'shift',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('idtable', models.IntegerField(primary_key=True, serialize=False)),
                ('noofseats', models.IntegerField(db_column='NoOfSeats')),
                ('group', models.IntegerField(blank=True, db_column='Group', null=True)),
            ],
            options={
                'db_table': 'table',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('idusers', models.IntegerField(db_column='idUsers', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='Name', max_length=45)),
                ('surname', models.CharField(db_column='Surname', max_length=45)),
                ('role', models.CharField(db_column='Role', max_length=45)),
                ('salary', models.DecimalField(blank=True, db_column='Salary', decimal_places=2, max_digits=12, null=True)),
                ('valute', models.CharField(blank=True, db_column='Valute', max_length=45, null=True)),
            ],
            options={
                'db_table': 'users',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='UsersCoupons',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idusers_coupons', models.IntegerField(db_column='idUsers_Coupons')),
            ],
            options={
                'db_table': 'users_coupons',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='user',
        ),
        migrations.CreateModel(
            name='CouponProducts',
            fields=[
                ('coupon', models.OneToOneField(db_column='Coupon', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='app1.coupon')),
                ('amount', models.PositiveIntegerField(blank=True, db_column='Amount', null=True)),
                ('unit', models.CharField(blank=True, db_column='Unit', max_length=45, null=True)),
            ],
            options={
                'db_table': 'coupon_products',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='EventReservation',
            fields=[
                ('event', models.OneToOneField(db_column='Event', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='app1.events')),
                ('approved', models.IntegerField(db_column='Approved')),
            ],
            options={
                'db_table': 'event_reservation',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='EventTable',
            fields=[
                ('event', models.OneToOneField(db_column='Event', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='app1.events')),
            ],
            options={
                'db_table': 'event_table',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Preference',
            fields=[
                ('day', models.DateTimeField(db_column='Day')),
                ('preferedshift', models.OneToOneField(db_column='PreferedShift', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='app1.shift')),
            ],
            options={
                'db_table': 'preference',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ReservedTables',
            fields=[
                ('reservation', models.OneToOneField(db_column='Reservation', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='app1.eventreservation')),
            ],
            options={
                'db_table': 'reserved_tables',
                'managed': False,
            },
        ),
    ]
