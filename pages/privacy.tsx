import RootLayout from "./layout";

export default function PrivacyPage() {
  return (
    <RootLayout>
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: June 3, 2025</p>

      <p className="mb-4">
        This Privacy Policy explains how VaultMeet ("we", "us", or "our") collects, uses, and discloses your information when you use our platform.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Personal identifiers (e.g. name, email, gender, preferences)</li>
        <li>Usage data (e.g. pages visited, form submissions)</li>
        <li>Cookies and tracking technologies</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use your information to:
        <ul className="list-disc list-inside ml-5 mt-2 space-y-1">
          <li>Provide and improve our matching services</li>
          <li>Send important updates</li>
          <li>Ensure platform safety and compliance</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Sharing Your Information</h2>
      <p className="mb-4">
        We do not sell your personal data. We may share it with service providers (like email services) under strict confidentiality agreements.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Your Rights</h2>
      <p className="mb-4">
        You have the right to request access, correction, or deletion of your data. Contact us at <a href="/contact" className="text-blue-600 underline">/contact</a>.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this policy. We will notify you via the platform if we make significant changes.
      </p>
    </main>
    </RootLayout>
    
  );
}