from flask import Blueprint, jsonify
import pandas as pd
import os
import gdown

crash_data_blueprint = Blueprint('crash_data', __name__)

# Google Drive dataset config
DATA_URL = "https://drive.google.com/uc?export=download&id=1vHlVKXMaNujytaHFfQL3WP5D9xWjZoL5"
DATA_DIR = "dataset"
DATA_PATH = os.path.join(DATA_DIR, "Motor_Vehicle_Collisions.csv")

# Ensure dataset directory exists
os.makedirs(DATA_DIR, exist_ok=True)

# Download dataset if not already present
if not os.path.exists(DATA_PATH):
    print("Downloading dataset from Google Drive using gdown...")
    gdown.download(DATA_URL, DATA_PATH, quiet=False)

# ✅ Memory-efficient CSV loading
USE_COLUMNS = [
    'CRASH DATE',
    'CRASH TIME',
    'BOROUGH',
    'ON STREET NAME',
    'COLLISION_ID',
    'NUMBER OF PERSONS INJURED'
]

DTYPES = {
    'BOROUGH': 'category',
    'ON STREET NAME': 'category',
    'COLLISION_ID': 'int32',
    'NUMBER OF PERSONS INJURED': 'float32'
}

df = pd.read_csv(
    DATA_PATH,
    encoding='utf-8-sig',
    low_memory=True,
    usecols=USE_COLUMNS,
    dtype=DTYPES
)

# Clean date/time
df['CRASH DATE'] = pd.to_datetime(df['CRASH DATE'], errors='coerce')
df['CRASH TIME'] = pd.to_datetime(df['CRASH TIME'], format='%H:%M', errors='coerce').dt.hour

# 1. Top 10 Streets
summary = (
    df[df['ON STREET NAME'].notna()]
    .groupby('ON STREET NAME')
    .agg({
        'COLLISION_ID': 'count',
        'NUMBER OF PERSONS INJURED': 'sum'
    })
    .reset_index()
    .rename(columns={
        'ON STREET NAME': 'Street Name',
        'COLLISION_ID': 'Number of Crashes',
        'NUMBER OF PERSONS INJURED': 'Number of Injuries'
    })
    .sort_values(by='Number of Crashes', ascending=False)
    .head(10)
)

@crash_data_blueprint.route('/summary')
def get_summary():
    return jsonify(summary.to_dict(orient='records'))

# 2. Monthly Crash Trends
@crash_data_blueprint.route('/trends')
def get_trends():
    trend = df[df['CRASH DATE'].notna()].copy()
    trend['YearMonth'] = trend['CRASH DATE'].dt.to_period('M').astype(str)
    result = trend.groupby('YearMonth').size().reset_index(name='Crashes')
    return jsonify(result.to_dict(orient='records'))

# 3. Injuries by Borough
@crash_data_blueprint.route('/borough-injuries')
def borough_injuries():
    borough_df = (
        df[df['BOROUGH'].notna()]
        .groupby('BOROUGH')['NUMBER OF PERSONS INJURED']
        .sum()
        .reset_index()
        .rename(columns={'NUMBER OF PERSONS INJURED': 'Injuries'})
    )
    return jsonify(borough_df.to_dict(orient='records'))

# 4. Crashes by Hour of Day
@crash_data_blueprint.route('/hourly-crashes')
def hourly_crashes():
    hourly = (
        df[df['CRASH TIME'].notna()]
        .groupby('CRASH TIME')
        .size()
        .reset_index(name='Crashes')
        .rename(columns={'CRASH TIME': 'Hour'})
        .sort_values('Hour')
    )
    return jsonify(hourly.to_dict(orient='records'))