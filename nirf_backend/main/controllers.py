# import numpy as np
# from sklearn.metrics import mean_squared_error, r2_score
# from sklearn.model_selection import train_test_split
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import os
from nirf_backend.settings import BASE_DIR

weightage = {
  'TLR': 0.30, 
  'RPC': 0.30, 
  'GO': 0.20, 
  'OI': 0.10, 
  'PR': 0.10
}

def rank_prediction(features):
  df = pd.read_csv('./nirf/2022.csv')
  df['Weighted_Score'] = (
    df['TLR'] * weightage['TLR'] +
    df['RPC'] * weightage['RPC'] +
    df['GO'] * weightage['GO'] +
    df['OI'] * weightage['OI'] +
    df['PR'] * weightage['PR']
  )

  x = df[['Weighted_Score']]
  y = df['Rank']
  model = RandomForestRegressor(n_estimators=100, random_state=0)
  model.fit(x, y)

  features = pd.DataFrame(features, index=[0])
  features['Weighted_Score'] = (
    features['TLR'] * weightage['TLR'] +
    features['RPC'] * weightage['RPC'] +
    features['GO'] * weightage['GO'] +
    features['OI'] * weightage['OI'] +
    features['PR'] * weightage['PR']
  )

  predictions = model.predict(features[['Weighted_Score']])
  features['Predicted_Rank'] = predictions
  rank = features['Predicted_Rank2'].values[0]
  return rank


def find_college_data(college):
  college = college.upper()
  college = college.replace(",", "")
  file_path = os.path.join(BASE_DIR, 'main/data/nirf/2023.csv')
  df = pd.read_csv(file_path)

  df['Name'] = df['Name'].str.upper()
  df['Name'] = df['Name'].str.replace(",", "")
  df = df[df['Name'] == college].to_dict(orient='records')

  if len(df) == 0:
    return [-1, -1]
  else:
    df = df[0]
    return [df['Rank'], df['Score']]