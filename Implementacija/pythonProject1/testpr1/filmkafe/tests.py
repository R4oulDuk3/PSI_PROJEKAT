
from django.test import TestCase,Client
from django.urls import reverse
from .models import *
import json
class TestViewsZapocinjanjeSmene(TestCase):

    def test_apiShift_GET(self):
        mail = "cone@gmail.com"
        usr = Users.objects.create_user(username="cone@gmail.com",
                                        email="cone@gmail.com",
                                        password="cone",
                                        role='Manager',
                                        name='name',
                                        surname='surname',
                                        phone='phone',
                                        salary=0)
        usr = Users.objects.all()
        print(usr)
        client = Client()

        res=client.login(username="cone@gmail.com",password='cone')
        print("RESSSSSS")
        print("Res: "+str(res))
        response = client.get(reverse("apiShift"))

        self.assertEqual(response.status_code,200)