from django.conf.urls import url
from . import views

app_name = 'classes'
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'order/$', views.order, name='order'),
]