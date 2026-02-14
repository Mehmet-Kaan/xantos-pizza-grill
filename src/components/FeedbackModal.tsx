import "../styles/FeedbackModal.css";
import { useEffect, useState } from "react";
import { createReview } from "../services/reviewsService";
import confetti from "canvas-confetti";

export default function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0); // For the preview effect
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("service");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Add state at the top of your component
  const [notification, setNotification] = useState<{
    message: string;
    type: "error" | "success" | "loading";
  } | null>(null);

  // 2. Create a helper to show and auto-hide the notification
  const showNotification = (
    message: string,
    type: "error" | "success" | "loading" = "error",
  ) => {
    setNotification({ message, type });
    // Auto-hide after 4 seconds
    if (type !== "loading") {
      setTimeout(() => setNotification(null), 4000);
    }
  };

  useEffect(() => {
    // Disable scroll when modal opens
    document.body.style.overflow = "hidden";

    // Re-enable scroll when modal closes
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    // Clean up the listener when the component unmounts
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Calling your existing helper function
      await createReview({
        author: name,
        mail: email, // Make sure your Review type interface includes 'mail' if you want to store it
        rating,
        text: comment,
        type, // Ensure your Review type interface includes 'type'
      });

      // 1. Fire the Confetti!
      // const colors = ["#c62828", "#f9a825", "#ffffff"]; // Red, Gold, White
      // confetti({
      //   particleCount: 100,
      //   spread: 70,
      //   origin: { y: 0.6 },
      //   colors: colors,
      //   zIndex: 2000,
      // });

      const fireCelebration = () => {
        const end = Date.now() + 2 * 1000; // 2 seconds
        const colors = ["#c62828", "#f9a825"];

        (function frame() {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        })();
      };

      fireCelebration();

      showNotification(
        "Tak! Din anmeldelse er sendt til godkendelse.",
        "success",
      );

      setTimeout(() => {
        onClose();
      }, 4000);
    } catch (error) {
      showNotification("Der opstod en fejl. Prøv venligst igen.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-close-btn">
          <button onClick={onClose} aria-label="Close">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="custom-x-icon"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <h2 className="modal-title">Hvordan var din oplevelse?</h2>

        <form onSubmit={handleSubmit}>
          {/* Star Rating with Hover Logic */}
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={(hover || rating) >= star ? "star active" : "star"}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </button>
            ))}
          </div>

          <div className="feedback-form-group">
            <label className="modal-text">Navn</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>
          {type === "technical" && (
            <div className="feedback-form-group">
              <label className="modal-text">E-mail adresse</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <p className="modal-text">
                We need your email to contact you back.
              </p>
            </div>
          )}

          <div className="feedback-form-group">
            <label className="modal-text">Feedback type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="service">Mad & Service</option>
              <option value="technical">Teknisk fejl</option>
            </select>
          </div>

          <div className="feedback-form-group">
            <label className="modal-text">Besked</label>
            <textarea
              placeholder={
                type === "technical" ? "Beskriv fejlen..." : "Din anmeldelse..."
              }
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Sender..." : "Indsend"}
          </button>
        </form>
      </div>
      {notification && (
        <div className={`notification-overlay ${notification.type}`}>
          <div className="notification-content">
            <div className="notification-icon">
              {notification.type === "loading" ? (
                <div className="notification-spinner"></div>
              ) : notification.type === "success" ? (
                "✅"
              ) : (
                "⚠️"
              )}
            </div>
            <p>{notification.message}</p>

            {/* {notification.type !== "loading" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setNotification(null);
                }}
                className="notification-close"
              >
                Forstået
              </button>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}
