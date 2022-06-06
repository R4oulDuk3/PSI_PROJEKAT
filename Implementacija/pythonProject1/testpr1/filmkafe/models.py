# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import AbstractUser



class Coupon(models.Model):
    idcupon = models.IntegerField(db_column='idCupon', primary_key=True)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=100, blank=True, null=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=100, null = False, default="Ime")
    picture = models.CharField(db_column='image', max_length=100)
    points = models.IntegerField(db_column='points', default=100)

    class Meta:
        managed = True
        db_table = 'coupon'


class CouponProducts(models.Model):
    coupon = models.OneToOneField(Coupon, models.DO_NOTHING, db_column='Coupon', primary_key=True)  # Field name made lowercase.
    product = models.ForeignKey('Meni', models.DO_NOTHING, db_column='Product')  # Field name made lowercase.
    amount = models.PositiveIntegerField(db_column='Amount', blank=True, null=True)  # Field name made lowercase.
    unit = models.CharField(db_column='Unit', max_length=45, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'coupon_products'
        unique_together = (('coupon', 'product'),)


class CustomerExpenditure(models.Model):
    customer = models.ForeignKey('Users', models.DO_NOTHING, db_column='Customer')  # Field name made lowercase.
    amount = models.DecimalField(db_column='Amount', max_digits=12, decimal_places=2)  # Field name made lowercase.
    userInfo = models.CharField(db_column='userInfo', max_length=45, blank=True, null=True)  # Field name made lowercase.
    day = models.DateTimeField(db_column='Day')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'customer_expenditure'


class FreeTables(models.Model):
    table = models.ForeignKey('Table', db_column='Table', on_delete=models.CASCADE)
    event = models.ForeignKey('Events', db_column='Event', on_delete=models.CASCADE)
    class Meta:
        managed = True
        db_table = 'free_tables'



class EventReservations(models.Model):
    event = models.ForeignKey('Events', db_column='Event', on_delete=models.CASCADE)  # Field name made lowercase.
    user = models.ForeignKey('Users', models.DO_NOTHING, db_column='User')  # Field name made lowercase.
    approved = models.IntegerField(db_column='Approved')  # Field name made lowercase.
    noofseats = models.IntegerField(db_column='Noofseats', default=0)
    id = models.AutoField(db_column = 'ID', primary_key = True)
    phone = models.CharField(db_column='Phone', max_length=15)

    class Meta:
        managed = True
        db_table = 'event_reservation'
        unique_together = (('event', 'user'),)


class EventReservation(models.Model):
    event = models.ForeignKey('Events', db_column='Event', on_delete=models.CASCADE)  # Field name made lowercase.
    user = models.ForeignKey('Users', models.DO_NOTHING, db_column='User')  # Field name made lowercase.
    approved = models.IntegerField(db_column='Approved')  # Field name made lowercase.
    noofseats = models.IntegerField(db_column='Noofseats', default=0)
    id = models.AutoField(db_column = 'ID', primary_key = True)

    class Meta:
        managed = True
        db_table = 'event_reservations'
        unique_together = (('event', 'user'),)


class EventTable(models.Model):
    event = models.OneToOneField('Events', models.DO_NOTHING, db_column='Event', primary_key=True)  # Field name made lowercase.
    table = models.ForeignKey('Table', models.DO_NOTHING, db_column='Table')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'event_table'


class Events(models.Model):
    idevents = models.AutoField(db_column='idEvents', primary_key=True)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=100, blank=True, null=True)  # Field name made lowercase.
    start = models.DateTimeField(db_column='Start')  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=45)  # Field name made lowercase.
    end = models.DateTimeField(db_column='End')  # Field name made lowercase.
    picture = models.CharField(db_column='image', max_length=100)
    setup = models.ForeignKey('Setup', models.DO_NOTHING, db_column='Setup', null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'events'


class Meni(models.Model):
    idmeni = models.IntegerField(db_column='idMeni', primary_key=True)  # Field name made lowercase.
    meniproduct = models.CharField(db_column='MeniProduct', max_length=100)  # Field name made lowercase.
    price = models.DecimalField(db_column='Price', max_digits=12, decimal_places=2)  # Field name made lowercase.
    amount = models.DecimalField(db_column='Amount', max_digits=12, decimal_places=2)  # Field name made lowercase.
    unit = models.CharField(db_column='Unit', max_length=45, blank=True, null=True)  # Field name made lowercase.
    subtype = models.CharField(db_column='Subtype', max_length=45, blank=True, null=True)  # Field name made lowercase.
    akcija = models.IntegerField(db_column='Akcija', blank=True, null=True, default=0)  # Field name made lowercase.

    class Meta:
        ordering = ('subtype',)
        managed = True
        db_table = 'meni'


class Preference(models.Model):
    day = models.DateTimeField(db_column='Day')  # Field name made lowercase.
    preferedshift = models.OneToOneField('Shift', models.DO_NOTHING, db_column='PreferedShift', primary_key=True)  # Field name made lowercase.
    waiter = models.ForeignKey('Users', models.DO_NOTHING,  db_column='Waiter')

    class Meta:
        managed = True
        db_table = 'preference'

class Preferences(models.Model):
    day = models.DateTimeField(db_column='Day')  # Field name made lowercase.
    preferedshift = models.ForeignKey('Shift', models.CASCADE, db_column='PreferedShift')  # Field name made lowercase.
    waiter = models.ForeignKey('Users', models.CASCADE,  db_column='Waiter')
    idpref = models.AutoField(db_column = 'idpreference', primary_key = True)

    class Meta:
        managed = True
        db_table = 'preferences'

class Product(models.Model):
    idproduct = models.AutoField(db_column='idProduct', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=45)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=100, default="")  # Field name made lowercase.
    type = models.CharField(db_column='Type', max_length=45)  # Field name made lowercase.
    amount = models.DecimalField(db_column='Amount', max_digits=12, decimal_places=2)  # Field name made lowercase.
    unit = models.CharField(db_column='Unit', max_length=10)  # Field name made lowercase.
    productcode = models.IntegerField(db_column='ProductCode')  # Field name made lowercase.
    marketprice = models.DecimalField(db_column='MarketPrice', max_digits=12, decimal_places=2)  # Field name made lowercase.
    suppliercode = models.IntegerField(db_column='SupplierCode')  # Field name made lowercase.
    minamount = models.DecimalField(db_column='MinAmount', max_digits=12, decimal_places=2, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'product'

class SetupTables(models.Model):
    setup = models.ForeignKey('Setup', models.CASCADE, db_column='Setup')  # Field name made lowercase.
    table = models.ForeignKey('Table', models.CASCADE, db_column='Table')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'setuptables'

class Setup(models.Model):
    idsetup = models.AutoField(db_column='idSetup', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=50, default="")  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'setup'

class ReservedTables(models.Model):
    reservation = models.OneToOneField(EventReservations, models.DO_NOTHING, db_column='Reservation')  # Field name made lowercase.
    reservedtables = models.ForeignKey('Table', models.DO_NOTHING, db_column='ReservedTables')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'reserved_tables'
        unique_together = (('reservation', 'reservedtables'),)




class ReservedTablesNew(models.Model):
    reservation = models.ForeignKey('EventReservations', models.CASCADE,db_column='Reservation')  # Field name made lowercase.
    reservedtables = models.ForeignKey('Table', models.CASCADE,db_column='ReservedTables')  # Field name made lowercase.
    id = models.AutoField(db_column='id', primary_key=True)
    class Meta:
        managed = True
        db_table = 'reserved_tables_new'
        unique_together = (('reservation', 'reservedtables'),)


class Sale(models.Model):
    idsale = models.AutoField(db_column='idSale', primary_key=True)  # Field name made lowercase.
    productonsale = models.ForeignKey(Meni, models.DO_NOTHING, db_column='ProductOnSale')  # Field name made lowercase.
    from_field = models.DateTimeField(db_column='From')  # Field name made lowercase. Field renamed because it was a Python reserved word.
    duration = models.PositiveIntegerField()
    newprice = models.DecimalField(db_column='NewPrice', max_digits=12, decimal_places=2)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'sale'

class ProductSold(models.Model):
    idProductSold = models.AutoField(db_column='id', primary_key=True)  # Field name made lowercase.
    product = models.ForeignKey(Product, models.CASCADE, db_column='productId')  # Field name made lowercase.
    name =  models.CharField(db_column='Name', max_length=50, default="")
    day = models.DateTimeField(db_column='day')  # Field name made lowercase. Field renamed because it was a Python reserved word.
    amount = models.PositiveIntegerField()  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'productSold'

class Schedule(models.Model):
    waiter = models.ForeignKey('Users', models.CASCADE, db_column='Weighter')  # Field name made lowercase.
    shift = models.ForeignKey('Shift', models.DO_NOTHING, db_column='shift')
    day = models.DateTimeField(db_column='Day')  # Field name made lowercase.
    idschedule = models.AutoField(db_column='idSchedule', primary_key=True)  # Field name made lowercase.
    started = models.DateTimeField(db_column='Started', blank=True, null=True)  # Field name made lowercase.
    ended = models.DateTimeField(db_column='Ended', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'schedule'



class Shift(models.Model):
    idshift = models.IntegerField(db_column='idShift', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=45)  # Field name made lowercase.
    start = models.TimeField(db_column='Start')  # Field name made lowercase.
    end = models.TimeField(db_column='End')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'shift'




class Table(models.Model):
    idtable = models.AutoField(primary_key=True)
    noofseats = models.IntegerField(db_column='NoOfSeats')  # Field name made lowercase.
    name = models.CharField(db_column='name', blank=True, max_length=30)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'table'


class Users(AbstractUser):
    idusers = models.AutoField(db_column='idUsers', primary_key=True)  # Field name made lowercase.
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
        db_column='Email',
    )
    name = models.CharField(db_column='Name', max_length=45)  # Field name made lowercase.
    surname = models.CharField(db_column='Surname', max_length=45)  # Field name made lowercase.
    role = models.CharField(db_column='Role', max_length=45)  # Field name made lowercase.
    phone = models.CharField(db_column='Phone', max_length=15)
    imagepath = models.CharField(db_column='image', max_length=100)
    salary = models.DecimalField(db_column='Salary', max_digits=12, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    valute = models.CharField(db_column='Valute', max_length=45, blank=True, null=True)  # Field name made lowercase.
    totalexp = models.IntegerField(db_column='TotalExp', default=0)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        managed = True
        db_table = 'users'


class UsersCoupons(models.Model):
    idusers_coupons = models.IntegerField(db_column='idUsers_Coupons')  # Field name made lowercase.
    user = models.ForeignKey(Users, models.DO_NOTHING, db_column='User')  # Field name made lowercase.
    coupon = models.ForeignKey(Coupon, models.DO_NOTHING, db_column='Coupon')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'users_coupons'


class WaiterWorkHours(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)  # Field name made lowercase.
    waiter = models.ForeignKey(Users, models.DO_NOTHING, db_column='WaiterId')
    waiterInfo = models.CharField(db_column='waiterInfo', max_length=45)  # Field name made lowercase.
    day = models.DateTimeField(db_column='day')  # Field name made lowercase.
    hours = models.FloatField()  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'WaiterWorkHours'


class WaiterPermit(models.Model):
    id = models.AutoField(db_column='id', primary_key=True)  # Field name made lowercase.
    waiter = models.ForeignKey(Users, models.DO_NOTHING, db_column='WaiterId') # Field name made lowercase.
    day = models.DateTimeField(db_column='day')  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'WaiterPermit'
