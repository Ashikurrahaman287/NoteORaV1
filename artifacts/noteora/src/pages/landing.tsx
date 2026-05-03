import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight, Database, Lock, Zap, LineChart,
  Shield, Users, TrendingUp, CheckCircle2, FileText, BellRing, Star
} from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Instant processing of large datasets. Complex visualizations render in milliseconds — no waiting, no lag.",
  },
  {
    icon: Database,
    title: "Any Data Source",
    desc: "Connect APIs, upload CSVs or Excel files, or enter data manually. Everything normalised automatically.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    desc: "End-to-end encryption, Clerk-powered SSO, and row-level user isolation. Your data stays yours.",
  },
  {
    icon: LineChart,
    title: "Smart Visualisations",
    desc: "Twelve chart types out of the box — line, bar, area, pie, donut, KPI, table, and more.",
  },
  {
    icon: BellRing,
    title: "Real-time Alerts",
    desc: "Get notified when thresholds are crossed. Stay on top of what matters without manual checks.",
  },
  {
    icon: FileText,
    title: "Auto-generated Reports",
    desc: "Compose professional reports from your charts and datasets in seconds, not hours.",
  },
];

const STATS = [
  { value: "10k+", label: "Datasets analysed" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "< 200ms", label: "Average response time" },
  { value: "SOC 2", label: "Compliance ready" },
];

const PRICING = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for solo analysts and indie founders.",
    cta: "Get started free",
    href: "/sign-up",
    highlight: false,
    features: [
      "3 projects",
      "5 datasets",
      "10 charts",
      "CSV & manual imports",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "For growing teams that need more power.",
    cta: "Start free trial",
    href: "/sign-up",
    highlight: true,
    features: [
      "Unlimited projects",
      "50 datasets",
      "Unlimited charts",
      "All data sources",
      "AI insights",
      "Priority support",
      "Custom reports",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "per seat",
    description: "For large organisations with bespoke needs.",
    cta: "Contact sales",
    href: "/sign-up",
    highlight: false,
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Dedicated infrastructure",
      "SLA guarantee",
      "Onboarding support",
      "Audit logs",
    ],
  },
];

