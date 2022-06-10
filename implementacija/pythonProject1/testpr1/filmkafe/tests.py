from collections import OrderedDict

from django.http import HttpRequest
from django.test import TestCase, Client
from django.urls import reverse

from .models import Meni, Product, Coupon, Events, Users, Shift, Schedule, Setup, Table, SetupTables, \
    Preference, Preferences, FreeTables, EventReservations, ReservedTables, ReservedTablesNew, CustomerExpenditure, \
    ProductSold, WaiterPermit, WaiterWorkHours
# Create your tests here.
from .serializers import MeniSerializer, ProductSerializer
from .views import *




class testViewsManager1(TestCase):
    @classmethod
    def setUpTestData(cls):
        '''
        usr = Users.objects.create_user('manager@mail.rs', 'manager@mail.rs', 'managerpass.123', role='Manager',
                                        name="Gavrilo", surname="Vojteski", phone="+3814464846")
        #usr.save(usr)'''

        usr = Users.objects.create_user(username="cone@gmail.com",
                                        email="cone@gmail.com",
                                        password="cone",
                                        role='User',
                                        name='name',
                                        surname='surname',
                                        phone='phone',
                                        salary=0,
                                        idusers=1
                                        )
        waiter = Users.objects.create_user(username="con@gmail.com",
                                           email="con@gmail.com",
                                           password="cone",
                                           role='Waiter',
                                           name='name',
                                           surname='surname',
                                           phone='phone',
                                           salary=0,
                                           idusers=2
                                           )
        manager = Users.objects.create_user(username="co@gmail.com",
                                            email="co@gmail.com",
                                            password="cone",
                                            role='Manager',
                                            name='name',
                                            surname='surname',
                                            phone='phone',
                                            salary=0,
                                            idusers=3
                                            )
        waiter = Users.objects.create_user(username="c@gmail.com",
                                           email="c@gmail.com",
                                           password="cone",
                                           role='Waiter',
                                           name='name',
                                           surname='surname',
                                           phone='phone',
                                           salary=0,
                                           idusers=4
                                           )

        cls.clientUser = Client()
        cls.clientWaiter = Client()
        cls.clientManager = Client()
        cls.clientUser.login(username="cone@gmail.com", password='cone')
        cls.clientWaiter.login(username="con@gmail.com", password='cone')
        cls.clientManager.login(username="co@gmail.com", password='cone')
        meni = MeniInsertSerializer(data=[{
            "idmeni": "1",
            "meniproduct": "Albino",
            "price": "350.0",
            "amount": "0.5",
            "unit": "l",
            "subtype": "Pivo",
            "akcija": "0"
        }, {
            "idmeni": "2",
            "meniproduct": "Hoptopod",
            "price": "350.0",
            "amount": "0.5",
            "unit": "l",
            "subtype": "Pivo",
            "akcija": "0"
        },{
            "idmeni": "3",
            "meniproduct": "Redbreast",
            "price": "500.0",
            "amount": "0.5",
            "unit": "l",
            "subtype": "Viski",
            "akcija": "0"
        },{
            "idmeni": "4",
            "meniproduct": "Ardberg",
            "price": "250.0",
            "amount": "0.5",
            "unit": "l",
            "subtype": "Viski",
            "akcija": "0"
        }], many=True
        )
        # print("Shifts valid: " + str(shift.is_valid()))
        if (meni.is_valid()):
            meni.save()
        product = ProductSerializer(data=[
            {'idproduct': 1, 'name': 'Albino', 'description': 'this is a product', 'type': 'Pivo', 'amount': '50.00', 'unit': 'l', 'productcode': 98202, 'marketprice': '234.00', 'suppliercode': 973186, 'minamount': '40.00'},

            {'idproduct': 2, 'name': 'Hoptopod', 'description': 'this is a product', 'type': 'Pivo', 'amount': '50.00','unit': 'l', 'productcode': 98202, 'marketprice': '234.00', 'suppliercode': 973186, 'minamount': '60.00'}
        ], many=True)
        if(product.is_valid()):
            product.save()
        setup = SetupSerializer(data={"idsetup": "1", "name": "Postavka1"})
        # print("Setup " + str(setup.is_valid()))
        if setup.is_valid():
            setup.save()
        table = TableSerializer(data=[
            {
                "idtable": "1",
                "noofseats": "8",
                "name": "Separe 1"
            },
            {"idtable": "2",
             "noofseats": "8",
             "name": "Separe 2"
             },
            {"idtable": "3",
             "noofseats": "8",
             "name": "Separe 3"
             },
            {"idtable": "4",
             "noofseats": "8",
             "name": "Separe 4"
             }
        ], many=True)
        # print("table " + str(table.is_valid()))
        if (table.is_valid()):
            table.save()

        events = EventsSerializer(data=[
            {"idevents": "1",
             "name": "Zurka 1",
             "end": "2022-06-09T21:56:51",
             "description": "aaaa",
             "start": "2022-06-09T21:56:51",
             "picture": "162seo0jLUY82kSTZEDj9zwYerODCe",
             "setup": "1"
             }
        ], many=True)
        # print("Events valid: " + str(events.is_valid()))
        if (events.is_valid()):
            events.save()
        FreeTables.objects.create(table=Table.objects.get(idtable=1),
                                  event=Events.objects.get(idevents=1))
        FreeTables.objects.create(table=Table.objects.get(idtable=2),
                                  event=Events.objects.get(idevents=1))


        res = CouponSerializer(data={
            "idcupon": "1",
            "description": "",
            "name": "Coup",
            "picture": "...",
            "points": 1000

        })

        if (res.is_valid()):
            res.save()

    def test_inventar_redirect_not_loged_in(self):
        res = self.client.get('http://127.0.0.1:8000/filmkafe/inventar')
    def test_api_meni(self):
        res = self.clientUser.get(reverse("apiMeni"))
        expected = [{'naziv': 'Pivo', 'stavke': [OrderedDict([('idmeni', 1), ('meniproduct', 'Albino'), ('price', '350.00'), ('amount', '0.50'), ('unit', 'l'), ('akcija', 0)]), OrderedDict([('idmeni', 2), ('meniproduct', 'Hoptopod'), ('price', '350.00'), ('amount', '0.50'), ('unit', 'l'), ('akcija', 0)])]}, {'naziv': 'Viski', 'stavke': [OrderedDict([('idmeni', 3), ('meniproduct', 'Redbreast'), ('price', '500.00'), ('amount', '0.50'), ('unit', 'l'), ('akcija', 0)]), OrderedDict([('idmeni', 4), ('meniproduct', 'Ardberg'), ('price', '250.00'), ('amount', '0.50'), ('unit', 'l'), ('akcija', 0)])]}]

        self.assertEqual(res.status_code, 200)
        self.assertEqual(expected, res.data)

    def test_api_meni_add_user(self):
        res = self.clientUser.post(reverse("apiMeniAdd"),{"kukuruz":"[{\"naziv\":\"Pivo\", \"stavke\":[{\"idmeni\": \"1\",\"meniproduct\": \"Albino\",\"price\": \"350.0\",\"amount\": \"0\",\"unit\": \"l\",\"subtype\": \"Pivo\",\"akcija\": \"0\"}]}]"})

        self.assertEqual(res.status_code, 403)
        '''
        self.assertEqual(tried, res.data)'''


    def test_api_meni_add_user(self):
        res = self.clientWaiter.post(reverse("apiMeniAdd"),{"kukuruz":"[{\"naziv\":\"Pivo\", \"stavke\":[{\"idmeni\": \"1\",\"meniproduct\": \"Albino\",\"price\": \"350.0\",\"amount\": \"0\",\"unit\": \"l\",\"subtype\": \"Pivo\",\"akcija\": \"0\"}]}]"})

        self.assertEqual(res.status_code, 403)

    def test_api_meni_add_manager(self):
            res = self.clientManager.post(reverse("apiMeniAdd"), {
                "kukuruz": "[{\"naziv\":\"Pivo\", \"stavke\":[{\"idmeni\": \"1\",\"meniproduct\": \"Albino\",\"price\": \"350.0\",\"amount\": \"0\",\"unit\": \"l\",\"subtype\": \"Pivo\",\"akcija\": \"0\"}]}]"})

            got = Meni.objects.all()
            got = MeniInsertSerializer(got, many = True)
            expected = [OrderedDict([('idmeni', 1), ('meniproduct', 'Albino'), ('price', '350.00'), ('amount', '0.00'), ('unit', 'l'), ('akcija', 0), ('subtype', 'Pivo')])]
            self.assertEqual(res.status_code, 200)
            self.assertEqual(got.data, expected)
            '''
            self.assertEqual(tried, res.data)'''
    def test_api_product_user(self):
        res = self.clientUser.get(reverse("apiProduct"))

        self.assertEqual(res.status_code, 403)



    def test_api_product_waiter(self):
        res = self.clientWaiter.get(reverse("apiProduct"))

        self.assertEqual(res.status_code, 200)


    def test_api_product_manager(self):
        res = self.clientManager.get(reverse("apiProduct"))
        expected = [OrderedDict([('idproduct', 1), ('name', 'Albino'), ('description', 'this is a product'), ('type', 'Pivo'), ('amount', '50.00'), ('unit', 'l'), ('productcode', 98202), ('marketprice', '234.00'), ('suppliercode', 973186), ('minamount', '40.00')])]

        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, expected)

    def test_api_all_product_user(self):
        res = self.clientUser.get(reverse("apiProductAll"))

        self.assertEqual(res.status_code, 403)



    def test_api_product_all_waiter(self):
        res = self.clientWaiter.get(reverse("apiProductAll"))

        self.assertEqual(res.status_code, 200)


    def test_api_product_all_manager(self):
        res = self.clientManager.get(reverse("apiProductAll"))
        expected = [OrderedDict([('idproduct', 1), ('name', 'Albino'), ('description', 'this is a product'), ('type', 'Pivo'), ('amount', '50.00'), ('unit', 'l'), ('productcode', 98202), ('marketprice', '234.00'), ('suppliercode', 973186), ('minamount', '40.00')]), OrderedDict([('idproduct', 2), ('name', 'Hoptopod'), ('description', 'this is a product'), ('type', 'Pivo'), ('amount', '50.00'), ('unit', 'l'), ('productcode', 98202), ('marketprice', '234.00'), ('suppliercode', 973186), ('minamount', '60.00')])]

        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, expected)




    def test_api_def_product_user(self):
        res = self.clientUser.get(reverse("apiDeficientProduct"))

        self.assertEqual(res.status_code, 403)



    def test_api_def_product_waiter(self):
        res = self.clientWaiter.get(reverse("apiDeficientProduct"))

        self.assertEqual(res.status_code, 200)


    def test_api_def_product_manager(self):
        res = self.clientManager.get(reverse("apiDeficientProduct"))
        expected = [OrderedDict([('idproduct', 2), ('name', 'Hoptopod'), ('description', 'this is a product'), ('type', 'Pivo'), ('amount', '50.00'), ('unit', 'l'), ('productcode', 98202), ('marketprice', '234.00'), ('suppliercode', 973186), ('minamount', '60.00')])]

        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, expected)

    def test_api_product_delete_manager(self):
        res = self.clientManager.post(reverse("apiDeleteProduct"),{"idproduct":"1"})
        expected = 1
        newln = Product.objects.all()
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(newln), expected)


    def test_api_product_delete_user(self):
        res = self.clientUser.post(reverse("apiDeleteProduct"),{"idproduct":"1"})
        expected = 1
        newln = Product.objects.all()
        self.assertEqual(res.status_code, 403)


    def test_api_product_update_user(self):
        res = self.clientUser.post(reverse("apiUpdateProduct"),{"popis":"[{\"idproduct\":\"1\", \"potrosenaKolicina\":\"10\", \"name\":\"Albino\"}]"})
        expected = 1
        newln = Product.objects.all()
        self.assertEqual(res.status_code, 403)





    def test_api_product_update_manager(self):
        res = self.clientManager.post(reverse("apiUpdateProduct"),{"popis":"[{\"idproduct\":\"1\", \"potrosenaKolicina\":\"10\", \"name\":\"Albino\"}]"})
        expected = Product.objects.filter(idproduct=1).values('amount')[0]['amount']
        newln = Product.objects.all()
        self.assertEqual(res.status_code, 200)
        self.assertEqual(expected, 40.00)


    def test_api_product_update_waiter(self):
        res = self.clientWaiter.post(reverse("apiUpdateProduct"),{"popis":"[{\"idproduct\":\"1\", \"potrosenaKolicina\":\"10\", \"name\":\"Albino\"}]"})
        expected = Product.objects.filter(idproduct=1).values('amount')[0]['amount']
        newln = Product.objects.all()
        self.assertEqual(res.status_code, 200)
        self.assertEqual(expected, 40.00)



    def test_api_product_set_manager(self):
        res = self.clientManager.post(reverse("apiSetProduct"),{'idproduct': 3, 'name': 'Plutonium', 'description': 'this is a product', 'type': 'Pivo', 'amount': '50.00', 'unit': 'l', 'productcode': 98202, 'marketprice': '234.00', 'suppliercode': 973186, 'minamount': '40.00'})
        expected = Product.objects.all()
        newln = Product.objects.all()
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(expected), 3)



    def test_api_product_set_waiter(self):
        res = self.clientWaiter.post(reverse("apiSetProduct"),{'idproduct': 3, 'name': 'Plutonium', 'description': 'this is a product', 'type': 'Pivo', 'amount': '50.00', 'unit': 'l', 'productcode': 98202, 'marketprice': '234.00', 'suppliercode': 973186, 'minamount': '40.00'})
        expected = Product.objects.all()
        newln = Product.objects.all()
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(expected), 3)


    def test_api_product_set_user(self):
        res = self.clientUser.post(reverse("apiSetProduct"),{'idproduct': 3, 'name': 'Plutonium', 'description': 'this is a product', 'type': 'Pivo', 'amount': '50.00', 'unit': 'l', 'productcode': 98202, 'marketprice': '234.00', 'suppliercode': 973186, 'minamount': '40.00'})

        self.assertEqual(res.status_code, 403)



    def test_api_cupon(self):
        res = self.clientUser.get(reverse("apiCoupon"))
        expected = [OrderedDict([('idcupon', 1), ('description', ''), ('name', 'Coup'), ('picture', '...'), ('points', 1000)])]

        self.assertEqual(res.status_code, 200)
        self.assertEqual(expected, res.data)


    def test_api_event(self):
        res = self.clientUser.get(reverse("apiEvents"))
        expected = [OrderedDict([('idevents', 1), ('description', 'aaaa'), ('start', '2022-06-09T21:56:51Z'), ('name', 'Zurka 1'), ('end', '2022-06-09T21:56:51Z'), ('picture', '162seo0jLUY82kSTZEDj9zwYerODCe'), ('setup', 1)])]

        self.assertEqual(res.status_code, 200)
        self.assertEqual(expected, res.data)



    def test_create_cupon_manager(self):
        res = self.clientManager.post(reverse("apiCreateCoupon"), {"description": "bbbbb",
            "name": "Coup2",
            "picture": "...",
            "points": 1001})
        expected = Coupon.objects.all()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(expected), 2)


    def test_create_cupon_user(self):
        res = self.clientUser.post(reverse("apiCreateCoupon"), {"description": "",
            "name": "Coup2",
            "picture": "...",
            "points": 1001})
        self.assertEqual(res.status_code, 403)


    def test_create_cupon_waiter(self):
        res = self.clientWaiter.post(reverse("apiCreateCoupon"), {"description": "",
            "name": "Coup2",
            "picture": "...",
            "points": 1001})
        self.assertEqual(res.status_code, 403)


    def test_delete_cupon_manager(self):
        res = self.clientManager.post(reverse("apiDeleteCoupon"), {"idcupon": "1"})
        expected = Coupon.objects.all()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(expected), 0)


    def test_delete_cupon_user(self):
        res = self.clientUser.post(reverse("apiDeleteCoupon"), {"idcupon": "1"})
        self.assertEqual(res.status_code, 403)


    def test_delete_cupon_waiter(self):
        res = self.clientWaiter.post(reverse("apiDeleteCoupon"), {"idcupon": "1"})
        self.assertEqual(res.status_code, 403)



    def test_create_event_manager(self):
        res = self.clientManager.post(reverse("apiCreateEvent"), {"idevents": "2",
             "name": "Zurka 2",
             "end": "2022-09-09T21:56:51",
             "description": "aaaa",
             "start": "2022-09-11T21:56:51",
             "picture": "162seo0jLUY82kSTZEDj9zwYerODCe",
             "setup": "1"
             })
        expected = Events.objects.all()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(expected), 2)


    def test_create_event_user(self):
        res = self.clientUser.post(reverse("apiCreateEvent"), {"idevents": "1",
             "name": "Zurka 1",
             "end": "2022-06-09T21:56:51",
             "description": "aaaa",
             "start": "2022-06-09T21:56:51",
             "picture": "162seo0jLUY82kSTZEDj9zwYerODCe",
             "setup": "1"
             })
        self.assertEqual(res.status_code, 403)


    def test_create_event_waiter(self):
        res = self.clientWaiter.post(reverse("apiCreateEvent"), {"idevents": "1",
             "name": "Zurka 1",
             "end": "2022-06-09T21:56:51",
             "description": "aaaa",
             "start": "2022-06-09T21:56:51",
             "picture": "162seo0jLUY82kSTZEDj9zwYerODCe",
             "setup": "1"
             })
        self.assertEqual(res.status_code, 403)


    def test_delete_event_manager(self):
        res = self.clientManager.post(reverse("apiDeleteEvent"), {"idEvent": "1"})
        expected = Events.objects.all()

        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(expected), 0)


    def test_delete_event_user(self):
        res = self.clientUser.post(reverse("apiDeleteEvent"), {"idEvent": "1"})
        self.assertEqual(res.status_code, 403)


    def test_delete_event_waiter(self):
        res = self.clientWaiter.post(reverse("apiDeleteEvent"), {"idEvent": "1"})
        self.assertEqual(res.status_code, 403)