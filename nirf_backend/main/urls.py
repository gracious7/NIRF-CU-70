from django.urls import path
from main.views import hello, get_ranks, login, get_performance, get_overall_performance

urlpatterns = [
  path('', hello),
  path('get_ranks', get_ranks),
  path('login', login),
  path('get_performance', get_performance),
  path('get_overall_performance', get_overall_performance),
]