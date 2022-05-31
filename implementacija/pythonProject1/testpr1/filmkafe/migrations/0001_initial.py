# Generated by Django 3.2.13 on 2022-05-31 16:08

from django.conf import settings
import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Users',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('idusers', models.AutoField(db_column='idUsers', primary_key=True, serialize=False)),
                ('email', models.EmailField(db_column='Email', max_length=255, unique=True, verbose_name='email address')),
                ('name', models.CharField(db_column='Name', max_length=45)),
                ('surname', models.CharField(db_column='Surname', max_length=45)),
                ('role', models.CharField(db_column='Role', max_length=45)),
                ('phone', models.CharField(db_column='Phone', max_length=15)),
                ('imagepath', models.CharField(db_column='image', max_length=100)),
                ('salary', models.DecimalField(blank=True, db_column='Salary', decimal_places=2, max_digits=12, null=True)),
                ('valute', models.CharField(blank=True, db_column='Valute', max_length=45, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'db_table': 'users',
                'managed': True,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Coupon',
            fields=[
                ('idcupon', models.IntegerField(db_column='idCupon', primary_key=True, serialize=False)),
                ('description', models.CharField(blank=True, db_column='Description', max_length=100, null=True)),
                ('name', models.CharField(db_column='Name', default='Ime', max_length=100)),
                ('picture', models.CharField(db_column='image', max_length=100)),
            ],
            options={
                'db_table': 'coupon',
                'managed': True,
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
                ('picture', models.CharField(db_column='image', max_length=100)),
            ],
            options={
                'db_table': 'events',
                'managed': True,
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
                ('akcija', models.IntegerField(blank=True, db_column='Akcija', default=0, null=True)),
            ],
            options={
                'db_table': 'meni',
                'ordering': ('subtype',),
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('idproduct', models.AutoField(db_column='idProduct', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='Name', max_length=45)),
                ('description', models.CharField(db_column='Description', default='', max_length=100)),
                ('type', models.CharField(db_column='Type', max_length=45)),
                ('amount', models.DecimalField(db_column='Amount', decimal_places=2, max_digits=12)),
                ('unit', models.CharField(db_column='Unit', max_length=10)),
                ('productcode', models.IntegerField(db_column='ProductCode')),
                ('marketprice', models.DecimalField(db_column='MarketPrice', decimal_places=2, max_digits=12)),
                ('suppliercode', models.IntegerField(db_column='SupplierCode')),
                ('minamount', models.DecimalField(blank=True, db_column='MinAmount', decimal_places=2, max_digits=12, null=True)),
            ],
            options={
                'db_table': 'product',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Setup',
            fields=[
                ('idsetup', models.AutoField(db_column='idSetup', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='Name', default='', max_length=50)),
            ],
            options={
                'db_table': 'setup',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Shift',
            fields=[
                ('idshift', models.IntegerField(db_column='idShift', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='Name', max_length=45)),
                ('start', models.TimeField(db_column='Start')),
                ('end', models.TimeField(db_column='End')),
            ],
            options={
                'db_table': 'shift',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('idtable', models.AutoField(primary_key=True, serialize=False)),
                ('noofseats', models.IntegerField(db_column='NoOfSeats')),
                ('name', models.CharField(blank=True, db_column='name', max_length=30)),
            ],
            options={
                'db_table': 'table',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='EventReservation',
            fields=[
                ('event', models.OneToOneField(db_column='Event', on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='filmkafe.events')),
                ('approved', models.IntegerField(db_column='Approved')),
                ('user', models.ForeignKey(db_column='User', on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'event_reservation',
                'managed': True,
                'unique_together': {('event', 'user')},
            },
        ),
        migrations.CreateModel(
            name='UsersCoupons',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idusers_coupons', models.IntegerField(db_column='idUsers_Coupons')),
                ('coupon', models.ForeignKey(db_column='Coupon', on_delete=django.db.models.deletion.DO_NOTHING, to='filmkafe.coupon')),
                ('user', models.ForeignKey(db_column='User', on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'users_coupons',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='SetupTables',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('setup', models.ForeignKey(db_column='Setup', on_delete=django.db.models.deletion.CASCADE, to='filmkafe.setup')),
                ('table', models.ForeignKey(db_column='Table', on_delete=django.db.models.deletion.CASCADE, to='filmkafe.table')),
            ],
            options={
                'db_table': 'setuptables',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('day', models.DateTimeField(db_column='Day')),
                ('idschedule', models.AutoField(db_column='idSchedule', primary_key=True, serialize=False)),
                ('started', models.DateTimeField(blank=True, db_column='Started', null=True)),
                ('ended', models.DateTimeField(blank=True, db_column='Ended', null=True)),
                ('shift', models.ForeignKey(db_column='shift', on_delete=django.db.models.deletion.DO_NOTHING, to='filmkafe.shift')),
                ('waiter', models.ForeignKey(db_column='Weighter', on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'schedule',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('idsale', models.AutoField(db_column='idSale', primary_key=True, serialize=False)),
                ('from_field', models.DateTimeField(db_column='From')),
                ('duration', models.PositiveIntegerField()),
                ('newprice', models.DecimalField(db_column='NewPrice', decimal_places=2, max_digits=12)),
                ('productonsale', models.ForeignKey(db_column='ProductOnSale', on_delete=django.db.models.deletion.DO_NOTHING, to='filmkafe.meni')),
            ],
            options={
                'db_table': 'sale',
                'managed': True,
            },
        ),
        migrations.AddField(
            model_name='events',
            name='setup',
            field=models.ForeignKey(db_column='Setup', null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='filmkafe.setup'),
        ),
        migrations.CreateModel(
            name='CustomerExpenditure',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(db_column='Amount', decimal_places=2, max_digits=12)),
                ('unit', models.CharField(blank=True, db_column='Unit', max_length=45, null=True)),
                ('day', models.DateTimeField(db_column='Day')),
                ('customer', models.ForeignKey(db_column='Customer', on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'customer_expenditure',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='Preference',
            fields=[
                ('day', models.DateTimeField(db_column='Day')),
                ('preferedshift', models.OneToOneField(db_column='PreferedShift', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='filmkafe.shift')),
                ('waiter', models.ForeignKey(db_column='Waiter', on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'preference',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='EventTable',
            fields=[
                ('event', models.OneToOneField(db_column='Event', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='filmkafe.events')),
                ('table', models.ForeignKey(db_column='Table', on_delete=django.db.models.deletion.DO_NOTHING, to='filmkafe.table')),
            ],
            options={
                'db_table': 'event_table',
                'managed': True,
                'unique_together': {('event', 'table')},
            },
        ),
        migrations.CreateModel(
            name='CouponProducts',
            fields=[
                ('coupon', models.OneToOneField(db_column='Coupon', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='filmkafe.coupon')),
                ('amount', models.PositiveIntegerField(blank=True, db_column='Amount', null=True)),
                ('unit', models.CharField(blank=True, db_column='Unit', max_length=45, null=True)),
                ('product', models.ForeignKey(db_column='Product', on_delete=django.db.models.deletion.DO_NOTHING, to='filmkafe.meni')),
            ],
            options={
                'db_table': 'coupon_products',
                'managed': True,
                'unique_together': {('coupon', 'product')},
            },
        ),
        migrations.CreateModel(
            name='ReservedTables',
            fields=[
                ('reservation', models.OneToOneField(db_column='Reservation', on_delete=django.db.models.deletion.DO_NOTHING, primary_key=True, serialize=False, to='filmkafe.eventreservation')),
                ('reservedtables', models.ForeignKey(db_column='ReservedTables', on_delete=django.db.models.deletion.CASCADE, to='filmkafe.table')),
            ],
            options={
                'db_table': 'reserved_tables',
                'managed': True,
                'unique_together': {('reservation', 'reservedtables')},
            },
        ),
    ]
