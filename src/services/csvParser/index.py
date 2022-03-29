import sys
from pathlib import Path
import pandas as pd
jobs = pd.read_csv(sys.argv[1])
jobs.to_json(orient='records', path_or_buf=Path.cwd().joinpath(
    'src', 'services', 'csvParser', 'jobs.json'))
print("Created JSON")
sys.stdout.flush()
sys.stderr.flush()
