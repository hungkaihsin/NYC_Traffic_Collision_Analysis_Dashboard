# NYC Traffic Collision Analysis Dashboard

> A data-driven interactive dashboard analyzing **2.15 million** motor vehicle collisions across New York City — uncovering crash trends, high-risk corridors, and actionable safety insights through dynamic visualizations.

🔗 **[Live Demo](https://nyc-traffic-dashboard.web.app)**

## Tech Stack

![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E)
![Python](https://img.shields.io/badge/Language-Python-3776AB)
![React](https://img.shields.io/badge/Frontend-React_19-61DAFB)
![Vite](https://img.shields.io/badge/Build-Vite_7-646CFF)
![Plotly.js](https://img.shields.io/badge/Visualization-Plotly.js-3F4F75)
![Pandas](https://img.shields.io/badge/Processing-Pandas-150458)
![Firebase](https://img.shields.io/badge/Hosting-Firebase-FFCA28)
![CSS3](https://img.shields.io/badge/Styling-CSS3-1572B6)

## Key Features

- **At-a-Glance Statistics:** Summary cards displaying total crashes, injuries, most affected borough, and peak hour — computed from 2.15M+ records.
- **Interactive Plotly Visualizations:** Four dynamic charts — top crash-prone streets, monthly crash trends with area fill, borough injury distribution (donut chart), and hourly crash heatmap.
- **Data-Driven Insights:** Curated analysis section highlighting the most dangerous corridors, rush-hour patterns, and actionable safety recommendations.
- **Dark / Light Theme:** Premium theme toggle with persistent preference, smooth CSS transitions, and fully responsive Plotly chart theming.
- **Zero-Backend Architecture:** Pre-aggregated static JSON data served via Firebase CDN — eliminating server costs and achieving sub-100ms load times.

## Results & Performance

- **2.15M Records Processed:** Ingested and cleaned the full NYC OpenData Motor Vehicle Collisions dataset (2012–2025) using Pandas, reducing it to 5 optimized JSON payloads totaling < 200 KB.
- **Sub-100ms Data Load:** Static JSON served from Firebase's global CDN achieves near-instant data hydration — no cold-start delays compared to the original Flask backend on Render.
- **100% Uptime, Zero Cost:** Firebase Hosting on the free Spark plan provides SSL, CDN, and custom domain support with no monthly charges.
- **Responsive Across Devices:** Fully adaptive layout from mobile (320px) to ultrawide (2560px+), with sidebar auto-collapse and grid reflow at 3 breakpoints.

## Architecture

```
┌────────────────────────────────────────────────────┐
│  NYC OpenData — Motor Vehicle Collisions (CSV)     │
│  2.15M rows · 29 columns · ~450 MB                │
└─────────────────────┬──────────────────────────────┘
                      │  Python / Pandas (one-time ETL)
                      ▼
┌────────────────────────────────────────────────────┐
│  Static JSON (public/data/)                        │
│  summary · trends · borough-injuries               │
│  hourly-crashes · stats                  < 200 KB  │
└─────────────────────┬──────────────────────────────┘
                      │  fetch() from React
                      ▼
┌────────────────────────────────────────────────────┐
│  React + Vite Frontend                             │
│  Plotly.js Charts · StatCards · Dark/Light Theme   │
└─────────────────────┬──────────────────────────────┘
                      │  firebase deploy
                      ▼
┌────────────────────────────────────────────────────┐
│  Firebase Hosting (Global CDN + SSL)               │
│  https://nyc-traffic-dashboard.web.app             │
└────────────────────────────────────────────────────┘
```

## Data Insights

| Metric | Finding |
|--------|---------|
| **Most Dangerous Street** | Broadway — 15,000+ collisions, driven by complex intersections and heavy pedestrian traffic near Times Square |
| **Highest Injury Corridor** | Belt Parkway — disproportionately high injury-to-crash ratio, indicating more severe high-speed accidents |
| **Peak Crash Hour** | 4:00 PM (16:00) — afternoon rush-hour congestion accounts for the single highest hourly crash volume |
| **Most Affected Borough** | Brooklyn — 35.9% of all citywide injuries, followed by Queens at 27.5% |
| **COVID-19 Impact** | ~50% crash reduction in 2020, with a gradual but incomplete recovery through 2025 |

## How to Run

### 1. Local Development

```bash
# Clone the repository
git clone https://github.com/hungkaihsin/traffic_analyze.git
cd traffic_analyze/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Deploy to Firebase

```bash
# Build production bundle
cd frontend && npm run build

# Deploy to Firebase Hosting
cd .. && firebase deploy --only hosting
```

<details>
<summary>Click to view data re-processing instructions</summary>

### Re-processing the Dataset (Optional)

If you want to update with the latest NYC OpenData:

1. Download the CSV from [NYC OpenData – Motor Vehicle Collisions](https://data.cityofnewyork.us/Public-Safety/Motor-Vehicle-Collisions-Crashes/h9gi-nx95)
2. Place it as `dataset/Motor_Vehicle_Collisions.csv`
3. Install dependencies: `pip install pandas`
4. Run the processing script to regenerate the JSON files in `frontend/public/data/`
5. Rebuild and redeploy: `cd frontend && npm run build && cd .. && firebase deploy --only hosting`

</details>

## Power BI Dashboard

A complementary analysis was built in Power BI, presenting the same key metrics in a professional BI tool format.

📊 [NYC Traffic Data Analytics – Power BI (PDF)](./NYC%20Traffic%20Data%20Analytics%20-%20Power%20BI.pdf)

## Contact

**Kai-Hsin (Daniel) Hung** — [k_hung2@u.pacific.edu](mailto:k_hung2@u.pacific.edu) | [LinkedIn](https://www.linkedin.com/in/kai-hsin-hung/)


