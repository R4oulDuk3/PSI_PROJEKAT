import datetime

from django.test import TestCase, Client
from django.urls import reverse
from .models import *
from .serializers import *
import json


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
        self.assertEqual(len(response.json()), 3)

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

