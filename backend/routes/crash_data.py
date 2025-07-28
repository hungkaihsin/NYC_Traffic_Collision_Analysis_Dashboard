from flask import Blueprint, jsonify
import pandas as pd

crash_data_blueprint = Blueprint('crash_data', __name__)

# Load and clean CSV
df = pd.read_csv(
    'dataset/Motor_Vehicle_Collisions_-_Crashes_20250123.csv',
    encoding='utf-8-sig',
    low_memory=False
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

