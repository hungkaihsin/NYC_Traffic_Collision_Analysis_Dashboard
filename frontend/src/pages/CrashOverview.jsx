import { useEffect, useState } from 'react';
import axios from 'axios';

function CrashOverview() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/summary')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Top Crash Streets</h2>
      <ul>
        {data.map((item, idx) => (
          <li key={idx}>
            {item['Street Name']}: {item['Number of Crashes']} crashes, {item['Number of Injuries']} injuries
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CrashOverview;