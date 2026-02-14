import "../styles/global.css";
import "../styles/privacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <main className="privacy-policy-page">
      <div className="privacy-policy-container">
        <h1 className="privacy-policy-title">Privatlivspolitik</h1>

        <p className="privacy-policy-updated">
          Sidst opdateret:{" "}
          {new Date().toLocaleDateString("da-DK", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="privacy-policy-content">
          <section className="privacy-section">
            <p className="privacy-intro">
              Denne privatlivspolitik forklarer, hvordan{" "}
              <strong>Xanthos Pizza & Grill</strong> ("vi", "os" eller "vores")
              indsamler og beskytter dine personoplysninger. Vi overholder den
              europæiske persondataforordning (GDPR).
            </p>
          </section>
          {/* 
          <section className="privacy-section">
            <h2 className="privacy-section-title">
              1. Indsamling af oplysninger
            </h2>
            <p>Vi indsamler oplysninger, når du foretager en bestilling:</p>
            <ul className="privacy-list">
              <li>
                <strong>Identifikation:</strong> Navn og e-mailadresse.
              </li>
              <li>
                <strong>Levering:</strong> Telefonnummer og adresse (kun ved
                udbringning).
              </li>
              <li>
                <strong>Betaling:</strong> Vi gemmer <em>aldrig</em>{" "}
                kortoplysninger. Disse håndteres direkte af vores partner,{" "}
                <strong>Stripe</strong>.
              </li>
              <li>
                <strong>Teknisk:</strong> IP-adresse og browserdata via Google
                Analytics/Ads for at forbedre din oplevelse.
              </li>
            </ul>
          </section> */}
          <section className="privacy-section">
            <h2 className="privacy-section-title">
              1. Indsamling af oplysninger
            </h2>
            <p>
              Vi indsamler kun de oplysninger, der er nødvendige for at behandle
              og levere din bestilling. Herunder kan du se, hvad vi indsamler,
              og hvorfor det er nødvendigt:
            </p>

            <div className="justification-grid">
              <div className="justification-item">
                <strong>Navn:</strong>
                <p>
                  For at vi ved, hvem vi skal give pizzaen til, når du henter
                  den eller får den leveret.
                </p>
              </div>

              <div className="justification-item">
                <strong>E-mail:</strong>
                <p>
                  Bruges til at sende din ordrebekræftelse og din kvittering
                  automatisk via Resend.
                </p>
              </div>

              <div className="justification-item">
                <strong>Telefonnummer:</strong>
                <p>
                  Bruges hvis buddet ikke kan finde din adresse, eller hvis
                  køkkenet har spørgsmål til din bestilling.
                </p>
              </div>

              <div className="justification-item">
                <strong>Leveringsadresse:</strong>
                <p>
                  Kun nødvendig ved udbringning, så vores chauffør kan finde vej
                  til din dør.
                </p>
              </div>

              <div className="justification-item">
                <strong>Betaling:</strong>
                <p>
                  Håndteres sikkert af Stripe. Vi gemmer aldrig dine
                  kortoplysninger på vores egne servere.
                </p>
              </div>

              <div className="justification-item">
                <strong>Teknisk:</strong>
                <p>
                  IP-adresse og enhedsdata indsamles via Google for at forbedre
                  sikkerheden og brugeroplevelsen.
                </p>
              </div>
            </div>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">
              2. Tredjepartsudbydere (Databehandlere)
            </h2>
            <p>
              For at drive vores webshop deler vi nødvendige data med følgende
              partnere:
            </p>
            <ul className="privacy-list">
              <li>
                <strong>Google Firebase:</strong> Hosting af hjemmesiden og
                sikker opbevaring af ordredata.
              </li>
              <li>
                <strong>Stripe:</strong> Sikker behandling af dine betalinger.
              </li>
              <li>
                <strong>Resend:</strong> Udsendelse af ordrebekræftelser via
                e-mail.
              </li>
              <li>
                <strong>Google Ads/Analytics:</strong> Optimering af vores
                markedsføring og brugervenlighed.
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">3. Cookies og Sporing</h2>
            <p>
              Vi bruger nødvendige cookies til din indkøbskurv og funktionelle
              cookies fra Google for at forstå, hvordan vores hjemmeside bliver
              brugt. Du kan altid slette cookies i dine browserindstillinger.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">4. Opbevaring og Sletning</h2>
            <p>
              Vi gemmer dine ordredata i det tidsrum, det er nødvendigt for at
              overholde den danske bogføringslov (typisk 5 år). Du har til
              enhver tid ret til at få indsigt i, hvilke data vi har om dig,
              eller bede om at få dem slettet.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">5. Kontakt os</h2>
            <div className="privacy-contact">
              <p>
                <strong>Xanthos Pizza & Grill</strong>
              </p>
              <p>Algade 16, 4760 Vordingborg</p>
              <p>
                E-mail:{" "}
                <a href="mailto:info@xantospizza.dk" className="privacy-link">
                  info@xantospizza.dk
                </a>
              </p>
              <p>CVR: [Indsæt dit CVR nr her]</p>
            </div>
            <p style={{ marginTop: "20px", fontSize: "14px", color: "#666" }}>
              Du kan også klage over vores behandling af dine oplysninger til{" "}
              <strong>Datatilsynet</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
