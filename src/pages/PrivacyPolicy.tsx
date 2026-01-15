import "../styles/global.css";

export default function PrivacyPolicy() {
  return (
    <main className="privacy-policy-page">
      <div className="privacy-policy-container">
        <h1 className="privacy-policy-title">Privatlivspolitik</h1>
        
        <p className="privacy-policy-updated">
          Sidst opdateret: {new Date().toLocaleDateString("da-DK", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </p>

        <div className="privacy-policy-content">
          <section className="privacy-section">
            <p className="privacy-intro">
              Denne privatlivspolitik forklarer, hvordan Xanthos Pizza & Grill ("vi", "os" eller "vores") 
              indsamler, bruger og beskytter dine personoplysninger, når du bruger vores hjemmeside og 
              bestiller gennem vores tjenester. Vi respekterer dit privatliv og er forpligtet til at 
              beskytte dine personoplysninger i overensstemmelse med GDPR (Generel Dataforordning).
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">1. Hvilke oplysninger indsamler vi?</h2>
            <p>Vi indsamler kun de oplysninger, der er nødvendige for at behandle og levere din bestilling:</p>
            <ul className="privacy-list">
              <li><strong>Kontaktoplysninger:</strong> Navn, telefonnummer, e-mailadresse og leveringsadresse</li>
              <li><strong>Bestillingsoplysninger:</strong> Detaljer om dine bestilte produkter, antal og særlige instruktioner</li>
              <li><strong>Betalingsoplysninger:</strong> Betalingsmetode (kort eller MobilePay) - betalingsoplysninger behandles sikkert af vores betalingsudbyder og gemmes aldrig på vores servere</li>
              <li><strong>Tekniske oplysninger:</strong> IP-adresse, browser-type og enhedsoplysninger (automatisk indsamlet)</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">2. Hvordan bruger vi dine oplysninger?</h2>
            <p>Vi bruger dine personoplysninger til følgende formål:</p>
            <ul className="privacy-list">
              <li>At behandle og levere din bestilling</li>
              <li>At kommunikere med dig vedrørende din bestilling (bekræftelse, opdateringer, problemer)</li>
              <li>At håndtere betalinger gennem vores betalingsudbydere</li>
              <li>At opfylde juridiske forpligtelser (f.eks. regnskabsføring)</li>
              <li>At forbedre vores tjenester og brugeroplevelse</li>
              <li>At håndtere klager og henvendelser</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">3. Cookies og lokal lagring</h2>
            <p>
              Vi bruger ikke tracking- eller marketingcookies. Vi bruger kun nødvendige cookies og 
              lokal lagring for at sikre, at hjemmesiden fungerer korrekt:
            </p>
            <ul className="privacy-list">
              <li><strong>Session cookies:</strong> For at huske din indkøbskurv under din besøg</li>
              <li><strong>Lokal lagring:</strong> For at gemme din kurv, så den ikke forsvinder, hvis du lukker browseren</li>
              <li><strong>Produktcache:</strong> For at forbedre indlæsningstiden ved at cache produktdata lokalt</li>
            </ul>
            <p>
              Du kan til enhver tid slette cookies og lokal lagring gennem dine browserindstillinger. 
              Dette kan påvirke funktionaliteten af hjemmesiden.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">4. Deling af oplysninger</h2>
            <p>Vi deler kun dine oplysninger med:</p>
            <ul className="privacy-list">
              <li><strong>Betalingsudbydere:</strong> For at behandle betalinger (kortoplysninger behandles sikkert og gemmes ikke hos os)</li>
              <li><strong>Leveringspartnere:</strong> Hvis du vælger levering, deler vi din adresse med vores leveringspartner</li>
              <li><strong>Juridiske myndigheder:</strong> Hvis det er påkrævet ved lov eller retslig ordre</li>
            </ul>
            <p>
              Vi sælger eller udlejer aldrig dine personoplysninger til tredjeparter til markedsføringsformål.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">5. Databehandling og opbevaring</h2>
            <p>
              Vi opbevarer dine personoplysninger kun så længe, det er nødvendigt for at:
            </p>
            <ul className="privacy-list">
              <li>Opfylde din bestilling og levere tjenesten</li>
              <li>Opfylde juridiske forpligtelser (f.eks. regnskabsføring i 5 år)</li>
              <li>Håndtere eventuelle klager eller retskrav</li>
            </ul>
            <p>
              Efter opbevaringsperioden slettes eller anonymiseres dine personoplysninger sikkert.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">6. Dine rettigheder</h2>
            <p>I henhold til GDPR har du følgende rettigheder:</p>
            <ul className="privacy-list">
              <li><strong>Ret til indsigt:</strong> Du kan anmode om at se, hvilke personoplysninger vi har om dig</li>
              <li><strong>Ret til berigtigelse:</strong> Du kan anmode om rettelse af forkerte eller ufuldstændige oplysninger</li>
              <li><strong>Ret til sletning:</strong> Du kan anmode om sletning af dine personoplysninger (med visse undtagelser)</li>
              <li><strong>Ret til dataportabilitet:</strong> Du kan anmode om at modtage dine data i et struktureret format</li>
              <li><strong>Ret til indsigelse:</strong> Du kan gøre indsigelse mod behandling af dine personoplysninger</li>
              <li><strong>Ret til begrænsning:</strong> Du kan anmode om begrænsning af behandlingen af dine oplysninger</li>
            </ul>
            <p>
              For at udøve disse rettigheder, kontakt os på{" "}
              <a href="mailto:info@xanthospizza.dk" className="privacy-link">
                info@xanthospizza.dk
              </a>
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">7. Datasikkerhed</h2>
            <p>
              Vi implementerer passende tekniske og organisatoriske foranstaltninger for at beskytte 
              dine personoplysninger mod uautoriseret adgang, tab, ødelæggelse eller ændring:
            </p>
            <ul className="privacy-list">
              <li>Krypteret datatransmission (HTTPS/SSL)</li>
              <li>Sikker betalingsbehandling gennem certificerede betalingsudbydere</li>
              <li>Begrænset adgang til personoplysninger (kun autoriseret personale)</li>
              <li>Regelmæssige sikkerhedsopdateringer og -revisioner</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">8. Børns privatliv</h2>
            <p>
              Vores tjenester er ikke målrettet børn under 18 år. Vi indsamler bevidst ikke 
              personoplysninger fra børn. Hvis du er forælder eller værge og opdager, at dit barn 
              har givet os personoplysninger, kontakt os, så vi kan slette disse oplysninger.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">9. Ændringer i privatlivspolitikken</h2>
            <p>
              Vi kan opdatere denne privatlivspolitik fra tid til tid. Væsentlige ændringer vil 
              blive meddelt på hjemmesiden eller via e-mail. Vi opfordrer dig til at gennemgå 
              denne side jævnligt for at holde dig informeret om, hvordan vi beskytter dine oplysninger.
            </p>
          </section>

          <section className="privacy-section">
            <h2 className="privacy-section-title">10. Kontakt os</h2>
            <p>
              Hvis du har spørgsmål, bekymringer eller ønsker at udøve dine rettigheder vedrørende 
              denne privatlivspolitik, kan du kontakte os:
            </p>
            <div className="privacy-contact">
              <p><strong>Xanthos Pizza & Grill</strong></p>
              <p>E-mail: <a href="mailto:info@xanthospizza.dk" className="privacy-link">info@xanthospizza.dk</a></p>
              <p>Telefon: <a href="tel:+4570123456" className="privacy-link">70 12 34 56</a></p>
            </div>
            <p>
              Du har også ret til at klage til Datatilsynet, hvis du mener, at vi behandler dine 
              personoplysninger i strid med gældende lovgivning.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
