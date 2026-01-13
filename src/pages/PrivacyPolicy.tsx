export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4 text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <section className="space-y-4">
        <p>
          This Privacy Policy explains how Xantos Pizza & Grill (“we”, “us”, or
          “our”) collects and uses personal data when you use our website.
        </p>

        <h2 className="text-xl font-semibold">1. Information We Collect</h2>
        <p>
          We only collect information necessary to process your order, such as
          your name, phone number, address, and order details.
        </p>
        <p>
          Payment information is handled securely by our payment provider and is
          never stored on our servers.
        </p>

        <h2 className="text-xl font-semibold">
          2. How We Use Your Information
        </h2>
        <p>
          Your information is used only to process and deliver your order or to
          contact you if there is an issue with your order.
        </p>

        <h2 className="text-xl font-semibold">3. Cookies and Local Storage</h2>
        <p>
          We do not use tracking or marketing cookies. Local storage may be used
          to store necessary information such as your cart contents to ensure
          the website functions correctly.
        </p>

        <h2 className="text-xl font-semibold">4. Data Sharing</h2>
        <p>
          We only share data with trusted third parties when necessary to
          complete your order, such as payment providers.
        </p>

        <h2 className="text-xl font-semibold">5. Data Retention</h2>
        <p>
          Personal data is kept only for as long as necessary to fulfill your
          order and comply with legal obligations.
        </p>

        <h2 className="text-xl font-semibold">6. Your Rights</h2>
        <p>
          You have the right to access, correct, or request deletion of your
          personal data in accordance with GDPR.
        </p>

        <h2 className="text-xl font-semibold">7. Contact</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us at:
        </p>
        <p className="font-medium">info@xantospizza.se</p>
      </section>
    </div>
  );
}
