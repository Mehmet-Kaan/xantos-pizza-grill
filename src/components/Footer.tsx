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
          <a href="/om-os">Om os</a>
          <a href="/kontakt">Kontakt</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
