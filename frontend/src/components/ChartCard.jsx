import Plot from 'react-plotly.js';

function ChartCard({ title, data, layout }) {
  return (
    <div className="chart-card-modern">
      <Plot
        data={data}
        layout={{
          ...layout,
          title: {
            text: title,
            font: { size: 18 },
            x: 0.5,
            xanchor: 'center'
          },
          autosize: true
        }}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default ChartCard;