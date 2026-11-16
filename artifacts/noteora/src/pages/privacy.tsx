import { PublicLayout } from "@/components/layout/PublicLayout";

const SECTIONS = [
  {
    title: "1. Who We Are",
    body: `Noteora is operated by Noteora, Inc., a Delaware corporation and a product of AGT Venture, headquartered at 548 Market St, Suite 1200, San Francisco, CA 94104, United States ("Noteora", "we", "us", or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website at noteora.com or use our platform (collectively, the "Service").`,
  },
  {
    title: "2. Information We Collect",
    body: `We collect information you provide directly to us, including name, email address, company name, billing information, and any data you upload to the Service. We also collect information automatically, such as IP addresses, browser type, pages viewed, referring URLs, and device identifiers through the use of cookies and similar tracking technologies. We do not sell, trade, or rent your personal data to third parties.`,
  },
  {
    title: "3. How We Use Your Information",
    body: `We use the information we collect to provide, maintain, and improve the Service; process transactions and send related information including purchase confirmations and invoices; send technical notices, updates, security alerts, and support messages; respond to your comments, questions, and requests; send marketing communications, such as news about products and services offered by Noteora (you may opt out at any time); monitor and analyse trends, usage, and activities in connection with our Service; and detect, investigate, and prevent fraudulent transactions and other illegal activities.`,
  },
  {
    title: "4. Data Storage & Security",
    body: `Your data is stored on servers located in the United States and the European Union. We use industry-standard security measures including TLS encryption in transit, AES-256 encryption at rest, row-level security in our database, and SOC 2 Type II compliant infrastructure. We conduct regular penetration tests and security audits. Despite these measures, no transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "5. Data Retention",
    body: `We retain your personal information for as long as your account is active or as needed to provide you with the Service. You may request deletion of your account and associated data at any time by contacting us at privacy@noteora.com. We will delete or anonymise your information within 30 days of receiving your verified request, unless we are required to retain it for legal or compliance reasons.`,
  },
  {
    title: "6. Sharing of Information",
    body: `We may share your personal information with: (a) Service providers who perform services on our behalf, such as payment processing (Stripe), cloud hosting (AWS), and authentication (Clerk); (b) Professional advisors, including lawyers, auditors, and insurers; (c) Law enforcement or regulatory authorities if required by applicable law; (d) Acquirers in the event of a merger, acquisition, or sale of all or a portion of our assets. We require all third parties to maintain appropriate security standards.`,
  },
  {
    title: "7. Your Rights (GDPR / CCPA)",
    body: `Depending on your location, you may have the following rights: the right to access the personal data we hold about you; the right to correct inaccurate data; the right to erasure ("right to be forgotten"); the right to data portability; the right to object to or restrict processing; and the right to lodge a complaint with your local data protection authority. To exercise any of these rights, please contact us at privacy@noteora.com. We will respond within 30 days.`,
  },
  {
    title: "8. Cookies",
    body: `We use cookies and similar tracking technologies to collect and use personal information about you. For more information about the types of cookies we use and how to manage them, please see our Cookie Policy at noteora.com/cookies.`,
  },
  {
    title: "9. Children's Privacy",
    body: `The Service is not directed to individuals under the age of 16. We do not knowingly collect personal information from children under 16. If you become aware that a child has provided us with personal information, please contact us at privacy@noteora.com and we will take steps to delete such information.`,
  },
  {
    title: "10. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of the Service after such changes constitutes your acceptance of the new Privacy Policy.`,
  },
  {
    title: "11. Contact Us",
    body: `If you have any questions about this Privacy Policy or our privacy practices, please contact our Data Protection Officer at: privacy@noteora.com · Noteora, Inc., 548 Market St, Suite 1200, San Francisco, CA 94104, United States.`,
  },
];

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: <strong>January 15, 2026</strong></p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              At Noteora, your privacy is a core commitment — not an afterthought. This policy describes what data we collect, why we collect it, and how we protect it.
            </p>
          </div>

          <div className="space-y-10">
            {SECTIONS.map((s) => (
              <div key={s.title} className="border-t border-border pt-8">
                <h2 className="text-xl font-bold mb-3">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-sm">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-muted/40 border border-border p-8">
            <h3 className="font-bold mb-2">Questions about your data?</h3>
            <p className="text-sm text-muted-foreground">Contact our privacy team at <a href="mailto:privacy@noteora.com" className="text-primary underline">privacy@noteora.com</a> and we'll respond within one business day.</p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
