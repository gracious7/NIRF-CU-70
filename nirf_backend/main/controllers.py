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
  file_path = os.path.join(BASE_DIR, 'main/data/nirf/2022.csv')
  df = pd.read_csv(file_path)
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

  scores = pd.DataFrame(features, index=[0])
  scores['Weighted_Score'] = (
    features['TLR'] * weightage['TLR'] +
    features['RPC'] * weightage['RPC'] +
    features['GO'] * weightage['GO'] +
    features['OI'] * weightage['OI'] +
    features['PR'] * weightage['PR']
  )

  predictions = model.predict(scores[['Weighted_Score']])
  scores['Predicted_Rank'] = predictions
  rank = scores['Predicted_Rank'].values[0]
  return round(rank)


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
  ax3.legend(bbox_to_anchor=(1, 1))

  my_stringIObytes = io.BytesIO()
  fig3.savefig(my_stringIObytes, format='jpg', bbox_inches='tight')
  my_stringIObytes.seek(0)
  all_features = base64.b64encode(my_stringIObytes.read()).decode()
  plt.close(fig3)

  return all_features


def get_overall_graphs(college, features):
  graphs = {}
  graphs['all_features'] = get_overall_feature_scores(college, features)
  return graphs


def compare(college1, college2):
  years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
  type_required = ['SS', 'FSR', 'FQE', 'FRU', 'PU', 'QP', 'IPR', 'FPPP', 'GPH', 'GUE', 'GMS', 'GPHD', 'RD', 'WD', 'ESCS', 'PCS', 'PR']

  data1 = {type: [] for type in type_required}
  data2 = {type: [] for type in type_required}

  for y in years:
    file_path = os.path.join(BASE_DIR, f'main/data/nirf/{y}.csv')
    df = pd.read_csv(file_path)
    df['Name'] = df['Name'].str.upper()
    df['Name'] = df['Name'].str.replace(",", "")
    college1 = college1.upper()
    college1 = college1.replace(",", "")
    
    college2 = college2.upper()
    college2 = college2.replace(",", "")

    df_dict1 = df[df['Name'] == college1].to_dict(orient='records')
    df_dict2 = df[df['Name'] == college2].to_dict(orient='records')

    flag1 = 0
    flag2 = 0
    if len(df_dict1) == 0:
      flag1 = 1
    
    if not flag1:
      df_dict1 = df_dict1[0]

    if len(df_dict2) == 0:
      flag2 = 1
    
    if not flag2:
      df_dict2 = df_dict2[0]

    for type in type_required:
      if not flag1:
        data1[type].append(df_dict1[type])
      else:
        data1[type].append(0)

    for type in type_required:
      if not flag2:
        data2[type].append(df_dict2[type])
      else:
        data2[type].append(0)

  college1_df = pd.DataFrame(data1)
  college2_df = pd.DataFrame(data2)
  college1_avg = college1_df.mean()
  college2_avg = college2_df.mean()

  differences = college1_avg - college2_avg
  properties_to_improve = differences[differences < 0]
  properties_to_improve = properties_to_improve.sort_values()

  response = []

  ff = {
    'PR': 'Perception',
    'QP': 'Combined metric for Quality of Publications',
    'GPH': 'Combined metric for Placement and Higher Studies',
    'PU': 'Combined metric for Publications',
    'FRU': 'Financial Resources and their Utilisation',
    'FSR': 'Faculty-student ratio with emphasis on permanent faculty',
    'RD': 'Percentage of Students from other States/Countries',
    'WD': 'Percentage of Women',
    'GMS': 'Median Salary',
    'FQE': 'Combined metric for Faculty with PhD & Experience',
    'SS': 'Student Strength including Doctoral Students',
    'GPHD': 'Metric for Number of Ph.D. Students Graduated',
    'PCS': 'Facilities for Physically Challenged Students',
    'ESCS': 'Economically and Socially Challenged Students',
    'IPR': 'Patents: Published and Granted',
    'GUE': 'Metric for University Examinations',
    'FPPP': 'Footprint of Projects and Professional Practice'
  }

  for property_name, diff in properties_to_improve.items():
    diff = abs(diff)
    response.append(f'Your {ff[property_name]} lags behind by {diff:.2f}')

  type_required = ['TLR', 'RPC', 'GO', 'OI', 'PR']
  data1 = {type: [] for type in type_required}
  data2 = {type: [] for type in type_required}

  for y in years:
    file_path = os.path.join(BASE_DIR, f'main/data/nirf/{y}.csv')
    df = pd.read_csv(file_path)
    df['Name'] = df['Name'].str.upper()
    df['Name'] = df['Name'].str.replace(",", "")
    college1 = college1.upper()
    college1 = college1.replace(",", "")
    
    college2 = college2.upper()
    college2 = college2.replace(",", "")

    df_dict1 = df[df['Name'] == college1].to_dict(orient='records')
    df_dict2 = df[df['Name'] == college2].to_dict(orient='records')

    flag1 = 0
    flag2 = 0
    if len(df_dict1) == 0:
      flag1 = 1
    
    if not flag1:
      df_dict1 = df_dict1[0]

    if len(df_dict2) == 0:
      flag2 = 1
    
    if not flag2:
      df_dict2 = df_dict2[0]

    for type in type_required:
      if not flag1:
        data1[type].append(df_dict1[type])
      else:
        data1[type].append(0)

    for type in type_required:
      if not flag2:
        data2[type].append(df_dict2[type])
      else:
        data2[type].append(0)

  fig4, ax4 = plt.subplots()
  for type in type_required:
    ax4.plot(years, data1[type], label=f"{type}-{college1}")
    ax4.plot(years, data2[type], label=f"{type}-{college2}")


  ax4.set_title(f"{college1} VS {college2}")
  ax4.legend(bbox_to_anchor=(1, 1))

  my_stringIObytes = io.BytesIO()
  fig4.savefig(my_stringIObytes, format='jpg', bbox_inches='tight')
  my_stringIObytes.seek(0)
  compare_features = base64.b64encode(my_stringIObytes.read()).decode()
  plt.close(fig4)

  return [response, compare_features]


