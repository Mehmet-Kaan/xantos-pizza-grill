export default function Kontakt() {
  return (
    <main className="max-w-4xl mx-auto p-6">

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-4">Kontakt</h1>
        <p className="mb-4 text-gray-700">
          Har du spørgsmål til allergener, levering, større bestillinger eller
          bare lyst til at bestille over telefonen? Du er altid velkommen til at
          kontakte os.
        </p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Kontaktoplysninger</h2>
          <p className="text-gray-700">
            Telefon: <strong>70 12 34 56</strong>
          </p>
          <p className="text-gray-700">
            E-mail: <strong>info@pizza-grill.dk</strong>
          </p>
          <p className="text-gray-700">
            Adresse: <strong>Hovedgade 123, 1234 By</strong>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Skriv til os</h2>
          <form className="space-y-3">
            <div>
              <label className="block font-semibold mb-1">Navn</label>
              <input className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-semibold mb-1">E-mail</label>
              <input type="email" className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Besked</label>
              <textarea rows={4} className="w-full p-2 border rounded" />
            </div>
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Send besked
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
