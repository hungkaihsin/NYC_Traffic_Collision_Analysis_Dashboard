import Plot from 'react-plotly.js';

function ChartCard({ title, data, layout }) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <Plot
        data={data}
        layout={{ ...layout, autosize: true }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
}

export default ChartCard;