def get_recommendation(college, rank):
  rank = int(rank)
  years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
  type_required = ['SS', 'FSR', 'FQE', 'FRU', 'PU', 'QP', 'IPR', 'FPPP', 'GPH', 'GUE', 'GMS', 'GPHD', 'RD', 'WD', 'ESCS', 'PCS', 'PR']
  
  data1 = {type: [] for type in type_required}
  data2 = {type: [] for type in type_required}

  df1 = pd.read_csv(os.path.join(BASE_DIR, 'main/data/nirf/2023.csv'))
  college2 = df1[df1['Rank'] == rank].to_dict(orient='records')[0]['Name']

  avg_changes = {'SS': [0, 0], 'FSR': [0, 0], 'FQE': [0, 0], 'FRU': [0, 0], 'PU': [0, 0], 'QP': [0, 0], 'IPR': [0, 0], 'FPPP': [0, 0], 'GPH': [0, 0], 'GUE': [0, 0], 'GMS': [0, 0], 'GPHD': [0, 0], 'RD': [0, 0], 'WD': [0, 0], 'ESCS': [0, 0], 'PCS': [0, 0], 'PR': [0, 0]}

  for y in years:
    file_path = os.path.join(BASE_DIR, f'main/data/nirf/{y}.csv')
    df = pd.read_csv(file_path)
    df['Name'] = df['Name'].str.upper()
    df['Name'] = df['Name'].str.replace(",", "")
    college = college.upper()
    college = college.replace(",", "")

    college2 = college2.upper()
    college2 = college2.replace(",", "")
    
    df_dict1 = df[df['Name'] == college].to_dict(orient='records')
    df_dict2 = df[df['Name'] == college2].to_dict(orient='records')
    # df_dict2 = df[df['Rank'] == rank].to_dict(orient='records')

    flag1 = 0
    flag2 = 0
    if len(df_dict1) == 0:
      flag1 = 1
    
    if not flag1:
      df_dict1 = df_dict1[0]

    if len(df_dict2) == 0:
      flag2 = 1
    
    if not flag2:
      df_dict2 = df_dict2[0]

    for type in type_required:
      if not flag1:
        data1[type].append(df_dict1[type])
      else:
        data1[type].append(0)

    # for type in type_required:
    #   if not flag2:
    #     tmp_sum = avg_changes[type][0] * avg_changes[type][1]
    #     tmp_sum += df_dict2[type]
    #     tmp_avg = ((tmp_sum) / (avg_changes[type][1] + 1))
    #     avg_changes[type][1] += 1
    #     avg_changes[type][0] = tmp_avg

    for type in type_required:
      if not flag2:
        data2[type].append(df_dict2[type])
      else:
        data2[type].append(0)


  response = []

  ff = {
    'PR': ['Perception', 'Enhance PR score by conducting regular, diverse, and updated surveys involving employers and academics. Include various sectors, regions, and organizations to reflect accurate preferences and improve institution reputation.'],

    'QP': ['Combined metric for Quality of Publications', 'To improve the Quality of Publications (QP) metric , focus on increasing Citation Count (CC) and Frequency of Research Questions (FRQ) while enhancing the percentage of publications in Top 25% Journals (TOP25P/P). Prioritize impactful research and target high-ranking journals for greater QP score.'],

    'GPH': ['Combined metric for Placement and Higher Studies', 'To improve the Combined Metric for Placement and Higher Studies , institutions can enhance placement services, strengthen industry connections for job opportunities, and provide career guidance. Encouraging students to pursue higher studies through scholarships, research opportunities, and mentorship can also boost the GPH score.'],

    'PU': ['Combined metric for Publications', 'Combined metric for Publications by increasing the ratio of weighted number of publications as acertained from suitable third party sources to  the maximun of nominal number of faculty members as calculated on the basis of a required FSR.'],

    'FRU': ['Financial Resources and their Utilisation', 'Financial Resources and their utilisation can be imrpoved by increasing  average Annual Capital Expenditure per student for previous three years pertaining to engineering discipline only and Average Annual Operational(or Recurring) Expenditure per student for previous three years pertaining to engineering discipline only.'],

    'FSR': ['Faculty-student ratio with emphasis on permanent faculty', 'Faculty-Student Ratio can be improved by increasing total sanctioned approved intake in the institution, total number of students enrolled for the doctoral program and full time regular faculty in the institution in the previous year.'],

    'RD': ['Percentage of Students from other States/Countries', 'Improve Region Diversity (RD) score , focus on attracting students nationally and internationally. Enhance marketing efforts, scholarships, and cultural exchange programs to increase enrollment from diverse regions and countries.'],

    'WD': ['Percentage of Women', 'To improve Women Diversity, prioritize recruitment and retention of women students and faculty. Implement targeted initiatives, mentorship programs, and equal opportunity policies to achieve the desired 50% women students and 20% women faculty, enhancing the WD score.'],

    'GMS': ['Median Salary', 'To improve the Median Salary Metric , institutions should focus on strengthening industry connections, offering specialized training programs, and supporting internships. Encourage students to participate in networking events and career fairs, preparing them for competitive job placements, thereby increasing the median salary and enhancing the GMS score.'],

    'FQE': ['Combined metric for Faculty with PhD & Experience', 'Combined Metric for Faculty with PhD can be improved by increasing the percentage of Faculty with Ph.D. (or equivalent qualification) with respect to the total no. of faculty required.'],

    'SS': ['Student Strength including Doctoral Students', 'Student Strength can be improved by increasing total sanctioned approved intake in the institution ,total number of students enrolled in the institution and  total number of students enrolled for the doctoral program .'],

    'GPHD': ['Metric for Number of Ph.D. Students Graduated', 'Metric for Number of Ph.D Students Graduated can be imrpoved by strengthening Ph.D. programs with quality mentorship, research resources, and funding. Encourage timely completion, leading to an increased average number of Ph.D. graduates and higher GPHD score.'],

    'PCS': ['Facilities for Physically Challenged Students', 'Enhance PCS score by ensuring comprehensive accessibility, adaptive technologies, and support services for physically challenged students. Provide verifiable responses demonstrating improved facilities and inclusivity.'],

    'ESCS': ['Economically and Socially Challenged Students', 'Improve ESCS score by expanding financial aid programs, scholarships, and support services to economically disadvantaged students, ensuring equitable access to education and enhancing the Nesc percentage.'],

    'IPR': ['Patents: Published and Granted', 'To enhance Patents Published (PP) for a better IPR score, focus on increasing the quantity and quality of research output. Collaborate with experts, explore niche areas, invest in R&D, and maintain a proactive approach to patent applications, ensuring timely submissions and strategic innovations,'],

    'GUE': ['Metric for University Examinations', 'To improve the University Examinations Metric, focus on enhancing teaching methods, providing academic support, and fostering a positive learning environment. Encourage student engagement, offer remedial classes, and provide timely feedback to ensure a higher percentage of students pass examinations within the stipulated time, ultimately improving the GUE score.'],

    'FPPP': ['Footprint of Projects and Professional Practice', 'To enhance the Footprint of Projects and Professional Practice (FPPP) score , institutions can focus on increasing research funding (RF) by securing grants, collaborating with industries, and pursuing competitive funding opportunities. Additionally, strengthening consultancy efforts (CF) through industry partnerships and effective project management can further elevate the FPPP metric.']
  }


  college1_df = pd.DataFrame(data1)
  college2_df = pd.DataFrame(data2)
  college1_avg = college1_df.mean()
  college2_avg = college2_df.mean()

  differences = college1_avg - college2_avg
  properties_to_improve = differences[differences < 0]
  properties_to_improve = properties_to_improve.sort_values()

  for property_name, diff in properties_to_improve.items():
    diff = abs(diff)
    response.append(ff[property_name])

  return response