import { PublicLayout } from "@/components/layout/PublicLayout";
import { Link } from "wouter";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: `By accessing or using Noteora (the "Service"), you agree to be bound by these Terms of Service ("Terms"). These Terms apply to all visitors, users, and others who access or use the Service. If you disagree with any part of the Terms, you may not access the Service. These Terms constitute a legally binding agreement between you and Noteora, Inc. ("Noteora", "we", "us").`,
  },
  {
    title: "2. Description of Service",
    body: `Noteora is a cloud-based data analytics platform that allows users to import datasets, build visualisations, generate reports, and share insights. The Service is provided on a subscription basis. Features vary by plan (Starter, Pro, Enterprise). We reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice to users.`,
  },
  {
    title: "3. Account Registration",
    body: `To use the Service, you must create an account. You are responsible for safeguarding your password and all activities that occur under your account. You agree to notify us immediately of any unauthorised use of your account. You must be at least 16 years old to create an account. You agree to provide accurate, current, and complete information during registration.`,
  },
  {
    title: "4. Subscription & Billing",
    body: `Paid plans are billed monthly or annually in advance. You authorise us to charge your payment method for all fees due. All fees are non-refundable except as required by law or as explicitly stated in these Terms. We may change our fees at any time with 30 days' advance notice. If you downgrade your plan, changes take effect at the next billing cycle. We reserve the right to suspend accounts with overdue payments after a 14-day grace period.`,
  },
  {
    title: "5. Acceptable Use",
    body: `You agree not to: (a) use the Service for any unlawful purpose; (b) upload data that infringes any third party's intellectual property rights; (c) attempt to gain unauthorised access to any portion of the Service; (d) interfere with the proper functioning of the Service; (e) use automated scripts to collect information from the Service; (f) transmit malware, viruses, or other malicious code; (g) resell or sub-licence the Service without our written permission; or (h) use the Service to store or process sensitive personal data of a special category (such as health data or financial account numbers) without entering into a data processing addendum with us.`,
  },
  {
    title: "6. Intellectual Property",
    body: `The Service and all content, features, and functionality (including but not limited to software, text, displays, images, and the design of the interface) are owned by Noteora, Inc. and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property laws. Your data remains yours. By uploading data to Noteora, you grant us a limited, non-exclusive licence to process that data solely to provide you with the Service.`,
  },
  {
    title: "7. User Data & Privacy",
    body: `Your use of the Service is also governed by our Privacy Policy, which is incorporated by reference into these Terms. By using the Service, you consent to the collection and use of information as described in the Privacy Policy. We implement robust security measures to protect your data, but you are responsible for the accuracy and legality of any data you upload.`,
  },
  {
    title: "8. Limitation of Liability",
    body: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, NOTEORA SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE SERVICE. IN NO EVENT SHALL NOTEORA'S TOTAL LIABILITY TO YOU EXCEED THE GREATER OF $100 OR THE AMOUNT YOU PAID TO NOTEORA IN THE 12 MONTHS PRIOR TO THE CLAIM.`,
  },
  {
    title: "9. Disclaimer of Warranties",
    body: `THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. NOTEORA DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE. WE DO NOT WARRANT THE ACCURACY, COMPLETENESS, OR USEFULNESS OF ANY INFORMATION PROVIDED THROUGH THE SERVICE.`,
  },
  {
    title: "10. Termination",
    body: `We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will immediately cease. All provisions of the Terms which should survive termination shall survive. You may export your data at any time during your subscription, and for 30 days after termination, we will provide read-only access for export purposes.`,
  },
  {
    title: "11. Governing Law & Disputes",
    body: `These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any dispute arising from these Terms shall first be attempted to be resolved through good-faith negotiation. If that fails, disputes shall be resolved through binding arbitration in San Francisco, California, under the rules of the American Arbitration Association, except that either party may seek injunctive relief in a court of competent jurisdiction.`,
  },
  {
    title: "12. Changes to Terms",
    body: `We reserve the right to modify these Terms at any time. We will provide at least 30 days' notice of any material changes via email or a prominent notice within the Service. Your continued use of the Service after such changes constitutes acceptance of the new Terms.`,
  },
];

export default function TermsPage() {
  return (
    <PublicLayout>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: <strong>January 15, 2026</strong> · Effective: <strong>February 1, 2026</strong></p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Please read these Terms carefully before using Noteora. They govern your relationship with us and set out both your rights and our obligations.
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
            <h3 className="font-bold mb-2">Questions about these Terms?</h3>
            <p className="text-sm text-muted-foreground">
              Contact us at <a href="mailto:legal@noteora.com" className="text-primary underline">legal@noteora.com</a>. You may also want to read our{" "}
              <Link href="/privacy"><span className="text-primary underline cursor-pointer">Privacy Policy</span></Link>.
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
