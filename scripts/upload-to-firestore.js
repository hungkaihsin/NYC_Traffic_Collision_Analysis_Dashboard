/**
 * upload-to-firestore.js
 * 
 * Reads the raw Motor Vehicle Collisions CSV, performs the same aggregations
 * the Flask backend did, and uploads the results to Firestore.
 * 
 * Usage: node scripts/upload-to-firestore.js
 * Requires: npm install firebase-admin csv-parser
 */

const admin = require('firebase-admin');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin with application default credentials
admin.initializeApp({
  projectId: 'nyc-traffic-dashboard',
});

const db = admin.firestore();

const CSV_PATH = path.join(__dirname, '..', 'dataset', 'Motor_Vehicle_Collisions.csv');

async function processCSV() {
  console.log('📖 Reading CSV...');
  
  const rows = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on('data', (row) => {
        rows.push(row);
      })
      .on('end', () => {
        console.log(`✅ Read ${rows.length} rows`);
        resolve(rows);
      })
      .on('error', reject);
  });
}

function computeAggregations(rows) {
  console.log('🔄 Computing aggregations...');

  // ─── 1. Top 10 Streets ──────────────────────────
  const streetMap = {};
  for (const row of rows) {
    const street = row['ON STREET NAME'];
    if (!street || street.trim() === '') continue;
    if (!streetMap[street]) {
      streetMap[street] = { crashes: 0, injuries: 0 };
    }
    streetMap[street].crashes += 1;
    streetMap[street].injuries += parseFloat(row['NUMBER OF PERSONS INJURED'] || 0);
  }
  
  const summary = Object.entries(streetMap)
    .map(([name, stats]) => ({
      'Street Name': name,
      'Number of Crashes': stats.crashes,
      'Number of Injuries': Math.round(stats.injuries),
    }))
    .sort((a, b) => b['Number of Crashes'] - a['Number of Crashes'])
    .slice(0, 10);

  console.log('  ✓ Top 10 Streets computed');

  // ─── 2. Monthly Crash Trends ────────────────────
  const trendMap = {};
  for (const row of rows) {
    const dateStr = row['CRASH DATE'];
    if (!dateStr) continue;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) continue;
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    trendMap[yearMonth] = (trendMap[yearMonth] || 0) + 1;
  }
  
  const trends = Object.entries(trendMap)
    .map(([ym, count]) => ({ YearMonth: ym, Crashes: count }))
    .sort((a, b) => a.YearMonth.localeCompare(b.YearMonth));

  console.log('  ✓ Monthly Trends computed');

  // ─── 3. Injuries by Borough ─────────────────────
  const boroughMap = {};
  for (const row of rows) {
    const borough = row['BOROUGH'];
    if (!borough || borough.trim() === '') continue;
    boroughMap[borough] = (boroughMap[borough] || 0) + parseFloat(row['NUMBER OF PERSONS INJURED'] || 0);
  }

  const boroughInjuries = Object.entries(boroughMap)
    .map(([name, injuries]) => ({ BOROUGH: name, Injuries: Math.round(injuries) }));

  console.log('  ✓ Borough Injuries computed');

  // ─── 4. Crashes by Hour of Day ──────────────────
  const hourMap = {};
  for (const row of rows) {
    const timeStr = row['CRASH TIME'];
    if (!timeStr) continue;
    const hour = parseInt(timeStr.split(':')[0], 10);
    if (isNaN(hour)) continue;
    hourMap[hour] = (hourMap[hour] || 0) + 1;
  }

  const hourlyCrashes = Object.entries(hourMap)
    .map(([hour, count]) => ({ Hour: parseInt(hour), Crashes: count }))
    .sort((a, b) => a.Hour - b.Hour);

  console.log('  ✓ Hourly Crashes computed');

  // ─── 5. Compute total stats for StatCards ───────
  let totalCrashes = rows.length;
  let totalInjuries = 0;
  for (const row of rows) {
    totalInjuries += parseFloat(row['NUMBER OF PERSONS INJURED'] || 0);
  }

  // Top borough by injuries
  const topBorough = boroughInjuries.reduce((max, b) => b.Injuries > max.Injuries ? b : max, boroughInjuries[0]);
  
  // Peak hour
  const peakHour = hourlyCrashes.reduce((max, h) => h.Crashes > max.Crashes ? h : max, hourlyCrashes[0]);

  const stats = {
    totalCrashes,
    totalInjuries: Math.round(totalInjuries),
    topBorough: topBorough.BOROUGH,
    topBoroughInjuries: topBorough.Injuries,
    peakHour: peakHour.Hour,
    peakHourCrashes: peakHour.Crashes,
  };

  console.log('  ✓ Summary stats computed');

  return { summary, trends, boroughInjuries, hourlyCrashes, stats };
}

async function uploadToFirestore(data) {
  console.log('☁️  Uploading to Firestore...');

  const dashboardRef = db.collection('dashboard');

  await dashboardRef.doc('summary').set({ data: data.summary });
  console.log('  ✓ summary uploaded');

  await dashboardRef.doc('trends').set({ data: data.trends });
  console.log('  ✓ trends uploaded');

  await dashboardRef.doc('boroughInjuries').set({ data: data.boroughInjuries });
  console.log('  ✓ boroughInjuries uploaded');

  await dashboardRef.doc('hourlyCrashes').set({ data: data.hourlyCrashes });
  console.log('  ✓ hourlyCrashes uploaded');

  await dashboardRef.doc('stats').set({ data: data.stats });
  console.log('  ✓ stats uploaded');

  console.log('\n🎉 All data uploaded to Firestore successfully!');
}

async function main() {
  try {
    const rows = await processCSV();
    const aggregations = computeAggregations(rows);
    await uploadToFirestore(aggregations);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

main();
