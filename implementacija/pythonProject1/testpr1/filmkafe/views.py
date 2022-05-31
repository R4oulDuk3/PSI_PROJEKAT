import json


import datetime
from django.contrib.auth import authenticate, login, logout
from django.db.models import F
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from django.template import loader
from .models import Meni, Product, Coupon, Events, EventReservation, Users, Shift, Schedule, Setup, Table, SetupTables
from .serializers import MeniSerializer, ProductSerializer, CouponSerializer, EventsSerializer, \
    EventReservationSerializer, UsersSerializer, ShiftSerializer, ScheduleSerializer, MeniInsertSerializer, \
    TableSerializer, SetupSerializer, SetupCreateSerializer, TableCreateSerializer, SetupTablesSerializer


def index(request):
    return HttpResponse("hello world")


def home(request):
    puff=""
    temp = loader.get_template('filmkafe/stefan/home.html')
    context={'puf':puff}
    return HttpResponse(temp.render(context,request))
# Create your views here.


def game(request):
    puff=""
    temp = loader.get_template('filmkafe/asocijacije-igra.html')
    context={'puf':puff}
    return HttpResponse(temp.render(context,request))


def inventar(request):
    puff=""
    temp = loader.get_template('filmkafe/inventar.html')
    context={'puf':puff}
    return HttpResponse(temp.render(context,request))

def meni(request):
    puff=""
    temp = loader.get_template('filmkafe/meni.html')
    context={'puf':puff}
    return HttpResponse(temp.render(context,request))

def dogadjaji(request):
    puff=""
    temp = loader.get_template('filmkafe/dogadjaji.html')
    context={'puf':puff}
    return HttpResponse(temp.render(context,request))

def korisnici(request):
    puff=""
    temp = loader.get_template('filmkafe/konobari.html')
    context={'puf':puff}
    return HttpResponse(temp.render(context,request))

def stolovi(request):
    puff=""
    temp = loader.get_template('filmkafe/stolovi.html')
    context={'puf':puff}
    return HttpResponse(temp.render(context,request))

def kuponi(request):
    puff=""
    temp = loader.get_template('filmkafe/kuponi.html')
    context={'puf':puff}
    return HttpResponse(temp.render(context,request))

def izvestaj(request):
    puff=""
    temp = loader.get_template('filmkafe/izvestaj.html')
    context={'puf':puff}
    return HttpResponse(temp.render(context,request))


def rasporedi(request):
    puff=""
    temp = loader.get_template('filmkafe/rasporedi.html')
    context={'puf':puff}
    return HttpResponse(temp.render(context,request))


@api_view(['GET'])
def apiMeni(request):
    res = []
    types = Meni.objects.order_by().values('subtype').distinct()
    for each in types:
        meni = {}
        m = Meni.objects.filter(subtype = each['subtype'])
        meni['naziv'] = str(each['subtype'])
        meni['stavke'] = (MeniSerializer(m, many=True)).data
        res.append(meni)
    return Response(res)



@api_view(['GET'])
def apiProduct(request):
    p = Product.objects.filter(amount__gt = F('minamount'))
    res = ProductSerializer(p, many = True)
    return Response(res.data)


@api_view(['GET'])
def apiDeficientProduct(request):
    p = Product.objects.filter(minamount__gte = F('amount'))
    res = ProductSerializer(p, many = True)
    return Response(res.data)

@api_view(['GET'])
def apiCoupon(request):
    c = Coupon.objects.all()
    res = CouponSerializer(c, many = True)
    return Response(res.data)

@api_view(['GET'])
def apiEvents(request):
    e = Events.objects.all()
    print(e)
    res = EventsSerializer(e, many = True)
    return Response(res.data)

@api_view(['GET'])
def apiReservations(request):
    e = EventReservation.objects.all()
    res =EventReservationSerializer(e, many = True)
    return Response(res.data)

@api_view(['GET'])
def apiEventsForUser(request):
    e = EventReservation.objects.filter(user=1).values('event')
    print(e)
    events =list()
    for each in e:
        events.append(Events.objects.filter(idevents = each['event'])[0])
    print (events)
    res = EventsSerializer(events, many = True)
    return Response(res.data)

@api_view(['POST'])
def apiSetProduct(request):
        p = request.data.copy()
        newProd = Product.objects.filter(idproduct=int(p['idproduct']))
        p['unit']='l'
        p['description']=''
        p['Type']='test'
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


@api_view(['POST'])
def apiCreateUser(request):
    dat = request.data
    mail = dat['email']
    password = dat['password']
    usr = Users.objects.create_user(mail,mail,password, role='User')
    errcode = usr.save(usr)

    return Response(errcode)


@api_view(['POST'])
def apiCreateWaiter(request):
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
        dat['username']=dat['email']
        dat['role']='Waiter'
        dat['phone']=dat['telefon']
        print(dat)
        '''usr = UsersSerializer(data=dat)
        if usr.is_valid():
            usr.save
        print(usr.errors)'''
        usr = Users.objects.create_user(mail, mail, password, role='Waiter', name=dat['name'], surname = dat['surname'], phone = dat['telefon'], imagepath = dat['imagepath'])
        errcode = usr.save(usr)
    finally:
        return Response("Success")


