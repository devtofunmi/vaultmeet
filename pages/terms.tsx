import RootLayout from "./layout";

// app/terms/page.tsx
export default function TermsPage() {
  return (
    <RootLayout>
        <main className="text-black max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <p className="mb-4">Effective Date: June 3, 2025</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing VaultMeet, you agree to these Terms and Conditions and our Privacy Policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Platform Eligibility</h2>
      <p className="mb-4">
        Users must be 18+ to use VaultMeet. We reserve the right to reject applications that don’t meet our criteria.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. User Conduct</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>No harassment, solicitation, or illegal activity</li>
        <li>Respect confidentiality of other users</li>
        <li>Impersonation and fraud are strictly prohibited</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Payments & Refunds</h2>
      <p className="mb-4">
        Payments are required before a connection is made. VaultMeet is not responsible for interactions after introductions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Termination</h2>
      <p className="mb-4">
        We reserve the right to ban any user who violates these terms or abuses the platform.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact</h2>
      <p className="mb-4">
        For questions, please reach out via our <a href="/contact" className="text-blue-600 underline">contact page</a>.
      </p>
    </main>
    </RootLayout>
    
  )
}
