import './CrashOverview.css';

function CrashOverview() {
  return (
    <div className="dashboard-container fadeUp delay-2">
      <h1 className="dashboard-title">Traffic Data Dashboard</h1>
      <div className="chart-grid">
        <div className="chart-card">Chart 1</div>
        <div className="chart-card">Chart 2</div>
        <div className="chart-card">Chart 3</div>
        <div className="chart-card">Chart 4</div>
      </div>
    </div>
  );
}

export default CrashOverview;