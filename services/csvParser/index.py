import pandas as pd

jobs = pd.read_csv('services/csvParser/jobs.csv')
jobs.to_json(orient='records', path_or_buf='services/csvParser/jobs.json')
print("Created JSON")
