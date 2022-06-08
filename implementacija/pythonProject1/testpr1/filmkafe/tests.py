from django.http import HttpRequest
from django.test import TestCase
from .models import Meni, Product, Coupon, Events, Users, Shift, Schedule, Setup, Table, SetupTables, \
    Preference, Preferences, FreeTables, EventReservations, ReservedTables, ReservedTablesNew, CustomerExpenditure, \
    ProductSold, WaiterPermit, WaiterWorkHours
# Create your tests here.
from .serializers import MeniSerializer, ProductSerializer
from .views import *


class testMeniSerializer(TestCase):
    def setUp(self):
        req = HttpRequest

    def test_meni_serializer(self):
        """Animals that can speak are correctly identified"""
        men = Meni(10,"Albino", 150.00, 0.5, "l", "Pivo", 0)
        serData = MeniSerializer(men).data
        manData = {'idmeni': 10, 'meniproduct': 'Albino', 'price': '150.00', 'amount': '0.50', 'unit': 'l', 'akcija': 0}
        self.assertEqual(serData, manData)

class testProductSerializer(TestCase):
    def setUp(self):
        req = HttpRequest

    def test_product_serializer(self):
        """Animals that can speak are correctly identified"""
        pr = Product(10,"Albino", "this is a product", "Pivo", 50.00, "l", 98202, 234.00, 973186, 40.00)
        serData = ProductSerializer(pr).data
        print(serData)
        manData = {'idproduct': 10, 'name': 'Albino', 'description': 'this is a product', 'type': 'Pivo', 'amount': '50.00', 'unit': 'l', 'productcode': 98202, 'marketprice': '234.00', 'suppliercode': 973186, 'minamount': '40.00'}
        self.assertEqual(serData, manData)




class testInventar(TestCase):
    def setUpTestData(cls):
        usr = Users.objects.create_user('manager@mail.rs', 'manager@mail.rs', 'managerpass.123', role='Manager',
                                        name="Gavrilo", surname="Vojteski", phone="+3814464846")
        usr.save(usr)

    def test_inventar_redirect_not_loged_in(self):
        res = self.client.get()

