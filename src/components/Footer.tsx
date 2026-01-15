import { Link } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer-glass">
      <div className="glass-box">
        <div className="brand">
          <h3>Xanthos Pizza & Grill</h3>
          <p>© {new Date().getFullYear()} Starpack APS — MKaan</p>
        </div>
        <div className="glass-links">
          <Link to="/om-os">Om os</Link>
          <Link to="/kontakt">Kontakt</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
