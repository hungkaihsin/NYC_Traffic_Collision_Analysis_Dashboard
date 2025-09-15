# NYC Traffic Collision Analysis Dashboard

[Live demo here](https://traffic-analyze.onrender.com)

The NYC Traffic Collision Analysis Dashboard is a web application that provides an interactive, data-driven view of motor vehicle collisions in New York City. By integrating data analysis, visualization, and API-driven architecture, this tool helps uncover crash trends, identify high-risk areas, and highlight contributing factors to improve road safety.

## About The Project

This project demonstrates the ability to combine data science, web development, and interactive visualization in a real-world setting. It leverages open data from NYC to perform in-depth analysis, then presents the insights in an intuitive dashboard. The backend is powered by Python and Flask, while the frontend uses React with Plotly.js for dynamic visualizations.

## Key Features

- **Interactive Dashboard:** Navigate and explore NYC crash data with user-friendly controls.  
- **Data Visualization:** Visualizes trends, contributing factors, and geographic patterns using interactive charts and maps.  
- **In-Depth Data Analysis:** Processes and analyzes the NYC OpenData Motor Vehicle Collisions dataset to reveal actionable insights.  
- **Backend API:** A Flask-based API serves cleaned and aggregated data to the frontend.  

## Tech Stack

- **Frontend:** React, Vite, Plotly.js, Axios  
- **Backend:** Python, Flask, Pandas  
- **Data Source:** [NYC OpenData – Motor Vehicle Collisions](https://data.cityofnewyork.us/Public-Safety/Motor-Vehicle-Collisions-Crashes/h9gi-nx95)  

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm  
- Python 3.x  

### Installation

1. **Clone the repo**
    ```sh
    git clone https://github.com/your-username/traffic_analyze.git
    ```
2. **Install NPM packages for the frontend**
    ```sh
    cd frontend
    npm install
    ```
3. **Install Python packages for the backend**
    ```sh
    cd ../backend
    pip install -r requirements.txt
    ```

### Usage

1. **Start the backend server**
    ```sh
    cd backend
    python app.py
    ```
2. **Start the frontend development server**
    ```sh
    cd ../frontend
    npm run dev
    ```
3. Open your browser and navigate to `http://localhost:5173` (or the address shown in your terminal).


## Data Insights

The data analysis was performed in a Jupyter Notebook included in the root directory. The notebook covers data cleaning, preprocessing, and visualization steps.

### Highlights:
- **Most Dangerous Streets:** Top 10 crash-prone streets in NYC.  
- **Crash Trends:** Seasonal, daily, and hourly crash patterns.  
- **Contributing Factors:** Most common causes of vehicle collisions.  
- **Vehicle Types:** The vehicle categories most often involved in crashes.  

## Power BI Dashboard

An additional interactive analysis was built using Power BI to complement the Flask + React dashboard.  
The Power BI version highlights the same key metrics (Top 10 crash-prone streets, crash trends, injuries by borough, and hourly crash distribution) in a professional BI tool format.  

You can view the exported dashboard here:  
[📊 NYC Traffic Data Analytics – Power BI (PDF)](./NYC%20Traffic%20Data%20Analytics%20-%20Power%20BI.pdf)

## Contact

Daniel – [k_hung2@u.pacific.edu](mailto:k_hung2@u.pacific.edu)  

Project Link: [https://github.com/hungkaihsin/traffic_analyze](https://github.com/hungkaihsin/traffic_analyze)
