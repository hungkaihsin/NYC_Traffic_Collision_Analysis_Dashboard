import { FaGithub } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="footer-content">
        <span>© 2026 Daniel Hung. Built with React & Plotly.js</span>
        <div className="footer-links">
          <a
            href="https://data.cityofnewyork.us/Public-Safety/Motor-Vehicle-Collisions-Crashes/h9gi-nx95"
            target="_blank"
            rel="noopener noreferrer"
          >
            NYC OpenData
          </a>
          <span className="footer-divider">·</span>
          <a
            href="https://github.com/hungkaihsin/traffic_analyze"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub style={{ marginRight: 4, verticalAlign: 'middle' }} />
            Source
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;