import json

import datetime
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db.models import F
from django.http import HttpResponse, HttpResponseRedirect
from django.http import JsonResponse
from django.utils.datetime_safe import date
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render, redirect
from django.template import loader
from .models import Meni, Product, Coupon, Events, Users, Shift, Schedule, Setup, Table, SetupTables, \
    Preference, Preferences, FreeTables, EventReservations, ReservedTables, ReservedTablesNew, CustomerExpenditure, \
    ProductSold, WaiterPermit, WaiterWorkHours
from .serializers import MeniSerializer, ProductSerializer, CouponSerializer, EventsSerializer, \
    EventReservationSerializer, UsersSerializer, ShiftSerializer, ScheduleSerializer, MeniInsertSerializer, \
    TableSerializer, SetupSerializer, SetupCreateSerializer, TableCreateSerializer, SetupTablesSerializer, \
    PreferenceSerializer, CustomerExpenditureSerializer, EndUsersSerializer, ReservedTablesSerializer, \
    ProductSoldSerializer, WaiterWorkHoursSerializer, WaiterPermitSerializer
from django.utils import timezone


def hasPermit(user_id):
    print("Date: " + str(datetime.datetime.today()))
    return len(WaiterPermit.objects.filter(waiter=user_id).filter(day__gt=datetime.datetime.today())) > 0


def index(request):
    return HttpResponse("hello world")


