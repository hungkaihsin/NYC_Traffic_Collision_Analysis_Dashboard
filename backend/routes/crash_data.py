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


# 5. Crashes by Borough
@crash_data_blueprint.route('/by-borough')
def crashes_by_borough():
    result = (
        df[df['BOROUGH'].notna()]
        .groupby('BOROUGH')
        .size()
        .reset_index(name='Crashes')
        .sort_values('Crashes', ascending=False)
    )
    return jsonify(result.to_dict(orient='records'))


# 6. Crashes by Day of Week
@crash_data_blueprint.route('/day-of-week')
def crashes_by_day():
    day_map = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    filtered = df[df['CRASH DATE'].notna()].copy()
    filtered['DayOfWeek'] = filtered['CRASH DATE'].dt.dayofweek
    filtered['DayOfWeek'] = filtered['DayOfWeek'].apply(lambda d: day_map[d])
    result = filtered.groupby('DayOfWeek').size().reset_index(name='Crashes')
    return jsonify(result.to_dict(orient='records'))


# 7. Top 10 Contributing Factors
@crash_data_blueprint.route('/contributing-factors')
def contributing_factors():
    result = (
        df[df['CONTRIBUTING FACTOR VEHICLE 1'].notna()]
        .groupby('CONTRIBUTING FACTOR VEHICLE 1')
        .size()
        .reset_index(name='Count')
        .sort_values('Count', ascending=False)
        .head(10)
    )
    return jsonify(result.to_dict(orient='records'))