from django.urls import path
from base.views import chat_views as views

urlpatterns = [
    path('webhook/', views.webhook, name='webhook'),

]
