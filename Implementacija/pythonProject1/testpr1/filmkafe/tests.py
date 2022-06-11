import datetime

from django.test import TestCase, Client
from django.urls import reverse
from pytz import UTC

from .models import *
from .serializers import *
import json
import  datetime
from django.contrib.auth.mixins import LoginRequiredMixin

from collections import OrderedDict
class TestViews(TestCase):
    @classmethod
    def setUpTestData(cls):
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
        }, {
            "idmeni": "3",
            "meniproduct": "Redbreast",
            "price": "500.0",
            "amount": "0.5",
            "unit": "l",
            "subtype": "Viski",
            "akcija": "0"
        }, {
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
            {'idproduct': 1, 'name': 'Albino', 'description': 'this is a product', 'type': 'Pivo', 'amount': '50.00',
             'unit': 'l', 'productcode': 98202, 'marketprice': '234.00', 'suppliercode': 973186, 'minamount': '40.00'},

            {'idproduct': 2, 'name': 'Hoptopod', 'description': 'this is a product', 'type': 'Pivo', 'amount': '50.00',
             'unit': 'l', 'productcode': 98202, 'marketprice': '234.00', 'suppliercode': 973186, 'minamount': '60.00'}
        ], many=True)
        if (product.is_valid()):
            product.save()
        shift = ShiftSerializer(data=[{
            "idshift": "1",
            "name": "Smena 1",
            "start": "08:00:00",
            "end": "14:00:00"
        }, {
            "idshift": "2",
            "name": "Smena 2",
            "start": "14:00:00",
            "end": "20:00:00"
        }, {
            "idshift": "3",
            "name": "Smena 3",
            "start": "20:00:00",
            "end": "02:00:00"
        }], many=True
        )
        # print("Shifts valid: " + str(shift.is_valid()))
        if (shift.is_valid()):
            shift.save()
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
        res = SetupTablesSerializer(
            data=[{
                "table": 1,
                "setup": 1
            },
                {
                    "table": 2,
                    "setup": 1
                },
                {
                    "table": 3,
                    "setup": 1
                },
                {
                    "table": 4,
                    "setup": 1
                },

            ],
            many=True
        )
        print("SetupTable valid: " + str(res.is_valid()))
        if (res.is_valid()):
            res.save()

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
        eRes = EventReservationSerializer(data=[
            {"id": "1",
             "event": "1",
             "user": "1",
             "approved": "0",
             "noofseats": "8",
             },
            {"id": "2",
             "event": "1",
             "user": "2",
             "approved": "0",
             "noofseats": "8",
             },
            {"id": "3",
             "event": "1",
             "user": "3",
             "approved": "1",
             "noofseats": "8",
             }

        ], many=True)

        # print("eRes valid: " + str(eRes.is_valid()))
        if eRes.is_valid():
            eRes.save()

        res = CouponSerializer(data={
            "idcupon": "1",
            "description": "",
            "name": "Coup",
            "picture": "...",
            "points": 1000

        })

        if (res.is_valid()):
            res.save()
        res = ScheduleSerializer(
            data=[{
                "waiter": "2",
                "shift": "1",
                "day": datetime.datetime.today(),
                "idschedule": "1",
            },
                {
                    "waiter": "4",
                    "shift": "1",
                    "day": datetime.datetime.today(),
                    "idschedule": "2",
                },
                {
                    "waiter": "4",
                    "shift": "1",
                    "day": "2022-06-08T22:00:00.000Z",
                    "idschedule": "2",
                }
            ], many=True
        )
        # print("Schedule valid: " + str(res.is_valid()))
        if (res.is_valid()):
            res.save()

        ps = ProductSoldSerializer(data=[{
            "product": "1",
            "name": "Pivo",
            "amount": "4",
            "day": datetime.datetime.today()
        }, {
            "product": "2",
            "name": "dzin",
            "amount": "2",
            "day": datetime.datetime.today()
        }, {
            "product": "3",
            "name": "burbon",
            "amount": "5",
            "day": datetime.datetime.today()
        }])
        if (ps.is_valid()):
            ps.save()

        wo = WaiterWorkHoursSerializer(data=[{
            "id": "1",
            "waiter": "1",
            "waiterInfo": "name surname",
            "day": datetime.datetime.today(),
            "hours": "5"
        }])

        if (wo.is_valid()):
            wo.save()

    # svesmene: '[{"day":"2022-06-11T22:00:00.000Z","preferedshift"…11T22:00:00.000Z","preferedshift":3,"waiter":38}]'
    def test_apiSetPreference_POST_user(self):
        response = self.clientUser.post(reverse("apiSetPreference"), {
            'svesmene': '[{"day":"2022-06-11T22:00:00.000Z","preferedshift"…11T22:00:00.000Z","preferedshift":3,"waiter":38}]'})
        self.assertEqual(response.status_code, 403)

    def test_apiSetPreference_POST_Waiter(self):
        response = self.clientWaiter.post(reverse("apiSetPreference"), {
            'svesmene': "[{\"day\":\"2022-06-11T22:00:00.000Z\",\"preferedshift\":1,\"waiter\":38},{\"day\":\"2022-06-11T22:00:00.000Z\",\"preferedshift\":2,\"waiter\":38},{\"day\":\"2022-06-11T22:00:00.000Z\",\"preferedshift\":3,\"waiter\":38}]"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Preferences.objects.all()), 3)

    def test_apiSetPreference_POST_Waiter_noPreferences(self):
        response = self.clientWaiter.post(reverse("apiSetPreference"), {
            'svesmene': "[]"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Preferences.objects.all()), 0)

    def test_apiCustomerExpeneture_POST_User(self):
        response = self.clientUser.post(reverse("apiCustomerExpendature"),
                                        {'idusers': '1', 'expendature': '2000'})
        self.assertEqual(response.status_code, 403)

    def test_apiCustomerExpeneture_POST_Waiter(self):
        response = self.clientWaiter.post(reverse("apiCustomerExpendature"), {'idusers': '1', 'expendature': '2000'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(CustomerExpenditure.objects.all()), 1)
        self.assertEqual(Users.objects.filter(idusers=1)[0].totalexp, 2000)
        self.assertEqual(Users.objects.filter(idusers=1)[0].salary, 2000)

    def test_apiReservationsNA_GET_User(self):
        response = self.clientUser.get(reverse("apiReservationsNA"))
        self.assertEqual(response.status_code, 403)

    def test_apiReservationsNA_GET_Waiter(self):
        response = self.clientWaiter.get(reverse("apiReservationsNA"))
        # print("Response")
        # print(response.json())
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_apiReservationsA_GET_User(self):
        response = self.clientUser.get(reverse("apiReservationsA"))
        self.assertEqual(response.status_code, 403)

    def test_apiReservationsA_GET_Waiter(self):
        response = self.clientWaiter.get(reverse("apiReservationsA"))
        # print("Response")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_apiFreeTables_GET_User(self):
        response = self.clientUser.get(reverse("apiFreeTables"))
        self.assertEqual(response.status_code, 403)

    def test_apiFreeTables_GET_Waiter(self):
        response = self.clientWaiter.get(reverse("apiFreeTables"))
        # print("Response")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(len(response.json()[0]["freeTableIds"]), 2)

    def test_apiApproveReservation_POST_User(self):
        response = self.clientUser.post(reverse("apiApproveReservation"),
                                        {"idusers": "1", "idevents": "1", "tables": "[1,2]"})
        self.assertEqual(response.status_code, 403)

    def test_apiApproveReservation_POST_Waiter(self):
        response = self.clientWaiter.post(reverse("apiApproveReservation"),
                                          {"idusers": 1, "idevents": 1, "tables": "[{\"idtable\":1},{\"idtable\":2}]"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(EventReservations.objects.get(user=1, event=1, ).approved, 1)
        self.assertEqual(len(ReservedTablesNew.objects.all()), 2)

    def test_apiDenyReservation_POST_User(self):
        response = self.clientUser.post(reverse("apiDenyReservation"),
                                        {})
        self.assertEqual(response.status_code, 403)

    def test_apiDenyReservation_POST_Waiter(self):
        response = self.clientWaiter.post(reverse("apiDenyReservation"),
                                          {"idusers": 2, "idevents": 1})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(EventReservations.objects.all()), 2)

    def test_apiBuyCupon_POST_User(self):
        response = self.clientUser.post(reverse("apiBuyCupon"),
                                        {})
        self.assertEqual(response.status_code, 403)

    def test_apiBuyCupon_POST_Waiter(self):
        self.clientWaiter.post(reverse("apiCustomerExpendature"), {'idusers': '1', 'expendature': '2000'})
        response = self.clientWaiter.post(reverse("apiBuyCupon"),
                                          {"idcoupon": 1, "idusers": 1})
        self.assertEqual(response.status_code, 200)
        # print("Buy coupon")
        self.assertEqual(response.json()['idcupon'], 1)
        self.assertEqual(Users.objects.filter(idusers=1)[0].salary, 1000)

    def test_apiBuyCupon_POST_Waiter_notEnoughMoney(self):
        response = self.clientWaiter.post(reverse("apiBuyCupon"),
                                          {"idcoupon": 1, "idusers": 1})
        self.assertEqual(response.status_code, 200)
        # print("Buy coupon")
        self.assertEqual(response.json()['idcupon'], -1)

    def test_apiMyPreference_GET_User(self):
        response = self.clientUser.get(reverse("apiMyPreference"))
        self.assertEqual(response.status_code, 403)

    def test_apiMyPreference_GET_Waiter(self):
        response = self.clientWaiter.post(reverse("apiSetPreference"), {
            'svesmene': "[{\"day\":\"2022-06-11T22:00:00.000Z\",\"preferedshift\":1,\"waiter\":2}]"})
        response = self.clientManager.post(reverse("apiSetPreference"), {
            'svesmene': "[{\"day\":\"2022-06-11T22:00:00.000Z\",\"preferedshift\":1,\"waiter\":3},{\"day\":\"2022-06-11T22:00:00.000Z\",\"preferedshift\":2,\"waiter\":3}]"})

        response = self.clientWaiter.get(reverse("apiMyPreference"))
        self.assertEqual(response.status_code, 200)
        print("MyPrefaaaa")
        print(response.json())
        self.assertEqual(len(response.json()), 1)

    def test_apiMySchedule_GET_User(self):
        response = self.clientUser.get(reverse("apiMySchedule"))
        self.assertEqual(response.status_code, 403)

    def test_apiMySchedule_GET_Waiter(self):
        response = self.clientWaiter.get(reverse("apiMySchedule"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)

    def test_apiPostWaiterWorkHours_POST_User(self):
        response = self.clientUser.post(reverse("apiPostWaiterWorkHours"), {})
        self.assertEqual(response.status_code, 403)

    def test_apiPostWaiterWorkHours_POST_Waiter(self):
        response = self.clientWaiter.post(reverse("apiPostWaiterWorkHours"),
                                          {"day": datetime.datetime.today(), "hours": 8})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(WaiterWorkHours.objects.all()), 1)
        self.assertEqual(WaiterWorkHours.objects.all()[0].hours, 8)

    def test_apiPostWaiterPermit_POST_User(self):
        response = self.clientUser.post(reverse("apiPostWaiterPermit"), {})
        self.assertEqual(response.status_code, 403)

    def test_apiPostWaiterPermit_POST_Waiter(self):
        date = datetime.datetime.today()
        response = self.clientWaiter.post(reverse("apiPostWaiterPermit"), {'day': date})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(WaiterPermit.objects.all()), 1)
        self.assertEqual(WaiterPermit.objects.all()[0].day.replace(tzinfo=None), date)

    def test_apiStartSchedule_POST_User(self):
        response = self.clientUser.post(reverse("apiStartSchedule"), {})
        self.assertEqual(response.status_code, 403)

    def test_apiStartSchedule_POST_Waiter(self):
        date = datetime.datetime.today()
        self.assertEqual(Schedule.objects.get(pk=1).started, None)
        response = self.clientWaiter.post(reverse("apiStartSchedule"), {
            "idschedule": 1,
            "started": date,
            "ended": date
        })
        self.assertEqual(response.status_code, 200)
        self.assertNotEqual(Schedule.objects.get(pk=1).started, None)

    def test_apiReservations_GET(self):
        response = self.clientWaiter.get(reverse("apiReservations"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_apiTables_GET_User(self):
        response = self.clientUser.get(reverse("apiTables"))
        self.assertEqual(response.status_code, 403)

    def test_apiTables_GET_Waiter(self):
        response = self.clientWaiter.get(reverse("apiTables"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 4)

    def test_apiSetup_GET_User(self):
        response = self.clientUser.get(reverse("apiSetup"))
        self.assertEqual(response.status_code, 403)

    def test_apiSetup_GET_Waiter(self):
        response = self.clientWaiter.get(reverse("apiSetup"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(len(response.json()[0]['tables']), 4)

    def test_apiSchedule_GET_User(self):
        response = self.clientUser.get(reverse("apiSchedule"))
        self.assertEqual(response.status_code, 403)

    def test_apiSchedule_GET_Waiter(self):
        response = self.clientWaiter.get(reverse("apiSchedule"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_apiShift_GET_User(self):
        response = self.clientUser.get(reverse("apiShift"))
        self.assertEqual(response.status_code, 403)

    def test_apiShift_GET_Waiter(self):
        response = self.clientWaiter.get(reverse("apiShift"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 3)

    def test_apiMyPreference_GET_User(self):
        response = self.clientUser.get(reverse("apiPreference"))
        self.assertEqual(response.status_code, 403)

    def test_apiPreference_GET_Waiter(self):
        response = self.clientWaiter.post(reverse("apiSetPreference"), {
            'svesmene': "[{\"day\":\"2022-06-11T22:00:00.000Z\",\"preferedshift\":1,\"waiter\":2}]"})
        response = self.clientManager.post(reverse("apiSetPreference"), {
            'svesmene': "[{\"day\":\"2022-06-11T22:00:00.000Z\",\"preferedshift\":1,\"waiter\":3},{\"day\":\"2022-06-11T22:00:00.000Z\",\"preferedshift\":2,\"waiter\":3}]"})

        response = self.clientWaiter.get(reverse("apiPreference"))
        self.assertEqual(response.status_code, 200)
        print(response.json())
        self.assertEqual(len(response.json()), 3)

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
        res = self.clientManager.post(reverse("apiCreateEvent"), {
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

    def test_apiSetup_GET_user(self):
        response = self.clientUser.get(reverse("apiSetup"))
        self.assertEqual(response.status_code, 403)

    def test_apiSetup_GET_manager(self):
        response = self.clientManager.get(reverse("apiSetup"))
        self.assertEqual(response.status_code, 200)

    def test_apiTables_GET_user(self):
        response = self.clientUser.get(reverse("apiTables"))

        self.assertEqual(response.status_code, 403)

    def test_apiTables_GET_manager(self):
        response = self.clientManager.get(reverse("apiTables"))

        self.assertEqual(response.status_code, 200)

    def test_apiCreateTables_POST_user(self):
        response = self.clientUser.post(reverse("apiCreateTables"), {
            'name': 'Separe 5', 'noofseats': '5', 'idsetup': '1'})
        self.assertEqual(response.status_code, 403)

    def test_apiCreateTables_POST_Manager(self):
        response = self.clientManager.post(reverse("apiCreateTables"), {
            'name': 'Separe 5', 'noofseats': '5', 'idsetup': '1'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Table.objects.all()), 5)

    def test_apiDeleteTables_POST_user(self):
        response = self.clientUser.post(reverse("apiDeleteTables"), {
            'idtable': '3'})
        self.assertEqual(response.status_code, 403)

    def test_apiDeleteTables_POST_Manager(self):
        response = self.clientManager.post(reverse("apiDeleteTables"), {
            'idtable': '3'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Table.objects.all()), 4) #

    def test_apiDeleteSetup_POST_user(self):
        response = self.clientUser.post(reverse("apiDeleteSetup"), {
            'idsetup': '2'})
        self.assertEqual(response.status_code, 403)

    def test_apiDeleteSetup_POST_Manager(self):
        response = self.clientManager.post(reverse("apiDeleteSetup"), {
            'idsetup': '2'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Setup.objects.all()), 1)

    def test_apiCreateSetup_POST_user(self):
        response = self.clientUser.post(reverse("apiCreateSetup"), {
            "idsetup": "3", "name": "Postavka3"})
        self.assertEqual(response.status_code, 403)

    def test_apiCreateSetup_POST_Manager(self):
        response = self.clientManager.post(reverse("apiCreateSetup"), {
            "idsetup": "3", "name": "Postavka3"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Setup.objects.all()), 2)

    def test_apiWaiters_GET_user(self):
        response = self.clientUser.get(reverse("apiWaiters"))
        self.assertEqual(response.status_code, 403)

    def test_apiWaiters_GET_manager(self):
        response = self.clientManager.get(reverse("apiWaiters"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_apiCreateWaiter_POST_user(self):
        response = self.clientUser.post(reverse("apiCreateWaiters"), {
            "email": "pear@mail.rs", "password": "Pass123", "phone": "02311132"})
        self.assertEqual(response.status_code, 403)

    def test_apiCreateWaiter_POST_Manager(self):
        response = self.clientManager.post(reverse("apiCreateWaiters"), {
            "email": "pear@mail.rs", "password": "Pass123", "telefon": "02311132"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Users.objects.all()), 4)

    def test_apiDeleteWaiter_POST_user(self):
        response = self.clientUser.post(reverse("apiDeleteWaiters"), {
            "idusers": "4"})
        self.assertEqual(response.status_code, 403)

    def test_apiDeleteWaiter_POST_Manager(self):
        response = self.clientManager.post(reverse("apiDeleteWaiters"), {
            "idusers": "4"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Users.objects.all()), 3)

    def test_apiChangeSchedule_POST_user(self):
        response = self.clientUser.post(reverse("apiChangeSchedule"), {
            "startDate": datetime.datetime.today(), "endDate": "2022-06-13T22:00:00.000Z", "raspored": "[]"})
        self.assertEqual(response.status_code, 403)

    def test_apiChangeSchedule_POST_Manager(self):
        response = self.clientManager.post(reverse("apiChangeSchedule"), {
            "startDate": datetime.datetime.today(), "endDate": "2022-06-13T22:00:00.000Z", "raspored": "[]"})
        self.assertEqual(response.status_code, 200)

    def test_apiChangeShift_POST_user(self):
        response = self.clientUser.post(reverse("apiChangeShift"), {
            "smeneInfo": "[{\"idshift\":\"1\",\"name\":\"shift 1\",\"start\":\"22:00\",\"end\":\"22:00\"}]"})
        self.assertEqual(response.status_code, 403)

    def test_apiChangeShift_POST_Manager(self):
        response = self.clientManager.post(reverse("apiChangeShift"), {
            "smeneInfo": "[{\"idshift\":\"1\",\"name\":\"shift 1\",\"start\":\"22:00\",\"end\":\"22:00\"}]"})
        self.assertEqual(response.status_code, 200)

    def test_apiGetProductSold_POST_user(self):
        response = self.clientUser.post(reverse("apiGetProductSold"), {
            "start": datetime.datetime.today(), "end": "2022-06-13T22:00:00.000Z"})
        self.assertEqual(response.status_code, 403)

    def test_apiGetProductSold_POST_Manager(self):
        response = self.clientManager.post(reverse("apiGetProductSold"), {
            "start": datetime.datetime.today(), "end": "2022-06-13T22:00:00.000Z"})
        self.assertEqual(response.status_code, 200)

    def test_apiGetWaiterWorkHours_POST_user(self):
        response = self.clientUser.post(reverse("apiGetWaiterWorkHours"), {
            "start": datetime.datetime.today(), "end": "2022-06-13T22:00:00.000Z"})
        self.assertEqual(response.status_code, 403)

    def test_apiGetWaiterWorkHours_POST_Manager(self):
        response = self.clientManager.post(reverse("apiGetWaiterWorkHours"), {
            "start": datetime.datetime.today(), "end": "2022-06-13T22:00:00.000Z"})
        self.assertEqual(response.status_code, 200)

    def test_api_event_reservation(self):
        res = self.clientUser.get(reverse("apiEventReservations"))
        expected = [OrderedDict(
            [('id', 1), ('approved', 0), ('noofseats', 8), ('event', 1), ('user', 1), ('idevents', 1),
             ('start', datetime.datetime(2022, 6, 9, 21, 56, 51, tzinfo=UTC)),
             ('end', datetime.datetime(2022, 6, 9, 21, 56, 51, tzinfo=UTC)), ('description', 'aaaa'),
             ('picture', '162seo0jLUY82kSTZEDj9zwYerODCe'), ('name', 'Zurka 1')])]

        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data, expected)

    def test_api_reserve(self):
        res = self.clientUser.post(reverse("apiDeleteReserve"), {"event": "1"})
        res = self.clientUser.post(reverse("apiReserve"), {"id": "1"})
        expected = EventReservations.objects.filter(user=1)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(expected), 1)

    def test_api_delete_reserve(self):
        res = self.clientUser.post(reverse("apiDeleteReserve"), {"event": "1"})
        expected = EventReservations.objects.filter(user=1)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(expected), 0)





