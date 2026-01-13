import { useEffect, useState } from "react";
import "../styles/cookie-banner.css";

const COOKIE_KEY = "cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <p>We use cookies to improve your experience and analyze traffic.</p>

        <div className="cookie-actions">
          <button className="cookie-decline" onClick={handleDecline}>
            Decline
          </button>
          <button className="cookie-accept" onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
