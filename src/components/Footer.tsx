import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/footer.css";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id: string) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <footer className="footer-glass">
      <div className="glass-box">
        <div className="brand">
          <h3>Xanthos Pizza & Grill</h3>
          <p>© {new Date().getFullYear()} Starpack APS — MKaan</p>
        </div>
        <div className="glass-links">
          <button onClick={() => handleScroll("about")}>Om os</button>
          <button onClick={() => handleScroll("contact")}>Kontakt</button>
          <Link to="/privacypolicy">Privacy Policy</Link>
        </div>
        {/* <button
          onClick={resetAndUploadMenu}
          style={{ background: "red", color: "white", padding: "10px" }}
        >
          ⚠️ RESET AND UPDATE DATABASE - Verify menu sync
        </button> */}
      </div>
    </footer>
  );
}
