from django.urls import path
from . import views

app_name = 'chatbots'

urlpatterns = [
    
    path('', views.index, name='index'),
    path('indata/', views.indata, name='indata'),
    path('select/', views.select, name = 'select'),

]
