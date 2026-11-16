import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, HelpCircle, Zap } from "lucide-react";
import { useState } from "react";

const PLANS = [
  {
    name: "Starter",
    monthly: "$0",
    annual: "$0",
    period: "forever free",
    description: "Perfect for solo analysts, indie founders, and anyone just getting started.",
    cta: "Get started free",
    href: "/sign-up",
    highlight: false,
    badge: null,
    features: [
      "3 projects",
      "5 datasets",
      "10 charts",
      "CSV & manual imports",
      "3 report templates",
      "Community support",
      "7-day data retention",
    ],
    missing: ["API connectors", "AI Insights", "Team workspaces", "Scheduled reports", "Custom branding"],
  },
  {
    name: "Pro",
    monthly: "$29",
    annual: "$23",
    period: "/month",
    description: "For growing teams that need more power, more data, and smarter insights.",
    cta: "Start 14-day free trial",
    href: "/sign-up",
    highlight: true,
    badge: "Most popular",
    features: [
      "Unlimited projects",
      "50 datasets",
      "Unlimited charts",
      "All data sources (CSV, Excel, API)",
      "AI Insights engine",
      "Team workspaces (up to 5 members)",
      "Scheduled email reports",
      "Custom report branding",
      "Priority email support",
      "90-day data retention",
    ],
    missing: ["SSO & SAML", "Dedicated infrastructure", "Audit logs", "SLA guarantee"],
  },
  {
    name: "Enterprise",
    monthly: "Custom",
    annual: "Custom",
    period: "",
    description: "For large organisations with security, compliance, and scale requirements.",
    cta: "Contact sales",
    href: "/contact",
    highlight: false,
    badge: null,
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "SSO & SAML (Okta, Azure AD)",
      "Dedicated infrastructure",
      "Unlimited data retention",
      "Full audit logs",
      "Custom SLA (99.99% uptime)",
      "Onboarding & migration support",
      "Dedicated customer success manager",
      "Custom contract & invoicing",
    ],
    missing: [],
  },
];

const FAQS = [
  { q: "Can I change plans at any time?", a: "Yes. You can upgrade or downgrade at any time. Upgrades take effect immediately and are prorated. Downgrades take effect at the end of your current billing period." },
  { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards (Visa, Mastercard, Amex, Discover) via Stripe. Enterprise customers can also pay by invoice with ACH or wire transfer." },
  { q: "Is there a free trial for Pro?", a: "Yes — every new Pro sign-up gets a 14-day free trial with full access to all Pro features. No credit card required to start the trial." },
  { q: "What happens to my data if I cancel?", a: "Your data is yours. You have 30 days after cancellation to export everything. After that, we delete it from our servers securely and permanently." },
  { q: "Do you offer discounts for startups or non-profits?", a: "Yes. We offer a 50% discount for early-stage startups (pre-Series A) and registered non-profit organisations. Contact us at hello@noteora.com." },
  { q: "How does the team workspace work?", a: "A workspace is shared between your team members. The Pro plan includes up to 5 seats. Each seat is an individual user account. Enterprise plans have unlimited seats." },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            <Zap className="h-3 w-3 mr-1.5" /> Simple pricing
          </Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-5">
            Start free.{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              Scale when ready.
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            No hidden fees. No per-seat surprises. Cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-sm font-medium ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${annual ? "bg-primary" : "bg-muted-foreground/30"}`}
            >
              <span className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${annual ? "translate-x-6" : ""}`} />
            </button>
            <span className={`text-sm font-medium flex items-center gap-2 ${annual ? "text-foreground" : "text-muted-foreground"}`}>
              Annual
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700">Save 20%</span>
            </span>
          </div>
        </div>

        {/* Plans */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-7 flex flex-col relative ${
                plan.highlight
                  ? "border-primary shadow-xl shadow-primary/10 bg-card"
                  : "border-border"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">{plan.badge}</span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-extrabold mb-1">{plan.name}</h2>
                <div className="flex items-end gap-1 my-3">
                  <span className="text-4xl font-extrabold">{annual ? plan.annual : plan.monthly}</span>
                  {plan.period && <span className="text-muted-foreground mb-1">{plan.period}</span>}
                </div>
                {annual && plan.monthly !== "$0" && plan.monthly !== "Custom" && (
                  <p className="text-xs text-muted-foreground">Billed annually · was {plan.monthly}/mo</p>
                )}
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{plan.description}</p>
              </div>

              <Link href={plan.href} className="block mb-6">
                <Button className="w-full" variant={plan.highlight ? "default" : "outline"} size="lg">
                  {plan.cta}
                </Button>
              </Link>

              <div className="flex-1">
                <ul className="space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                  {plan.missing.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground line-through">
                      <span className="h-4 w-4 mt-0.5 shrink-0 text-center text-muted-foreground/40">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          All plans include a 30-day money-back guarantee. · Questions?{" "}
          <Link href="/contact"><span className="text-primary underline cursor-pointer">Talk to us</span></Link>
        </p>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 border-t border-border bg-muted/20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-10">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-3xl font-extrabold">Frequently asked questions</h2>
          </div>
          <div className="space-y-6">
            {FAQS.map((faq) => (
              <div key={faq.q} className="border-b border-border pb-6">
                <h3 className="font-bold mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl bg-primary/5 border border-primary/20 p-7 text-center">
            <h3 className="font-bold mb-2">Still have questions?</h3>
            <p className="text-sm text-muted-foreground mb-4">Our team typically replies within one business day.</p>
            <Link href="/contact">
              <Button variant="outline">Contact us</Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
