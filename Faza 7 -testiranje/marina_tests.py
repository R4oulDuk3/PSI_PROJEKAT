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

    def test_api_event_for_user(self):
        res = self.clientUser.get(reverse("apiEventsForUser"))
        expected = [OrderedDict(
            [('idevents', 1), ('description', 'aaaa'), ('start', '2022-06-09T21:56:51Z'), ('name', 'Zurka 1'),
             ('end', '2022-06-09T21:56:51Z'), ('picture', '162seo0jLUY82kSTZEDj9zwYerODCe'), ('setup', 1)])]
        self.assertEqual(res.status_code, 200)
        self.assertEqual(expected, res.data)

    def test_apiCreateUser_notExists(self):
        res = Client().post(reverse("apiCreateUser"),
                            {
                                'email': "test@test.com",
                                'password': "123",
                                'name': 'Lmao',
                                'surname': 'Rofl',
                                'phone': '123456'
                            })
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(Users.objects.all()), 5)

    def test_apiCreateUser_exists(self):
        res = Client().post(reverse("apiCreateUser"),
                            {
                                'email': "co@gmail.com",
                                'password': "123",
                                'name': 'Lmao',
                                'surname': 'Rofl',
                                'phone': '123456'
                            })
        self.assertEqual(res.status_code, 200)

        try:
            # Duplicates should be prevented.
            with transaction.atomic():
                self.assertEqual(len(Users.objects.all()), 4)
            self.fail('Duplicate question allowed.')
        except:
            pass

    def test_apiLogIn(self):
        res = Client().post(reverse("apiLogIn"), {'username': "cone@gmail.com",'email': "cone@gmail.com",'password':"cone"})
        self.assertEqual(res.status_code,200)
        self.assertEqual(res.json(),"home.html")
        res = Client().post(reverse("apiLogIn"),
                                   {'username': "con@gmail.com", 'email': "con@gmail.com", 'password': "cone"})
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json(), "ZapocniSmenu.html")
        res = Client().post(reverse("apiLogIn"),
                                   {'username': "co@gmail.com", 'email': "co@gmail.com", 'password': "cone"})
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json(), "inventar")