@api_view(['GET'])
def apiCreateManager(request):
    return Response('')



@api_view(['POST'])
def apiLogIn(request):
    dat = request.data
    mail = dat['email']
    password = dat['password']
    usr = authenticate(request,username=mail,password=password)
    print(usr)
    if usr is not None:
        login(request, usr)
    print(request.user.iduser)
    logout(request)
    return Response()


@api_view(['GET'])
def apiLogIn(request):
    logout(request)



@api_view(['POST'])
def apiCreateEvent(request):
    ind = Events.objects.all().values('idevents')
    print(ind[0])
    ind = int(ind[len(ind)-1]['idevents'])+1
    p = request.data.copy()
    p['idevents']=ind
    p['end']=p['start']
    res = EventsSerializer(data=p)

    if (res.is_valid()):
        res.save()
    print(res.errors)
    return Response(res.data)


@api_view(['POST'])
def apiCreateCoupon(request):
    print(request.data)
    ind = Coupon.objects.all().values('idcupon')
    ind = ind[len(ind)-1]
    ind = ind['idcupon']+1
    p = request.data.copy()
    p['idcupon']=ind
    res = CouponSerializer(data=p)
    if (res.is_valid()):
        res.save()
    return Response(res.data)


@api_view(['POST'])
def apiDeleteEvent(request):
    id = request.data['idEvent']
    event = Events.objects.filter(idevent=id).delete()
    return Response()

@api_view(['POST'])
def apiDeleteCoupn(request):
    id = request.data['idCoupon']
    event = Events.objects.filter(idcoupon=id).delete()
    return Response()


@api_view(['GET'])
def apiWaiters(request):
    e = Users.objects.filter(role = 'Waiter')
    res =UsersSerializer(e, many = True)
    return Response(res.data)




@api_view(['POST'])
def apiDeleteWaiters(request):
    print(request.data)
    e = Users.objects.filter(idusers = request.data['idusers']).delete()
    return Response("success")

@api_view(['POST'])
def apiMeniAdd(request):
    Meni.objects.all().delete()
    i = 1
    data = request.data.copy()
    data = json.loads(data['kukuruz'])
    for each in data:
        print(each['naziv'])
        print("\n")
        for line in each["stavke"]:
            line['subtype']=each['naziv']
            line['idmeni'] = str(i)
            i+=1
            new = MeniInsertSerializer(data=line)
            if (new.is_valid()):
                new.save()
    return Response("Success")


@api_view(['GET'])
def apiShift(request):
    sm = Shift.objects.all()
    smene = ShiftSerializer(sm, many=True)
    return Response(smene.data)

@api_view(['POST'])
def apiChangeShift(request):
    sm = Shift.objects.all()
    smene = ShiftSerializer(sm, many=True)
    return Response(smene.data)


@api_view(['GET'])
def apiSchedule(request):

    print(datetime.datetime.today())
    sm = Schedule.objects.filter(day__gte = datetime.datetime.today())
    smene = ScheduleSerializer(sm, many=True)
    return Response(smene.data)


@api_view(['GET'])
def apiSetup(request):
    st = Setup.objects.all()
    set = SetupSerializer(st, many=True)
    sets=set.data
    print(sets)
    for each in sets:
        tables = []
        tableids = SetupTables.objects.filter(setup=each['idsetup']).values('table')
        for every in tableids:
            table = Table.objects.filter(idtable = every['table'])
            tables.append(TableSerializer(table[0]).data)
        each['tables'] = tables
    print(sets)

    return Response(sets)

@api_view(['GET'])
def apiTables(request):
    sp = Table.objects.all()
    smene = ScheduleSerializer(sp, many=True)
    return Response(smene.data)

@api_view(['POST'])
def apiCreateTables(request):
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
        tb = tb[len(tb)-1]
        newconn['table']=tb['idtable']
        print(newconn)
        newconn=SetupTablesSerializer(data=newconn)
        if(newconn.is_valid()):
            newconn.save()
        print("stop1\n")
        print(newconn.errors)
        return Response("success")
    print("stop2\n")
    print(new.errors)
    return Response("failed")

@api_view(['POST'])
def apiCreateSetup(request):
    rq = request.data.copy()
    new = SetupCreateSerializer(data=rq)
    print(rq)
    if (new.is_valid()):
        new.save()
        return Response("success")
    return Response("failed")


@api_view(['POST'])
def apiDeleteSetup(request):
    e = Setup.objects.filter(idsetup=request.data['idsetup']).delete()
    return Response("success")

@api_view(['POST'])
def apiDeleteTables(request):
    e = Table.objects.filter(idtable=request.data['idtable']).delete()
    return Response("Success")




'''d=res.data
    d['name'] = 'newName' 
    n = ProductSerializer(data=res.data)
    print(n)
    n = ProductSerializer(data=d)
    print(n)'''