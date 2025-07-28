import Plot from 'react-plotly.js';

function ChartCard({ title, data, layout }) {
  return (
    <div className="chart-card">
      <Plot
        data={data}
        layout={{
          ...layout,
          title: {
            text: title,
            font: { size: 18 },
            x: 0.5, // center
            xanchor: 'center'
          },
          autosize: true
        }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
}

export default ChartCard;