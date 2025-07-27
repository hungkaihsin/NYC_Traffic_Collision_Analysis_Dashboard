import { useEffect, useState } from 'react';
import axios from 'axios';
import './CrashOverview.css';

function CrashOverview() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/summary')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="crash-overview-container fadeUp delay-2">
      <h2 className="crash-overview-title">Top Crash Streets</h2>
      <ul className="crash-list">
        {data.map((item, idx) => (
          <li key={idx} className="crash-item">
            <strong>{item['Street Name']}</strong> : {item['Number of Crashes']} crashes, {item['Number of Injuries']} injuries
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrashOverview;