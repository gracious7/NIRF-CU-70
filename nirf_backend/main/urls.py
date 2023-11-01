from django.urls import path
from main.views import hello, get_ranks, login, get_performance, get_overall_performance, predict_rank, compare_college, recommend

urlpatterns = [
  path('', hello),
  path('get_ranks', get_ranks),
  path('login', login),
  path('get_performance', get_performance),
  path('get_overall_performance', get_overall_performance),
  path('predict_rank', predict_rank),
  path('compare_college', compare_college),
  path('recommend', recommend),
]