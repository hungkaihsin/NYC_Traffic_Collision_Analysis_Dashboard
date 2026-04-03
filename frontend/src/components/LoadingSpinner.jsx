import './LoadingSpinner.css';

function LoadingSpinner({ count = 4 }) {
  return (
    <div className="loading-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card" style={{ animationDelay: `${i * 0.1}s` }}>
          <div className="skeleton-title" />
          <div className="skeleton-chart" />
        </div>
      ))}
    </div>
  );
}

export default LoadingSpinner;
