from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import pandas as pd
from .controllers import rank_prediction, find_college_data, get_graphs, get_overall_graphs, compare, get_recommendation
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
  form =  data['features']

  # to store all the scores of the five features
  features = data['features']
  print(features)
  # features['TLR'] = form['ss'] + form['fsr'] + form['fqe'] + form['fru']
  # features['RPC'] = form['pu'] + form['qp'] + form['ipr'] + form['fppp']
  # features['GO'] = form['gph'] + form['gue'] + form['gms'] + form['gphd']
  # features['OI'] = form['rd'] + form['wd'] + form['escs'] + form['pcs']
  # features['PR'] = form['pr']
  
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
    for i in data['reqFeatures'].keys():
      if data['reqFeatures'][i] == 1:
        reqFeatures.append(i)

    graphs = get_overall_graphs(college_name, reqFeatures)
    return Response({'ok': True, 'message': "Graph fetched", 'graphs': graphs})
  except:
    return Response({'ok': False, 'message': "Unauthorized"})


@api_view(["POST"])
def compare_college(request):
  data = request.data
  token = data['token']
  college_data = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=["HS256"])
  college1 = college_data['college']

  comparison = compare(college1, data['compare'])
  return Response({'ok': True, 'message': comparison[0], 'graphs': comparison[1]})


@api_view(['POST'])
def recommend(request):
  data = request.data
  token = data['token']
  college_data = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=["HS256"])
  college = college_data['college']
  rank = data['rank']

  recoms = get_recommendation(college, rank)
  return Response({'ok': True, 'message': recoms})