from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import pandas as pd
from .controllers import rank_prediction

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