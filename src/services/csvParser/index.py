from pathlib import Path
import pandas as pd
jobs = pd.read_csv('jobs.csv')
jobs.to_json(orient='records', path_or_buf=Path.cwd().joinpath(
    'src', 'services', 'csvParser', 'jobs.json'))
print("Created JSON")
