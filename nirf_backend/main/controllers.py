# import numpy as np
# from sklearn.metrics import mean_squared_error, r2_score
# from sklearn.model_selection import train_test_split
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import os
from nirf_backend.settings import BASE_DIR
import matplotlib.pyplot as plt
import io
import base64

weightage = {
  'TLR': 0.30, 
  'RPC': 0.30, 
  'GO': 0.20, 
  'OI': 0.10, 
  'PR': 0.10
}

def rank_prediction(features):
  df = pd.read_csv('/backe/nirf/data/2022.csv')
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


def get_feature_scores(college):
  year = 2023
  file_path = os.path.join(BASE_DIR, f'main/data/nirf/{year}.csv')
  df = pd.read_csv(file_path)

  df['Name'] = df['Name'].str.upper()
  df['Name'] = df['Name'].str.replace(",", "")
  college = college.upper()
  college = college.replace(",", "")

  dict_data = df[df['Name'] == college].to_dict(orient='records')

  if len(dict_data) == 0:
    return {'features_scores': "", 'ranks': ""}
  else:
    dict_data = dict_data[0]

  x_axis = ['TLR', 'RPC', 'GO', 'OI', 'PR']
  y_axis = []
  for i in x_axis:
    y_axis.append(dict_data[i])

  fig1, ax1 = plt.subplots()
  ax1.bar(x_axis, y_axis, color='maroon', width=0.4)
  ax1.set_xlabel("Parameters")
  ax1.set_ylabel("Scores")
  ax1.set_title(f"{college} in {year}")

  my_stringIObytes = io.BytesIO()
  fig1.savefig(my_stringIObytes, format='jpg')
  my_stringIObytes.seek(0)
  features_scores = base64.b64encode(my_stringIObytes.read()).decode()
  plt.close(fig1)
  return features_scores


def get_ranks(college):
  years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
  type_required = ['Rank']
  data = {type: [] for type in type_required}

  for y in years:
    file_path = os.path.join(BASE_DIR, f'main/data/nirf/{y}.csv')
    df = pd.read_csv(file_path)
    df['Name'] = df['Name'].str.upper()
    df['Name'] = df['Name'].str.replace(",", "")
    college = college.upper()
    college = college.replace(",", "")
    df = df[df['Name'] == college].to_dict(orient='records')
    flag = 0
    if len(df) == 0:
      flag = 1
    
    if not flag:
      df = df[0]

    for type in type_required:
      if not flag:
        data[type].append(df[type])
      else:
        data[type].append(0)

  fig2, ax2 = plt.subplots()
  for type in data.keys():
    non_zero_years = [year for year, rank in zip(years, data[type]) if rank != 0]
    non_zero_ranks = [rank for rank in data[type] if rank != 0]
    ax2.plot(non_zero_years, non_zero_ranks, marker='o', label=type)


  ax2.invert_yaxis()
  ax2.set_title(college)
  ax2.set_ylabel("Rank")
  ax2.set_xlabel("Year")

  my_stringIObytes = io.BytesIO()
  fig2.savefig(my_stringIObytes, format='jpg')
  my_stringIObytes.seek(0)
  ranks = base64.b64encode(my_stringIObytes.read()).decode()
  plt.close(fig2)
  return ranks


def get_graphs(college):
  graphs = {}
  graphs['features_scores'] = get_feature_scores(college)
  graphs['ranks'] = get_ranks(college)
  return graphs


def get_overall_feature_scores(college, features):
  years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
  type_required = features
  data = {type: [] for type in type_required}

  for y in years:
    file_path = os.path.join(BASE_DIR, f'main/data/nirf/{y}.csv')
    df = pd.read_csv(file_path)
    df['Name'] = df['Name'].str.upper()
    df['Name'] = df['Name'].str.replace(",", "")
    college = college.upper()
    college = college.replace(",", "")
    df = df[df['Name'] == college].to_dict(orient='records')
    flag = 0
    if len(df) == 0:
      flag = 1
    
    if not flag:
      df = df[0]

    for type in type_required:
      if not flag:
        data[type].append(df[type])
      else:
        data[type].append(0)

  fig3, ax3 = plt.subplots()
  for type in data.keys():
    ax3.plot(years, data[type], label=type, marker='o')

  ax3.set_title(college)
  ax3.set_ylabel("Score")
  ax3.set_xlabel("Year")
  ax3.legend()

  my_stringIObytes = io.BytesIO()
  fig3.savefig(my_stringIObytes, format='jpg')
  my_stringIObytes.seek(0)
  all_features = base64.b64encode(my_stringIObytes.read()).decode()
  plt.close(fig3)

  return all_features


def get_overall_graphs(college, features):
  graphs = {}
  graphs['all_features'] = get_overall_feature_scores(college, features)
  return graphs