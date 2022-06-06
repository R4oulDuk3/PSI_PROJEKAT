from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token

from .views import *
urlpatterns = [
    path('', index, name="index"),
    path('meni.html', meniUser, name="meni"),
    path('Client.html', ClientUser, name="ClientUser"),
    path('dogadjaji.html', dogadjajiUser, name="dogadjajiUser"),
    path('kuponi.html', kuponiUser, name="kuponiUser"),
    path('login.html', loginUser, name="loginUser"),
    path('reg.html', regUser, name="regUser"),
    path('home.html', home, name="home"),
    path('biranjeSmene', biranjeSmene, name="biranjeSmene"),
    path('Smene', Smene, name="Smene"),
    path('inventar', inventar, name="inventar"),
    path('izvestaj', izvestaj, name="izvestaj"),
    path('kuponi', kuponi, name="kuponi"),
    path('korisnici', korisnici, name="korisnici"),
    path('rasporedi.html', rasporedi, name="rasporedi"),
    path('meni', meni, name="meni"),
    path('dogadjaji', dogadjaji, name="dogadjaji"),
    path('stolovi', stolovi, name="stolovi"),
    path('izvestaji', stolovi, name="stolovi"),
    path('QRkod', skeniranjeQRKoda, name="skeniranjeQRKoda"),
    path('rasporedi_konobar', rasporedi_konobar, name="rasporedi_konobar"),
    path('novi-raspored.html', newSchedule, name="newSchedule"),
    path('popis.html', popis, name="popis"),
    path('ZapocniSmenu.html', zapocniSmenu, name="zapocniSmenu"),
    path('DogadjajRezervacije.html', dogadjajiRezervacije, name="dogadjajiRezervacije"),
    path('apiMeni', apiMeni, name="apiMeni"),
    path('apiMeniAdd', apiMeniAdd, name="apiMeniAdd"),
    path('apiProduct', apiProduct, name="apiProduct"),
    path('apiDeleteProduct', apiDeleteProduct, name="apiDeleteProduct"),
    path('apiUpdateProduct', apiUpdateProduct, name="apiUpdateProduct"),
    path('apiProductAll', apiProductAll, name="apiProductAll"),
    path('apiSetProduct', apiSetProduct, name="apiSetProduct"),
    path('apiDeficientProduct', apiDeficientProduct, name="apiDeficientProduct"),
    path('apiCoupons', apiCoupon, name="apiCoupon"),
    path('apiCreateCoupon', apiCreateCoupon, name="apiCreateCoupon"),
    path('apiEvents', apiEvents, name="apiEvents"),
    path('apiDeleteEvent', apiDeleteEvent, name="apiDeleteEvent"),
    path('apiCreateEvent', apiCreateEvent, name="apiCreateEvent"),
    path('apiReservations', apiReservations, name="apiReservations"),
    path('apiEventsForUser', apiEventsForUser, name="apiEventsForUser"),
    path('apiCreateUser', apiCreateUser, name="apiCreateUser"),
    path('apiLogIn', apiLogIn, name="apiLogIn"),
    path('apiOutUser', apiOutUser, name="apiOutUser"),
    path('apiTables', apiTables, name="apiTables"),
    path('apiSetup', apiSetup, name="apiSetup"),
    path('apiCreateTables', apiCreateTables, name="apiCreateTables"),
    path('apiDeleteTable', apiDeleteTables, name="apiDeleteTables"),
    path('apiDeleteSetup', apiDeleteSetup, name="apiDeleteSetup"),
    path('apiCreateSetup', apiCreateSetup, name="apiCreateSetup"),
    path('apiWaiter', apiWaiters, name="apiWaiters"),
    path('apiCreateWaiter', apiCreateWaiter, name="apiCreateWaiters"),
    path('apiCreateManager', apiCreateManager, name="apiCreateManager"),
    path('apiDeleteWaiters', apiDeleteWaiters, name="apiDeleteWaiters"),
    path('apiSchedule', apiSchedule, name="apiSchedule"),
    path('apiChangeSchedule', apiChangeSchedule, name="apiSchedule"),
    path('apiShift', apiShift, name="apiShift"),
    path('apiChangeShift', apiChangeShift, name="apiChangeShift"),
    path('apiPreference', apiPreference, name="apiPreference"),
    path('apiSetPreference', apiSetPreference, name="apiSetPreference"),
    path('apiCustomerExpendature', apiCustomerExpeneture, name="apiCustomerExpendature"),
    path('apiReservationsNA', apiReservationsNA, name="apiReservationsNA"),
    path('apiReservationsA', apiReservationsA, name="apiReservationsA"),
    path('apiFreeTables', apiFreeTables, name="apiFreeTables"),
    path('apiStart', apiStart, name="apiStart"),
    path('apiEnd', apiEnd, name="apiEnd"),
    path('apiCheckLogInUser', apiCheckLogInUser, name="apiCheckLogInUser"),
    path('apiEventReservations', apiEventReservations, name="apiEventReservations"),
    path('apiReserve', apiReserve, name="apiReserve"),
    path('apiDeleteReserve', apiDeleteReserve, name="apiDeleteReserve"),
    path('apiApproveReservation', apiApproveReservation, name="apiApproveReservation"),
    path('apiDenyReservation', apiDenyReservation, name="apiDenyReservation"),
    path('apiBuyCoupon', apiBuyCupon, name="apiBuyCupon"),
    path('apiDeleteCoupon', apiDeleteCoupon, name="apiDeleteCoupon"),
    path('apiGetRole', apiGetRole, name="apiGetRole"),
    path('apiMyPreference', apiMyPreference, name="apiMyPreference"),
    path('apiGetId', apiGetId, name="apiGetId"),
    path('apiGetCustomerExpeneture', apiGetCustomerExpeneture, name="apiGetCustomerExpeneture"),
    path('apiGetProductSold', apiGetProductSold, name="apiGetProductSold"),
    path('apiMySchedule', apiMySchedule, name="apiMySchedule"),
    path('apiPostWaiterWorkHours', apiPostWaiterWorkHours, name="apiPostWaiterWorkHours"),
    path('apiPostWaiterPermit', apiPostWaiterPermit, name="apiPostWaiterPermit"),
    path('apiGetWaiterPermit', apiGetWaiterPermit, name="apiGetWaiterPermit"),
    path('apiStartSchedule', apiStartSchedule, name="apiStartSchedule"),
    path('apiGetWaiterWorkHours', apiGetWaiterWorkHours, name="apiGetWaiterWorkHours"),

]