import { PublicLayout } from "@/components/layout/PublicLayout";
import { Shield, Lock, Eye, Server, RefreshCw, AlertTriangle, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const PILLARS = [
  {
    icon: Lock,
    title: "Encryption Everywhere",
    desc: "All data is encrypted in transit using TLS 1.3. Data at rest is encrypted with AES-256. Database backups are encrypted separately with independently managed keys.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Eye,
    title: "Access Controls",
    desc: "Row-level security ensures each user can only access their own data. All internal access to production systems requires MFA and is logged with a full audit trail.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: Server,
    title: "SOC 2 Type II",
    desc: "We are SOC 2 Type II certified, meaning an independent auditor has verified our security controls, availability, and confidentiality commitments over an observation period.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: RefreshCw,
    title: "Regular Pen Tests",
    desc: "We commission independent penetration tests twice per year and conduct internal vulnerability assessments continuously. Critical findings are remediated within 24 hours.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Shield,
    title: "GDPR & CCPA Ready",
    desc: "We support data subject rights including access, deletion, and portability. Our DPA is available for customers who need it. We maintain a comprehensive records of processing activities.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
  {
    icon: AlertTriangle,
    title: "Incident Response",
    desc: "We have a documented incident response plan. In the event of a data breach, we commit to notifying affected customers within 72 hours, as required by GDPR.",
    color: "text-sky-500",
    bg: "bg-sky-500/10",
  },
];

const CERTS = [
  { name: "SOC 2 Type II", issuer: "AICPA" },
  { name: "GDPR Compliant", issuer: "EU Regulation 2016/679" },
  { name: "CCPA Compliant", issuer: "California Privacy Rights" },
  { name: "ISO 27001 (In progress)", issuer: "ISO/IEC" },
];

const INFRASTRUCTURE = [
  { label: "Cloud Provider", value: "AWS (us-east-1, eu-west-1)" },
  { label: "Database", value: "PostgreSQL with encrypted backups (7-day retention)" },
  { label: "CDN", value: "CloudFront (TLS 1.3)" },
  { label: "Auth Provider", value: "Clerk (SOC 2 certified)" },
  { label: "Payments", value: "Stripe (PCI DSS Level 1)" },
  { label: "Uptime", value: "99.9% SLA (status.noteora.com)" },
];

export default function SecurityPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-primary/8 blur-[100px]" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-6 bg-emerald-500/10 text-emerald-700 border-emerald-500/20 hover:bg-emerald-500/10">
            <Shield className="h-3 w-3 mr-1.5" /> SOC 2 Type II Certified
          </Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Security is our{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              foundation
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your data is your most valuable asset. We protect it with enterprise-grade security controls, independent audits, and a team that takes privacy seriously.
          </p>
        </div>
      </section>

      {/* Certs */}
      <section className="py-12 px-6 bg-muted/20 border-y border-border">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {CERTS.map((c) => (
            <div key={c.name} className="rounded-xl border border-border bg-background p-4 text-center">
              <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-bold text-sm">{c.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{c.issuer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3 text-center">Our approach</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">Defence in depth</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border p-7 hover:shadow-sm transition-shadow">
                <div className={`h-10 w-10 rounded-xl ${p.bg} flex items-center justify-center mb-4`}>
                  <p.icon className={`h-5 w-5 ${p.color}`} />
                </div>
                <h3 className="font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Infrastructure</p>
          <h2 className="text-3xl font-extrabold mb-8">What we run on</h2>
          <div className="rounded-2xl border border-border overflow-hidden">
            {INFRASTRUCTURE.map((item, i) => (
              <div key={item.label} className={`flex justify-between items-center px-6 py-4 ${i !== INFRASTRUCTURE.length - 1 ? "border-b border-border" : ""}`}>
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-sm text-muted-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vulnerability disclosure */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8">
            <AlertTriangle className="h-8 w-8 text-amber-500 mb-4" />
            <h2 className="text-2xl font-extrabold mb-3">Responsible Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
              If you've found a security vulnerability in Noteora, we want to know. Please email us at <strong className="text-foreground">security@noteora.com</strong> with the details. We commit to acknowledging your report within 24 hours, working with you to understand the issue, and crediting you publicly (with your permission) once the issue is resolved. Please do not publicly disclose the vulnerability until we've had a chance to fix it (coordinated disclosure).
            </p>
            <a href="mailto:security@noteora.com">
              <Button variant="outline" size="sm">
                Report a vulnerability
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center border-t border-border bg-muted/10">
        <h3 className="text-2xl font-extrabold mb-3">Need a security review before signing up?</h3>
        <p className="text-muted-foreground mb-6 text-sm max-w-md mx-auto">Enterprise customers can request our full security documentation, penetration test reports, and SOC 2 certification.</p>
        <Link href="/contact">
          <Button>Request security docs</Button>
        </Link>
      </section>
    </PublicLayout>
  );
}