def home(request):
    puff = ""
    if request.user.is_authenticated:
        temp = loader.get_template('filmkafe/stefan/Client.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


# Create your views here.


def meniUser(request):
    puff = ""
    if request.user.is_authenticated:
        temp = loader.get_template('filmkafe/stefan/meni.html')
    else:
        temp = loader.get_template('filmkafe/stefan/meniLO.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def ClientUser(request):
    puff = ""
    if request.user.is_authenticated:
        temp = loader.get_template('filmkafe/stefan/Client.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def dogadjajiUser(request):
    puff = ""
    temp = loader.get_template('filmkafe/stefan/dogadjaji.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def kuponiUser(request):
    puff = ""
    temp = loader.get_template('filmkafe/stefan/kuponi.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def loginUser(request):
    puff = ""
    temp = loader.get_template('filmkafe/stefan/login.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def regUser(request):
    puff = ""
    temp = loader.get_template('filmkafe/stefan/reg.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def inventar(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Manager':
            temp = loader.get_template('filmkafe/inventar.html')
        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def meni(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Manager':
            temp = loader.get_template('filmkafe/meni.html')
        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def dogadjajiRezervacije(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Manager':
            temp = loader.get_template('filmkafe/DogadjajiRezervacije.html')
        elif request.user.role == 'Waiter':
            if (hasPermit(request.user.idusers)):
                temp = loader.get_template('filmkafe/DogadjajiRezervacije.html')
            else:
                temp = loader.get_template('filmkafe/ZapocniSmenu.html')

        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def dogadjaji(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Manager':
            temp = loader.get_template('filmkafe/dogadjaji.html')
        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def korisnici(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Manager':
            temp = loader.get_template('filmkafe/konobari.html')
        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def stolovi(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Manager':
            temp = loader.get_template('filmkafe/stolovi.html')
        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def kuponi(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Manager':
            temp = loader.get_template('filmkafe/kuponi.html')
        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def izvestaj(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Manager':
            temp = loader.get_template('filmkafe/izvestaji.html')
        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def rasporedi(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Manager':
            temp = loader.get_template('filmkafe/rasporedi.html')
        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def rasporedi_konobar(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Waiter':
            temp = loader.get_template('filmkafe/rasporedi-konobar.html')
        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def newSchedule(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Manager':
            temp = loader.get_template('filmkafe/novi-raspored.html')
        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def Smene(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Manager':
            temp = loader.get_template('filmkafe/Smene.html')
        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def biranjeSmene(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Waiter':
            temp = loader.get_template('filmkafe/BiranjeSmene.html')
        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def skeniranjeQRKoda(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Waiter':
            if (hasPermit(request.user.idusers)):
                temp = loader.get_template('filmkafe/SkeniranjeQR.html')
            else:
                temp = loader.get_template('filmkafe/ZapocniSmenu.html')
        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def popis(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Waiter':
            if (hasPermit(request.user.idusers)):
                temp = loader.get_template('filmkafe/Popis.html')
            else:
                temp = loader.get_template('filmkafe/ZapocniSmenu.html')
        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


def zapocniSmenu(request):
    puff = ""
    if request.user.is_authenticated:
        if request.user.role == 'Waiter':
            temp = loader.get_template('filmkafe/ZapocniSmenu.html')
        else:
            temp = loader.get_template('filmkafe/stefan/home.html')
    else:
        temp = loader.get_template('filmkafe/stefan/home.html')
    context = {'puf': puff}
    return HttpResponse(temp.render(context, request))


@api_view(['GET'])
def apiMeni(request):
    res = []
    types = Meni.objects.order_by().values('subtype').distinct()
    for each in types:
        meni = {}
        m = Meni.objects.filter(subtype=each['subtype'])
        meni['naziv'] = str(each['subtype'])
        meni['stavke'] = (MeniSerializer(m, many=True)).data
        res.append(meni)
    return Response(res)


@login_required
@api_view(['GET'])
def apiProduct(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        p = Product.objects.filter(amount__gt=F('minamount'))
        res = ProductSerializer(p, many=True)
        return Response(res.data)
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiProductAll(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        p = Product.objects.all()
        res = ProductSerializer(p, many=True)
        return Response(res.data)
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiDeficientProduct(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        p = Product.objects.filter(minamount__gte=F('amount'))
        res = ProductSerializer(p, many=True)
        return Response(res.data)
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiCoupon(request):
    c = Coupon.objects.all()
    res = CouponSerializer(c, many=True)
    return Response(res.data)


@api_view(['GET'])
def apiEvents(request):
    e = Events.objects.all()
    print(e)
    res = EventsSerializer(e, many=True)
    return Response(res.data)


@login_required
@api_view(['GET'])
def apiReservations(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        e = EventReservations.objects.all()
        res = EventReservationSerializer(e, many=True)
        return Response(res.data)
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiEventReservations(request):
    events = []
    ev = EventReservations.objects.filter(user=request.user.idusers)
    res = EventReservationSerializer(ev, many=True)
    if (res):
        res = res.data
        for each in res:
            event = Events.objects.filter(idevents=each['event']).values_list('start', 'end', 'description', 'picture',
                                                                              'name')
            event = event[0]
            print(event)
            each['idevents'] = each['event']
            each['start'] = event[0]
            each['end'] = event[1]
            each['description'] = event[2]
            each['picture'] = event[3]
            each['name'] = event[4]
        print(res)
    return Response(res)


@login_required
@api_view(['GET'])
def apiEventsForUser(request):
    e = EventReservations.objects.filter(user=1).values('event')
    print(e)
    events = list()
    for each in e:
        events.append(Events.objects.filter(idevents=each['event'])[0])
    print(events)
    res = EventsSerializer(events, many=True)
    return Response(res.data)


@login_required
@api_view(['POST'])
def apiSetProduct(request):
    print(request.user.role)
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        p = request.data.copy()
        newProd = Product.objects.filter(idproduct=int(p['idproduct']))
        p['unit'] = 'l'
        p['description'] = ''
        p['Type'] = 'test'
        print(newProd)
        if (newProd):
            res = ProductSerializer(instance=newProd[0], data=p)
        else:
            res = ProductSerializer(data=p)
        print(res)
        print(res.is_valid())
        if res.is_valid():
            print("here")
            res.save()
            return Response("Success")
        print(res.errors)
        return Response("Faliure")
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiUpdateProduct(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        p = request.data.copy()
        p = p['popis']
        p = json.loads(p)
        for each in p:
            print(each)
            productSold = {"product": each['idproduct'], "amount": each['potrosenaKolicina'],
                           "day": datetime.datetime.today(), "name": each['name']}

            if productSold["amount"] != '0':
                res = ProductSoldSerializer(data=productSold)
                print("Res valid " + str(res.is_valid()))
                if res.is_valid():
                    res.save()

            amt = Product.objects.filter(idproduct=int(each['idproduct'])).values('amount')
            print(amt[0]['amount'])
            amt = amt[0]['amount']
            amt = int(amt) - int(each['potrosenaKolicina'])
            prd = Product.objects.filter(idproduct=int(each['idproduct'])).update(amount=amt)
            print(prd)

        return Response("Success")
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiProductPurchase(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        p = request.data.copy()
        p = p['purchase']
        p = json.loads(p)
        for each in p:
            print(each)

            amt = Product.objects.filter(name=each['name']).values('amount')
            if len(amt) == 0:
                continue
            amt = amt[0]['amount']
            amt = int(amt) + int(each['amount'])
            prd = Product.objects.filter(name=each['name']).update(amount=amt)
            print(prd)

        return Response("Success")
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiDeleteProduct(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        prd = Product.objects.filter(idproduct=request.data['idproduct']).delete()
        return Response("Success")
    return Response(status=403)


@api_view(['POST'])
def apiCreateUser(request):
    try:
        dat = request.data
        mail = dat['email']
        password = dat['password']
        print(dat)
        usr = Users.objects.create_user(mail, mail, password, role='User', name=dat['name'], surname=dat['surname'],
                                        phone=dat['phone'], salary=0)
        # errcode = usr.save(usr)
        # print(errcode)
        return Response("Success")
    except Exception as e:
        print(e)
        return Response(str(e))


@login_required
@api_view(['POST'])
def apiCreateWaiter(request):
    if (request.user.role == 'Manager'):
        '''if request.user.is_authenticated():
            if request.user.role=='Manager':
                dat = request.data
                mail = dat['email']
                password = dat['password']
                usr = Users.objects.create_user(mail, mail, password, role='Waiter')
                errcode = usr.save(usr)'''

        try:
            dat = request.data.copy()
            mail = dat['email']
            password = dat['password']
            dat['username'] = dat['email']
            dat['role'] = 'Waiter'
            dat['phone'] = dat['telefon']
            print(dat)
            '''usr = UsersSerializer(data=dat)
            if usr.is_valid():
                usr.save
            print(usr.errors)'''
            usr = Users.objects.create_user(mail, mail, password, role='Waiter', name=dat['name'],
                                            surname=dat['surname'], phone=dat['telefon'], imagepath=dat['imagepath'])
            errcode = usr.save(usr)
        finally:
            return Response("Success")
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiCreateManager(request):
    usr = Users.objects.create_user('manager@mail.rs', 'manager@mail.rs', 'managerpass.123', role='Manager',
                                    name="Gavrilo", surname="Vojteski", phone="+3814464846")
    errcode = usr.save(usr)
    return Response(errcode)


@api_view(['POST'])
def apiLogIn(request):
    dat = request.data
    mail = dat['email']
    password = dat['password']
    usr = authenticate(request, username=mail, password=password)
    print(usr)
    if usr is not None:
        login(request, usr)
        print("No")
        if usr.role == 'User':
            return Response('home.html')
        if usr.role == 'Waiter':
            return Response('ZapocniSmenu.html')
        if usr.role == 'Manager':
            return Response('inventar')
    else:
        return Response("login.html")


@login_required
@api_view(['GET'])
def apiGetRole(request):
    if request.user.role == 'User':
        return Response('user')
    if request.user.role == 'Waiter':
        return Response('konobar')
    if request.user.role == 'Manager':
        return Response('admin')


@login_required
@api_view(['GET'])
def apiGetId(request):
    if request.user.role == 'User':
        return Response('-1')
    else:
        return Response(request.user.idusers)


@login_required
@api_view(['GET'])
def apiOutUser(request):
    logout(request)

    print(request.user.is_authenticated)
    return Response("home.html")


@login_required
@api_view(['POST'])
def apiCreateEvent(request):
    if (request.user.role == 'Manager'):
        ind = Events.objects.all().values('idevents')
        if (len(ind) > 0):
            ind = int(ind[len(ind) - 1]['idevents']) + 1
        else:
            ind = 1
        p = request.data.copy()
        p['idevents'] = ind
        p['end'] = p['start']
        # p['setup']=int(p['setup'])
        res = EventsSerializer(data=p)

        if (res.is_valid()):
            res.save()
        idevents = res.data["idevents"]
        tabs = SetupTables.objects.filter(setup=p['setup']).values('table')
        # print(tabs)
        for each in tabs:
            FreeTables.objects.create(table=Table.objects.get(idtable=each['table']),
                                      event=Events.objects.get(idevents=idevents))
        print(res.errors)
        return Response(res.data)
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiCreateCoupon(request):
    if (request.user.role == 'Manager'):
        print(request.data)
        ind = Coupon.objects.all().values('idcupon')
        ind = ind[len(ind) - 1]
        ind = ind['idcupon'] + 1
        p = request.data.copy()
        p['idcupon'] = ind
        res = CouponSerializer(data=p)
        if (res.is_valid()):
            res.save()
        return Response(res.data)
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiDeleteEvent(request):
    if (request.user.role == 'Manager'):
        id = request.data['idEvent']
        event = Events.objects.filter(idevents=id).delete()
        return Response()
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiDeleteCoupon(request):
    if (request.user.role == 'Manager'):
        id = request.data['idcupon']
        event = Coupon.objects.filter(idcupon=id).delete()
        return Response()
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiWaiters(request):
    if (request.user.role == 'Manager' or request.user.role == 'Waiter'):
        e = Users.objects.filter(role='Waiter')
        res = UsersSerializer(e, many=True)
        return Response(res.data)
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiDeleteWaiters(request):
    if (request.user.role == 'Manager'):
        print(request.data)
        e = Users.objects.filter(idusers=request.data['idusers']).delete()
        return Response("success")
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiMeniAdd(request):
    if (request.user.role == 'Manager'):
        Meni.objects.all().delete()
        i = 1
        data = request.data.copy()
        data = json.loads(data['kukuruz'])
        for each in data:
            print(each['naziv'])
            print("\n")
            for line in each["stavke"]:
                line['subtype'] = each['naziv']
                line['idmeni'] = str(i)
                i += 1
                line['amount'] = 0
                new = MeniInsertSerializer(data=line)
                if (new.is_valid()):
                    new.save()
                print(new.errors)
        return Response("Success")
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiShift(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        sm = Shift.objects.all()
        smene = ShiftSerializer(sm, many=True)
        print(smene.data)
        return Response(smene.data)
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiCWShift(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        sm = Shift.objects.filter(waiter=request.user.idusers)
        smene = ShiftSerializer(sm, many=True)
        print(smene.data)
        return Response(smene.data)
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiChangeShift(request):
    if (request.user.role == 'Manager'):
        data = json.loads(request.data.copy()['smeneInfo'])
        i = 0
        if (len(data) != len(Shift.objects.all())):
            Schedule.objects.filter(day__gt=datetime.datetime.today()).delete()
            Preferences.objects.all().delete()
        for each in data:
            sh = Shift.objects.filter(idshift=each['idshift'])
            if (len(sh) > 0):
                sh.update(start=each['start'])
                sh.update(end=each['end'])
                i += 1
            else:
                i += 1
                each['name'] = 'shift' + str(i)
                shift = ShiftSerializer(data=each)
                if (shift.is_valid()):
                    shift.save()
                print(shift.errors)
        print(len(data))
        print(len(Shift.objects.all()))

        shifts = Shift.objects.filter(idshift__gt=i).delete()
        return Response('yes')
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiSchedule(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        # print(datetime.datetime.today())
        date = datetime.datetime.today() - datetime.timedelta(days=2)
        print("HELLO")
        print(str(date))
        print("HELLO")
        sm = Schedule.objects.filter(day__gte=date)
        smene = ScheduleSerializer(sm, many=True)
        print(smene.data)
        return Response(smene.data)
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiMySchedule(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        print(datetime.datetime.today())
        date = datetime.datetime.today() - datetime.timedelta(days=2)
        sm = Schedule.objects.filter(day__gte=date).filter(waiter=request.user.idusers)
        smene = ScheduleSerializer(sm, many=True)
        return Response(smene.data)
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiChangeSchedule(request):
    if (request.user.role == 'Manager'):
        dat = request.data.copy()
        print(dat['startDate'])
        sm = Schedule.objects.filter(day__gte=dat['startDate'], day__lte=dat['endDate']).delete()
        for each in json.loads(dat['raspored']):
            new = ScheduleSerializer(data=each)
            if (new.is_valid()):
                new.save()
            print(new.errors)
        return Response("sadness")
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiSetup(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        st = Setup.objects.all()
        set = SetupSerializer(st, many=True)
        sets = set.data
        print(sets)
        for each in sets:
            tables = []
            tableids = SetupTables.objects.filter(setup=each['idsetup']).values('table')
            for every in tableids:
                table = Table.objects.filter(idtable=every['table'])
                tables.append(TableSerializer(table[0]).data)
            each['tables'] = tables
        print(sets)

        return Response(sets)
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiTables(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        sp = Table.objects.all()
        smene = TableSerializer(sp, many=True)
        return Response(smene.data)
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiCreateTables(request):
    if (request.user.role == 'Manager'):
        rq = request.data.copy()
        stp = rq['idsetup']
        newconn = {}
        newconn['setup'] = stp
        new = {}
        new['name'] = rq['name']
        new['noofseats'] = rq['noofseats']
        new = TableCreateSerializer(data=new)
        if (new.is_valid()):
            new.save()
            tb = Table.objects.all().values('idtable')
            tb = tb[len(tb) - 1]
            newconn['table'] = tb['idtable']
            print(newconn)
            newconn = SetupTablesSerializer(data=newconn)
            if (newconn.is_valid()):
                newconn.save()
            print("stop1\n")
            print(newconn.errors)
            return Response("success")
        print("stop2\n")
        print(new.errors)
        return Response("failed")
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiCreateSetup(request):
    if (request.user.role == 'Manager'):
        rq = request.data.copy()
        new = SetupCreateSerializer(data=rq)
        print(rq)
        if (new.is_valid()):
            new.save()
            return Response("success")
        return Response("failed")
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiDeleteSetup(request):
    if (request.user.role == 'Manager'):
        try:
            e = Setup.objects.filter(idsetup=request.data['idsetup']).delete()
            return Response("success")
        except:
            return Response("failure")
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiDeleteTables(request):
    if (request.user.role == 'Manager'):
        setupTable = SetupTables.objects.filter(table=Table.objects.get(pk=request.data['idtable']))
        print(setupTable)
        events = Events.objects.filter(setup=setupTable[0].setup)
        if len(events)>0:
            return Response("failure")
        e = Table.objects.filter(idtable=request.data['idtable']).delete()
        return Response("Success")
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiPreference(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        e = Preferences.objects.all()
        res = PreferenceSerializer(e, many=True)
        return Response(res.data)
    return Response(status=403)


@api_view(['GET'])
def apiMyPreference(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        e = Preferences.objects.filter(waiter=request.user.idusers)
        res = PreferenceSerializer(e, many=True)
        return Response(res.data)
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiSetPreference(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        dat = request.data.copy()
        print(dat)
        Preferences.objects.filter(waiter=request.user.idusers).delete()
        shifts = json.loads(dat['svesmene'])
        if (request.user.is_authenticated):
            for each in shifts:
                print("auth")
                usr = Users.objects.filter(email=request.user).values('idusers')
                each['day'] = each['day']
                each['waiter'] = usr[0]['idusers']
                print(each)
                ser = PreferenceSerializer(data=each)
                if (ser.is_valid()):
                    ser.save()
                print(ser.errors)
        return Response("")
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiCustomerExpeneture(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        dat = request.data.copy()
        print(dat)
        curr = Users.objects.filter(idusers=dat['idusers']).values('salary')
        user = Users.objects.filter(idusers=dat['idusers'])
        exp = Users.objects.filter(idusers=dat['idusers']).values('totalexp')
        print(curr)
        curr = curr[0]['salary'] + int(dat['expendature'])
        exp = exp[0]['totalexp'] + int(dat['expendature'])
        print(curr)
        print(exp)
        c = Users.objects.filter(idusers=dat['idusers']).update(salary=curr)
        c = Users.objects.filter(idusers=dat['idusers']).update(totalexp=exp)
        print(datetime.datetime.today())
        dat['day'] = datetime.datetime.today()
        dat['customer'] = dat['idusers']
        dat['amount'] = dat['expendature']
        print(user)
        dat['userInfo'] = user[0].name + " " + user[0].surname
        e = CustomerExpenditureSerializer(data=dat)
        print("Serializer valid " + str(e.is_valid()))
        if (e.is_valid()):
            e.save()
        print(e.errors)
        return Response('res.data')
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiGetCustomerExpeneture(request):
    if (request.user.role == 'Manager'):
        data = request.data.copy()
        print(data)
        expendatures = CustomerExpenditure.objects.filter(day__gte=data['start']).filter(day__lte=data['end'])
        res = CustomerExpenditureSerializer(expendatures, many=True)
        return Response(res.data)
    else:
        return Response(status=403)


@login_required
@api_view(['POST'])
def apiGetProductSold(request):
    if (request.user.role == 'Manager'):
        data = request.data.copy()
        print(data)
        prodSold = ProductSold.objects.filter(day__gte=data['start']).filter(day__lte=data['end'])
        res = ProductSoldSerializer(prodSold, many=True)
        return Response(res.data)
    else:
        return Response(status=403)


@login_required
@api_view(['GET'])
def apiReservationsNA(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        res = EventReservations.objects.filter(approved=0)
        reservations = EventReservationSerializer(res, many=True)
        reservations = reservations.data
        print(reservations)
        for each in reservations:
            print(each)
            credentials = Users.objects.filter(idusers=each['user']).values_list('name', 'surname', 'totalexp')
            credentials = credentials[0]
            print(credentials)
            each['name'] = credentials[0]
            each['surname'] = credentials[1]
            each['ukupnaPotrosnja'] = credentials[2]
            each['eventid'] = each['event']
            each['idusers'] = each['user']
        return Response(reservations)
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiReservationsA(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        res = EventReservations.objects.filter(approved=1)
        reservations = EventReservationSerializer(res, many=True)
        reservations = reservations.data
        for each in reservations:
            credentials = Users.objects.filter(idusers=each['user']).values_list('name', 'surname', 'totalexp')
            credentials = credentials[0]
            each['name'] = credentials[0]
            each['surname'] = credentials[1]
            each['ukupnaPotrosnja'] = credentials[2]
            each['eventid'] = each['event']
            each['idusers'] = each['user']
            rt = ReservedTablesNew.objects.filter(reservation=each['id'])
            each['tableIds'] = ReservedTablesSerializer(rt, many=True).data
        return Response(reservations)
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiFreeTables(request):
    if request.user.role == 'Waiter' or request.user.role == 'Manager':
        events = Events.objects.all()
        ev = EventsSerializer(events, many=True)
        ev = ev.data
        for each in ev:
            allTab = FreeTables.objects.filter(event=each['idevents']).values('table')
            tables = []
            for tab in allTab:
                tables.append(tab['table'])
            each['freeTableIds'] = tables
        return Response(ev)
    return Response(status=403)


@api_view(['GET'])
def apiCheckLogInUser(request):
    if (request.user.is_authenticated):
        dat = EndUsersSerializer(request.user)
        return Response(dat.data)
    else:
        return Response({'idusers': -1})


@login_required
@api_view(['POST'])
def apiStart(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        print(request.data)
        if (request.user.is_authenticated):
            time_change = datetime.timedelta(hours=24)
            before = datetime.datetime.today() - time_change
            after = datetime.datetime.today() + time_change
            sch = Schedule.objects.filter(waiter=request.user.idusers, shift=request.data['idShift'], day__gt=before,
                                          day__lt=after)
            print(sch)
            sch = Schedule.objects.filter(waiter=request.user.idusers, shift=request.data['idShift'], day__gt=before,
                                          day__lt=after).update(started=datetime.datetime.now())
            print(before)
        return Response("Success")
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiStartSchedule(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        data = request.data.copy()
        print(data)
        schedule = Schedule.objects.filter(idschedule=data["idschedule"])[0]
        schedule.started = data["started"]
        schedule.ended = data["ended"]
        schedule.save()
        return Response("Success")
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiEnd(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        if (request.user.is_authenticated):
            time_change = datetime.timedelta(hours=24)
            before = datetime.datetime.today() - time_change
            after = datetime.datetime.today() + time_change
            sch = Schedule.objects.filter(waiter=request.user.idusers, shift=request.data['idShift'], day__gt=before,
                                          day__lt=after).update(ended=datetime.datetime.now())
            print(request.user.idusers)
        return Response("Success")
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiReserve(request):
    if request.user.is_authenticated:
        dat = request.data.copy()
        dat['approved'] = 0
        dat['user'] = request.user.idusers
        dat['event'] = dat['id']
        new = EventReservationSerializer(data=dat)
        if new.is_valid():
            new.save()
        print(new.errors)
    return Response("Success")


@login_required
@api_view(['POST'])
def apiPostWaiterWorkHours(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        data = request.data.copy()
        waiterHours = {}
        waiterHours["day"] = data['day']
        waiterHours["hours"] = data['hours']
        waiterHours['waiter'] = request.user.idusers
        waiterHours['waiterInfo'] = request.user.name + " " + request.user.surname
        res = WaiterWorkHoursSerializer(data=waiterHours)
        print("VALID: " + str(res.is_valid()))
        if res.is_valid():
            res.save()
        return Response("")
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiGetWaiterWorkHours(request):
    if (request.user.role == 'Manager'):
        data = request.data.copy()
        print(data)
        objects = WaiterWorkHours.objects.filter(day__gte=data['start']).filter(day__lte=data['end'])
        res = WaiterWorkHoursSerializer(objects, many=True)
        return Response(res.data)
    else:
        return Response(status=403)


@login_required
@api_view(['POST'])
def apiPostWaiterPermit(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        data = request.data.copy()
        waiterPermit = {}
        waiterPermit["day"] = data['day']
        waiterPermit['waiter'] = request.user.idusers
        res = WaiterPermitSerializer(data=waiterPermit)
        print("VALID: " + str(res.is_valid()))
        if res.is_valid():
            res.save()
        return Response("")
    return Response(status=403)


@login_required
@api_view(['GET'])
def apiGetWaiterPermit(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        permit = hasPermit(request.user.idusers)
        if permit:
            return Response("True")
        return Response("False")
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiDeleteReserve(request):
    if (request.user.is_authenticated):
        EventReservations.objects.filter(user=request.user.idusers, event=request.data['event']).delete()
    return Response("Success")


@login_required
@api_view(['POST'])
def apiApproveReservation(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        res = EventReservations.objects.filter(user=request.data['idusers'], event=request.data['idevents'])
        res.update(approved=1)
        tables = json.loads(request.data['tables'])
        for each in tables:
            tab = {}
            print(each)
            FreeTables.objects.filter(table=each['idtable'], event=request.data['idevents']).delete()
            tab['reservation'] = res[0].id
            tab['reservedtables'] = each['idtable']
            rt = ReservedTablesSerializer(data=tab)
            print(rt.is_valid())
            if (rt.is_valid()):
                rt.save()
            print(rt.errors)

        return Response("Success")
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiDenyReservation(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        res = EventReservations.objects.filter(user=request.data['idusers'], event=request.data['idevents']).delete()
        return Response("Success")
    return Response(status=403)


@login_required
@api_view(['POST'])
def apiBuyCupon(request):
    if (request.user.role == 'Waiter' or request.user.role == 'Manager'):
        print(request.data)
        cpn = Coupon.objects.filter(idcupon=request.data['idcoupon'])
        print(cpn)
        cpn = cpn[0]
        pts = cpn.points
        usr = Users.objects.filter(idusers=request.data['idusers'])
        usrpts = usr[0].salary
        if (usrpts >= pts):
            usr.update(salary=(usrpts - pts))
            return Response(CouponSerializer(cpn).data)
        return Response({'idcupon': -1, 'description': "Nema dovoljno poena", 'name': 'Neuspeh'})
    return Response(status=403)


'''d=res.data
    d['name'] = 'newName' 
    n = ProductSerializer(data=res.data)
    print(n)
    n = ProductSerializer(data=d)
    print(n)'''