const TESTIMONIALS = [
  {
    quote: "Noteora cut our weekly reporting time from 4 hours to under 20 minutes. The chart builder is exceptional.",
    author: "Sarah Chen",
    role: "Head of Growth, Meridian Labs",
    avatar: "SC",
  },
  {
    quote: "We replaced three separate BI tools with Noteora. Our analysts love how fast it is.",
    author: "James Okafor",
    role: "CTO, Stackwise",
    avatar: "JO",
  },
  {
    quote: "Finally a data platform that doesn't require a data engineer to set up. We were live in under an hour.",
    author: "Priya Nair",
    role: "Founder, Optico",
    avatar: "PN",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Nav ── */}
      <header className="fixed top-0 w-full z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/noteora-logo.png" alt="Noteora" className="h-9 w-auto" />
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Reviews</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Log in</Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div {...fadeUp()} className="inline-flex items-center gap-2 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1.5 mb-8">
            <TrendingUp className="h-3 w-3" /> Now with AI-powered insights
          </motion.div>
          <motion.h1
            {...fadeUp(0.05)}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Data Intelligence
            <span className="block text-primary">for the Modern Enterprise</span>
          </motion.h1>
          <motion.p
            {...fadeUp(0.1)}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Noteora transforms raw data into precision insights. Import any dataset, build beautiful charts, and generate professional reports — all in one place.
          </motion.p>
          <motion.div {...fadeUp(0.15)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25">
                Start for free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                See how it works
              </Button>
            </a>
          </motion.div>
          <motion.p {...fadeUp(0.2)} className="text-xs text-muted-foreground mt-5">No credit card required · Free forever on Starter</motion.p>
        </div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="max-w-5xl mx-auto mt-16 rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/40">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <div className="ml-4 text-xs text-muted-foreground font-mono">noteora.app/dashboard</div>
          </div>
          <div className="grid grid-cols-5 min-h-[360px]">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col border-r border-border bg-sidebar p-4 gap-2 col-span-1">
              <div className="flex items-center mb-4">
                <img src="/noteora-logo.png" alt="Noteora" className="h-5 w-auto" />
              </div>
              {["Dashboard", "Projects", "Datasets", "Analytics", "Reports"].map((item, i) => (
                <div key={item} className={`text-xs px-2 py-1.5 rounded-md flex items-center gap-2 ${i === 0 ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "text-muted-foreground"}`}>
                  <div className="h-1.5 w-1.5 rounded-full bg-current opacity-60" />
                  {item}
                </div>
              ))}
            </div>
            {/* Main */}
            <div className="col-span-5 md:col-span-4 p-5 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[["12", "Projects"], ["47", "Datasets"], ["138", "Charts"], ["1.2M", "Rows"]].map(([v, l]) => (
                  <div key={l} className="bg-secondary/40 rounded-lg p-3 border border-border">
                    <div className="text-xl font-bold">{v}</div>
                    <div className="text-xs text-muted-foreground">{l}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-3">
                <div className="col-span-4 bg-secondary/40 rounded-lg border border-border p-3">
                  <div className="text-xs font-medium mb-2 text-muted-foreground">Growth Trends</div>
                  <div className="flex items-end gap-1 h-16">
                    {[30, 50, 40, 80, 60, 90, 75, 95, 70, 100, 85, 110].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/60 rounded-sm" style={{ height: `${h * 0.55}%` }} />
                    ))}
                  </div>
                </div>
                <div className="col-span-3 bg-secondary/40 rounded-lg border border-border p-3">
                  <div className="text-xs font-medium mb-2 text-muted-foreground">Recent activity</div>
                  <div className="space-y-2">
                    {["Dataset imported", "Chart created", "Report published"].map((a) => (
                      <div key={a} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-xs text-muted-foreground">{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-y border-border bg-secondary/20">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <motion.div key={i} {...fadeUp(i * 0.05)}>
              <div className="text-3xl font-bold text-primary">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p {...fadeUp()} className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Features</motion.p>
            <motion.h2 {...fadeUp(0.05)} className="text-3xl md:text-4xl font-bold mb-4">Everything you need, nothing you don't</motion.h2>
            <motion.p {...fadeUp(0.1)} className="text-muted-foreground max-w-xl mx-auto">Built for analysts who demand performance, founders who need clarity, and teams that can't afford complexity.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div key={i} {...fadeUp(i * 0.05)} className="group bg-card rounded-xl border border-border p-6 hover:border-primary/40 hover:shadow-md transition-all duration-200">
                <div className="h-11 w-11 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section id="testimonials" className="py-24 bg-secondary/20 border-y border-border px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.p {...fadeUp()} className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Testimonials</motion.p>
            <motion.h2 {...fadeUp(0.05)} className="text-3xl md:text-4xl font-bold">Trusted by data-driven teams</motion.h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} {...fadeUp(i * 0.07)} className="bg-card rounded-xl border border-border p-6 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
                  <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">{t.avatar}</div>
                  <div>
                    <div className="font-semibold text-sm">{t.author}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <motion.p {...fadeUp()} className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Pricing</motion.p>
            <motion.h2 {...fadeUp(0.05)} className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</motion.h2>
            <motion.p {...fadeUp(0.1)} className="text-muted-foreground">Start free. Scale when you're ready. No surprises.</motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PRICING.map((plan, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.05)}
                className={`rounded-2xl border p-7 flex flex-col ${plan.highlight ? "border-primary bg-primary/5 shadow-xl shadow-primary/10 relative" : "border-border bg-card"}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <div className="flex items-end gap-1 mt-2">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-muted-foreground text-sm mb-1">/{plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <Button className="w-full" variant={plan.highlight ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 {...fadeUp()} className="text-3xl md:text-4xl font-bold mb-4">
            Ready to make sense of your data?
          </motion.h2>
          <motion.p {...fadeUp(0.05)} className="text-primary-foreground/80 mb-8 text-lg">
            Join thousands of analysts and founders who use Noteora to turn raw data into clear decisions.
          </motion.p>
          <motion.div {...fadeUp(0.1)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold">
                Start for free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
          <motion.p {...fadeUp(0.15)} className="text-xs text-primary-foreground/60 mt-5">No credit card required</motion.p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-secondary/20 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center mb-3">
                <img src="/noteora-logo.png" alt="Noteora" className="h-8 w-auto" />
              </div>
              <p className="text-sm text-muted-foreground">Data intelligence for the modern enterprise.</p>
              <div className="flex gap-1 mt-4">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            {[
              { heading: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
              { heading: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "Security", "Cookies"] },
            ].map((col) => (
              <div key={col.heading}>
                <h4 className="font-semibold text-sm mb-3">{col.heading}</h4>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Noteora. All rights reserved.</p>
            <p className="text-xs text-muted-foreground">Built with ❤ on Replit</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
