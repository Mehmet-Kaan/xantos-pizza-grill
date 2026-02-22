import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin"); // redirect after login
    } catch (err: any) {
      setError("Forkert email eller adgangskode.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        {/* Left side image */}
        <div className="admin-login-image">
          <div className="admin-login-overlay">
            <div className="admin-login-badge">🔐 Secure Admin Portal</div>

            <h1>Xantos Admin</h1>
            <p className="admin-login-subtitle">
              Administrer menu, kategorier og produkter på ét samlet sted.
            </p>

            <ul className="admin-login-features">
              <li>✔ Opdater produkter og priser</li>
              <li>✔ Administrer kategorier</li>
              <li>✔ Realtidsændringer på hjemmesiden</li>
              <li>✔ Hurtig og sikker adgang</li>
            </ul>

            <div className="admin-login-divider" />

            <div className="admin-login-info">
              <p>
                Få fuld kontrol over indhold, kampagner og synlighed. Alle
                ændringer opdateres øjeblikkeligt.
              </p>
            </div>
          </div>
        </div>

        {/* Right side form */}
        <div className="admin-login-form-container">
          <div>
            <h2>Velkommen tilbage 👋</h2>
            <p className="login-subtext">
              Log ind for at få adgang til admin panelet.
            </p>
          </div>

          {error && <p className="error-text">{error}</p>}

          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Adgangskode"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Logger ind..." : "Log ind"}
            </button>
          </form>

          <div className="login-footer">
            <small>Kun autoriserede brugere har adgang.</small>
          </div>
        </div>
      </div>
    </div>
  );
}
