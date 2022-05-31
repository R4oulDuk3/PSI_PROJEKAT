from rest_framework import serializers
from .models import *


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'


class CouponProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CouponProducts
        fields = '__all__'


class CustomerExpenditureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerExpenditure
        fields = '__all__'


class EventReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventReservation
        fields = '__all__'


class EventTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventTable
        fields = '__all__'


class EventsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Events
        #fields = '__all__'
        exclude = ('setup',)


class MeniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meni
        fields = ['idmeni', 'meniproduct', 'price', 'amount', 'unit', 'akcija']


class MeniInsertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meni
        fields = ['idmeni', 'meniproduct', 'price', 'amount', 'unit', 'akcija', 'subtype']


class PreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preference
        fields = '__all__'


class SetupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setup
        fields = '__all__'



class SetupTablesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SetupTables
        fields = '__all__'


class SetupCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Setup
        exclude = ('idsetup',)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        extra_kwargs = {'type': {'required': False}}


class ReservedTablesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReservedTables
        fields = '__all__'


class SaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'


class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Schedule
        fields = '__all__'


class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = '__all__'


class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'


class TableCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        exclude = ('idtable',)

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['idusers' ,'name', 'surname', 'email', 'phone', 'role', 'username', 'imagepath', 'password']


class UsersCouponsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsersCoupons
        fields = '__all__'
