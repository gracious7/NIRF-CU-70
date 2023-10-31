from django.urls import path
from main.views import hello, get_ranks

urlpatterns = [
  path('', hello),
  path('get_ranks', get_ranks),
]