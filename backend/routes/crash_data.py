from flask import Blueprint, jsonify
import pandas as pd

crash_data_blueprint = Blueprint('crash_data', __name__)

# Load and clean CSV
df = pd.read_csv(
    'dataset/Motor_Vehicle_Collisions_-_Crashes_20250123.csv',
    encoding='utf-8-sig',
    low_memory=False
)

# Optional: print columns for verification

# Filter out missing street names
df = df[df['ON STREET NAME'].notna()]

# Group and summarize crash data
summary = (
    df.groupby('ON STREET NAME')
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