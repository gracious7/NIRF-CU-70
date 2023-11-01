from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import pandas as pd
from .controllers import rank_prediction, find_college_data, get_graphs, get_overall_graphs
from .models import College_Admin
import os
import jwt
from nirf_backend.settings import BASE_DIR

@api_view(['GET'])
def hello(request):
  return Response({'message': '200'}) 


@api_view(['POST'])
def predict_rank(request):
  data = request.data
  
  # to store all the scores of the five features
  features = {}
  features['TLR'] = data['ss'] + data['fsr'] + data['fqe'] + data['fru']
  features['RPC'] = data['pu'] + data['qp'] + data['ipr'] + data['fppp']
  features['GO'] = data['gph'] + data['gue'] + data['gms'] + data['gphd']
  features['OI'] = data['rd'] + data['wd'] + data['escs'] + data['pcs']
  features['PR'] = data['pr']
  
  # predict rank based on previous year data
  rank = rank_prediction(features)
  return Response({"ok": True, "message": rank})


@api_view(['GET'])
def get_ranks(request):
  year = request.GET.get('year')
  df = pd.read_csv(f'/backend/main/data/nirf/{year}.csv')
  df = df.drop(columns=['TLR', 'RPC', 'GO', 'OI', 'PR', 'SS', 'FSR', 'FQE', 'FRU', 'PU', 'QP', 'IPR', 'FPPP', 'GPH', 'GUE', 'GMS', 'GPHD', 'RD', 'WD', 'ESCS', 'PCS'])
  df = df.to_dict(orient='records')
  return Response({"ok": True, "message": df})


@api_view(['POST'])
def login(request):
  data = request.data

  users = College_Admin.objects.get(username=data['username'])
  if users.password == data['password']:
    res = find_college_data(users.college_name)
    encoded_jwt = jwt.encode({"username": data["username"], "college": users.college_name, "admin": data['admin']}, os.environ.get('SECRET_KEY'), algorithm="HS256")

    college_data = {}
    college_data['rank'] = res[0]
    college_data['score'] = res[1]

    return Response({"ok": True, "message": "Logged in", "college_data": college_data, "token": encoded_jwt})
  else:
    return Response({"ok": False, "message": "Wrong Password"})
  

@api_view(["POST"])
def get_performance(request):
  data = request.data
  token = data['token']
  try:
    college_data = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=["HS256"])
    college_name = college_data['college']

    graphs = get_graphs(college_name)
    return Response({'ok': True, 'message': "Graph fetched", 'graphs': graphs})
  except:
    return Response({'ok': False, 'message': "Unauthorized"})


@api_view(['POST'])
def get_overall_performance(request):
  data = request.data
  token = data['token']
  try:
    college_data = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=["HS256"])
    college_name = college_data['college']
    reqFeatures = []
    print(data['reqFeatures'])
    for i in data['reqFeatures'].keys():
      if data['reqFeatures'][i] == 1:
        reqFeatures.append(i)

    graphs = get_overall_graphs(college_name, reqFeatures)
    return Response({'ok': True, 'message': "Graph fetched", 'graphs': graphs})
  except:
    return Response({'ok': False, 'message': "Unauthorized"})