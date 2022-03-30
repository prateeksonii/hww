import os
from pathlib import Path
import pandas as pd
from sqlalchemy import create_engine
from dotenv import load_dotenv

load_dotenv()

engine = create_engine(os.environ.get('DB_URL'))

with engine.connect() as connection:
    jobs = pd.read_csv('services/csvParser/jobs.csv')
    jobs.to_sql(name='jobs', con=connection)
    print("Updated database")
