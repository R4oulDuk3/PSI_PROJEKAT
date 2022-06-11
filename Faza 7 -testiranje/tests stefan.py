from django.test import TestCase,Client
from django.urls import reverse
import  datetime
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import *
from .serializers import *
import json

class TableViewTest(TestCase):
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
        setup2 = SetupSerializer(data={"idsetup": "2", "name": "Postavka2"})
        # print("Setup " + str(setup.is_valid()))
        if setup.is_valid():
            setup.save()
        if setup2.is_valid():
            setup2.save()
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
        if (res.is_valid()):
            res.save()


        ps = ProductSoldSerializer(data = [{
            "product":"1",
            "name":"Pivo",
            "amount":"4",
            "day":datetime.datetime.today()
        },{
            "product":"2",
            "name":"dzin",
            "amount":"2",
            "day":datetime.datetime.today()
        },{
            "product":"3",
            "name":"burbon",
            "amount":"5",
            "day":datetime.datetime.today()
        }])
        if (ps.is_valid()):
            ps.save()


        wo = WaiterWorkHoursSerializer(data = [{
            "id" : "1",
            "waiter":"1",
            "waiterInfo":"name surname",
            "day": datetime.datetime.today(),
            "hours":"5"
        }])

        if(wo.is_valid()):
            wo.save()

    def test_apiSetup_GET_user(self):
        response = self.clientUser.get(reverse("apiSetup"))
        self.assertEqual(response.status_code,403)

    def test_apiSetup_GET_manager(self):
        response = self.clientManager.get(reverse("apiSetup"))
        self.assertEqual(response.status_code, 200)

    def test_apiTables_GET_user(self):
        response = self.clientUser.get(reverse("apiTables"))

        self.assertEqual(response.status_code,403)

    def test_apiTables_GET_manager(self):
        response = self.clientManager.get(reverse("apiTables"))

        self.assertEqual(response.status_code, 200)

    def test_apiCreateTables_POST_user(self):
        response = self.clientUser.post(reverse("apiCreateTables"), {
            'name': 'Separe 5','noofseats':'5','idsetup':'1' })
        self.assertEqual(response.status_code, 403)

    def test_apiCreateTables_POST_Manager(self):
        response = self.clientManager.post(reverse("apiCreateTables"), {
            'name': 'Separe 5','noofseats':'5','idsetup':'1' })
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
        self.assertEqual(len(Table.objects.all()), 3)


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
        response = self.clientUser.post(reverse("apiCreateSetup"),{
            "idsetup": "3", "name": "Postavka3"})
        self.assertEqual(response.status_code, 403)

    def test_apiCreateSetup_POST_Manager(self):
        response = self.clientManager.post(reverse("apiCreateSetup"), {
            "idsetup": "3", "name": "Postavka3"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(Setup.objects.all()), 3)

    def test_apiWaiters_GET_user(self):
        response = self.clientUser.get(reverse("apiWaiters"))
        self.assertEqual(response.status_code,403)

    def test_apiWaiters_GET_manager(self):
        response = self.clientManager.get(reverse("apiWaiters"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_apiCreateWaiter_POST_user(self):
        response = self.clientUser.post(reverse("apiCreateWaiters"), {
            "email": "pear@mail.rs", "password": "Pass123","phone":"02311132"})
        self.assertEqual(response.status_code, 403)

    def test_apiCreateWaiter_POST_Manager(self):
        response = self.clientManager.post(reverse("apiCreateWaiters"), {
            "email": "pear@mail.rs", "password": "Pass123","telefon":"02311132"})
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
        "startDate": datetime.datetime.today(),"endDate":"2022-06-13T22:00:00.000Z","raspored":"[]"})
        self.assertEqual(response.status_code, 403)

    def test_apiChangeSchedule_POST_Manager(self):
        response = self.clientManager.post(reverse("apiChangeSchedule"), {
        "startDate": datetime.datetime.today(),"endDate":"2022-06-13T22:00:00.000Z","raspored":"[]"})
        self.assertEqual(response.status_code, 200)

    def test_apiChangeShift_POST_user(self):
        response = self.clientUser.post(reverse("apiChangeShift"), {
            "smeneInfo":"[{\"idshift\":\"1\",\"name\":\"shift 1\",\"start\":\"22:00\",\"end\":\"22:00\"}]"})
        self.assertEqual(response.status_code, 403)

    def test_apiChangeShift_POST_Manager(self):
        response = self.clientManager.post(reverse("apiChangeShift"),{
            "smeneInfo":"[{\"idshift\":\"1\",\"name\":\"shift 1\",\"start\":\"22:00\",\"end\":\"22:00\"}]"})
        self.assertEqual(response.status_code, 200)

    def test_apiGetProductSold_POST_user(self):
        response = self.clientUser.post(reverse("apiGetProductSold"), {
            "start": datetime.datetime.today(),"end":"2022-06-13T22:00:00.000Z"})
        self.assertEqual(response.status_code, 403)

    def test_apiGetProductSold_POST_Manager(self):
        response = self.clientManager.post(reverse("apiGetProductSold"), {
            "start": datetime.datetime.today(),"end":"2022-06-13T22:00:00.000Z"})
        self.assertEqual(response.status_code, 200)

    def test_apiGetWaiterWorkHours_POST_user(self):
        response = self.clientUser.post(reverse("apiGetWaiterWorkHours"), {
            "start": datetime.datetime.today(),"end":"2022-06-13T22:00:00.000Z"})
        self.assertEqual(response.status_code, 403)

    def test_apiGetWaiterWorkHours_POST_Manager(self):
        response = self.clientManager.post(reverse("apiGetWaiterWorkHours"), {
            "start": datetime.datetime.today(),"end":"2022-06-13T22:00:00.000Z"})
        self.assertEqual(response.status_code, 200)