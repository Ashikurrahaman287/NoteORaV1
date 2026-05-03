import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowRight, Database, Lock, Zap, LineChart,
  Shield, Users, TrendingUp, CheckCircle2, FileText,
  BellRing, Star, ChevronRight, Play, BarChart3,
  Sparkles, Globe, GitBranch
} from "lucide-react";

const heroAnim = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

const scrollAnim = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay },
});

const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Instant processing of large datasets. Complex visualizations render in milliseconds — no waiting, no lag.",
    gradient: "from-amber-500/20 to-orange-500/10",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10",
  },
  {
    icon: Database,
    title: "Any Data Source",
    desc: "Connect APIs, upload CSVs or Excel files, or enter data manually. Everything normalised automatically.",
    gradient: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    desc: "End-to-end encryption, Clerk-powered SSO, and row-level user isolation. Your data stays yours.",
    gradient: "from-emerald-500/20 to-teal-500/10",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
  },
  {
    icon: LineChart,
    title: "Smart Visualisations",
    desc: "Twelve chart types out of the box — line, bar, area, pie, donut, KPI, table, and more.",
    gradient: "from-violet-500/20 to-purple-500/10",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10",
  },
  {
    icon: BellRing,
    title: "Real-time Alerts",
    desc: "Get notified when thresholds are crossed. Stay on top of what matters without manual checks.",
    gradient: "from-rose-500/20 to-pink-500/10",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10",
  },
  {
    icon: FileText,
    title: "Auto-generated Reports",
    desc: "Compose professional reports from your charts and datasets in seconds, not hours.",
    gradient: "from-sky-500/20 to-blue-500/10",
    iconColor: "text-sky-500",
    iconBg: "bg-sky-500/10",
  },
];

const STATS = [
  { value: "10k+", label: "Datasets analysed" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "< 200ms", label: "Avg response time" },
  { value: "SOC 2", label: "Compliance ready" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Import your data",
    desc: "Upload a CSV, connect an API, or enter data manually. Noteora normalises everything automatically.",
    icon: Database,
  },
  {
    step: "02",
    title: "Build visualisations",
    desc: "Choose from 12 chart types. Drag, configure, and pin your best charts to a shared dashboard.",
    icon: BarChart3,
  },
  {
    step: "03",
    title: "Share insights",
    desc: "Generate professional PDF reports or share live dashboards with your team in one click.",
    icon: Globe,
  },
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
    period: "/month",
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
    period: "",
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
    role: "Head of Growth · Meridian Labs",
    avatar: "SC",
    color: "bg-blue-500",
  },
  {
    quote: "We replaced three separate BI tools with Noteora. Our analysts love how fast it is.",
    author: "James Okafor",
    role: "CTO · Stackwise",
    avatar: "JO",
    color: "bg-violet-500",
  },
  {
    quote: "Finally a data platform that doesn't require a data engineer to set up. We were live in under an hour.",
    author: "Priya Nair",
    role: "Founder · Optico",
    avatar: "PN",
    color: "bg-emerald-500",
  },
];

const LOGOS = ["Acme Corp", "Stackwise", "Meridian", "Optico", "Vantage", "Luminary"];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Nav ── */}
      <header className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/noteora-logo.png" alt="Noteora" className="h-9 w-auto" />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            {[
              { label: "How it works", id: "how-it-works" },
              { label: "Features", id: "features" },
              { label: "Pricing", id: "pricing" },
              { label: "Reviews", id: "testimonials" },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0 text-sm"
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
                Log in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="shadow-md shadow-primary/20">
                Get Started <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        {/* Aurora background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute top-32 left-1/4 w-[400px] h-[300px] rounded-full bg-cyan-500/6 blur-[80px]" />
          <div className="absolute top-20 right-1/4 w-[300px] h-[300px] rounded-full bg-violet-500/5 blur-[80px]" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            {...heroAnim()}
            className="inline-flex items-center gap-2 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 rounded-full px-3.5 py-1.5 mb-8"
          >
            <Sparkles className="h-3 w-3" /> Now with AI-powered insights
          </motion.div>

          <motion.h1
            {...heroAnim(0.07)}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6"
          >
            Data Intelligence
            <span className="block bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent pb-1">
              for the Modern Enterprise
            </span>
          </motion.h1>

          <motion.p
            {...heroAnim(0.13)}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Noteora transforms raw data into precision insights. Import any dataset, build beautiful charts, and generate professional reports — all in one place.
          </motion.p>

          <motion.div {...heroAnim(0.18)} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/sign-up">
              <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-xl shadow-primary/25">
                Start for free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <button
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 h-12 px-8 text-base rounded-lg border border-border bg-background hover:bg-muted transition-colors font-medium"
            >
              <Play className="h-4 w-4 fill-current" /> See how it works
            </button>
          </motion.div>

          <motion.p {...heroAnim(0.22)} className="text-xs text-muted-foreground mt-4">
            No credit card required · Free forever on Starter
          </motion.p>
        </div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="max-w-5xl mx-auto mt-14 rounded-2xl border border-border shadow-2xl overflow-hidden ring-1 ring-black/5"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <div className="ml-3 flex items-center gap-1.5 bg-background/80 rounded-md px-3 py-1 flex-1 max-w-xs">
              <div className="h-2.5 w-2.5 rounded-full bg-primary/40" />
              <span className="text-xs text-muted-foreground font-mono">noteora.app/dashboard</span>
            </div>
          </div>
          {/* App layout */}
          <div className="flex min-h-[340px] bg-background">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-[180px] shrink-0 border-r border-border p-3 gap-1" style={{ background: 'hsl(222 60% 10%)' }}>
              <div className="flex items-center mb-4 px-1 pt-1">
                <img src="/noteora-logo.png" alt="Noteora" className="h-5 w-auto" />
              </div>
              {["Dashboard", "Projects", "Datasets", "Analytics", "Reports"].map((item, i) => (
                <div
                  key={item}
                  className={`text-xs px-2.5 py-2 rounded-md flex items-center gap-2 ${
                    i === 0
                      ? "bg-white/10 text-white font-medium"
                      : "text-white/45 hover:text-white/70"
                  }`}
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                  {item}
                </div>
              ))}
            </div>
            {/* Main content */}
            <div className="flex-1 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-foreground">Good morning, Sarah 👋</div>
                  <div className="text-xs text-muted-foreground">Here's your data overview</div>
                </div>
                <div className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-md">Pro Plan</div>
              </div>
              <div className="grid grid-cols-4 gap-2.5">
                {[["12", "Projects", "+2"], ["47", "Datasets", "+8"], ["138", "Charts", "+14"], ["1.2M", "Rows", "+220k"]].map(([v, l, d]) => (
                  <div key={l} className="bg-card rounded-lg p-3 border border-border">
                    <div className="text-lg font-bold text-foreground">{v}</div>
                    <div className="text-[10px] text-muted-foreground">{l}</div>
                    <div className="text-[10px] text-emerald-500 font-medium mt-0.5">{d}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2.5">
                <div className="col-span-4 bg-card rounded-lg border border-border p-3">
                  <div className="text-[10px] font-semibold text-muted-foreground mb-2.5 uppercase tracking-wider">Growth Trends</div>
                  <div className="flex items-end gap-0.5 h-14">
                    {[30, 50, 40, 75, 60, 88, 72, 95, 68, 100, 82, 110].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${h * 0.55}%`,
                          background: i >= 10
                            ? 'hsl(214 89% 62%)'
                            : `hsl(214 89% ${48 + i * 1.5}% / 0.6)`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    {["J","F","M","A","My","Jn","Jl","A","S","O","N","D"].map((m, idx) => (
                      <div key={idx} className="text-[8px] text-muted-foreground flex-1 text-center">{m}</div>
                    ))}
                  </div>
                </div>
                <div className="col-span-3 bg-card rounded-lg border border-border p-3">
                  <div className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-wider">AI Insights</div>
                  <div className="space-y-2">
                    {[
                      { text: "Revenue up 23% vs last month", color: "bg-emerald-500" },
                      { text: "Dataset sync completed", color: "bg-blue-500" },
                      { text: "New report ready", color: "bg-violet-500" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${item.color} mt-1 shrink-0`} />
                        <span className="text-[10px] text-muted-foreground leading-tight">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trusted by logos */}
        <motion.div {...heroAnim(0.5)} className="mt-10 text-center">
          <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest font-medium">Trusted by data-driven teams at</p>
          <div className="flex flex-wrap justify-center gap-6">
            {LOGOS.map((name) => (
              <span key={name} className="text-sm font-semibold text-muted-foreground/60">{name}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {STATS.map((s, i) => (
            <motion.div key={i} {...scrollAnim(i * 0.05)}>
              <div className="text-3xl font-extrabold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">{s.value}</div>
              <div className="text-sm text-muted-foreground mt-1.5">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.p {...scrollAnim()} className="text-sm font-bold text-primary uppercase tracking-widest mb-3">How it works</motion.p>
            <motion.h2 {...scrollAnim(0.05)} className="text-3xl md:text-4xl font-extrabold mb-4">Up and running in minutes</motion.h2>
            <motion.p {...scrollAnim(0.1)} className="text-muted-foreground max-w-xl mx-auto">No setup fees, no data engineers required. Noteora is designed for teams who need answers fast.</motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={i} {...scrollAnim(i * 0.08)} className="relative flex flex-col items-start">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-border to-transparent -translate-y-1/2 z-0" />
                )}
                <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 relative z-10">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-4xl font-black text-border/60 mb-2">{step.step}</div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6 bg-muted/20 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p {...scrollAnim()} className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Features</motion.p>
            <motion.h2 {...scrollAnim(0.05)} className="text-3xl md:text-4xl font-extrabold mb-4">Everything you need, nothing you don't</motion.h2>
            <motion.p {...scrollAnim(0.1)} className="text-muted-foreground max-w-xl mx-auto">Built for analysts who demand performance, founders who need clarity, and teams that can't afford complexity.</motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                {...scrollAnim(i * 0.04)}
                className="group bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className={`h-11 w-11 ${f.iconBg} ${f.iconColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.p {...scrollAnim()} className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Testimonials</motion.p>
            <motion.h2 {...scrollAnim(0.05)} className="text-3xl md:text-4xl font-extrabold">Trusted by data-driven teams</motion.h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} {...scrollAnim(i * 0.07)} className="bg-card rounded-2xl border border-border p-6 flex flex-col hover:shadow-md transition-shadow duration-200">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
                  <div className={`h-9 w-9 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                    {t.avatar}
                  </div>
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
      <section id="pricing" className="py-24 px-6 bg-muted/20 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <motion.p {...scrollAnim()} className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Pricing</motion.p>
            <motion.h2 {...scrollAnim(0.05)} className="text-3xl md:text-4xl font-extrabold mb-3">Simple, transparent pricing</motion.h2>
            <motion.p {...scrollAnim(0.1)} className="text-muted-foreground">Start free. Scale when you're ready. No surprises.</motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PRICING.map((plan, i) => (
              <motion.div
                key={i}
                {...scrollAnim(i * 0.05)}
                className={`rounded-2xl p-7 flex flex-col relative ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/25 scale-[1.02]"
                    : "bg-card border border-border"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                    Most Popular
                  </div>
                )}
                <div className="mb-5">
                  <h3 className={`text-lg font-bold ${plan.highlight ? "text-primary-foreground" : ""}`}>{plan.name}</h3>
                  <div className="flex items-end gap-1 mt-2">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    {plan.period && <span className={`text-sm mb-1 ${plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.period}</span>}
                  </div>
                  <p className={`text-sm mt-2 ${plan.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{plan.description}</p>
                </div>
                <ul className="space-y-3 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${plan.highlight ? "text-primary-foreground/80" : "text-primary"}`} />
                      <span className={plan.highlight ? "text-primary-foreground/90" : ""}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}>
                  <Button
                    className="w-full"
                    variant={plan.highlight ? "secondary" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-cyan-500/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-[80px]" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...scrollAnim()} className="inline-flex items-center gap-2 text-xs font-semibold bg-primary/10 text-primary border border-primary/20 rounded-full px-3.5 py-1.5 mb-8">
            <GitBranch className="h-3 w-3" /> Join 10,000+ analysts
          </motion.div>
          <motion.h2 {...scrollAnim(0.05)} className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            Ready to make sense<br />of your data?
          </motion.h2>
          <motion.p {...scrollAnim(0.1)} className="text-muted-foreground mb-10 text-lg max-w-xl mx-auto">
            Join thousands of analysts and founders who use Noteora to turn raw data into clear decisions.
          </motion.p>
          <motion.div {...scrollAnim(0.15)} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="h-13 px-10 text-base font-bold shadow-xl shadow-primary/25">
                Start for free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="h-13 px-10 text-base">
                Log in to dashboard
              </Button>
            </Link>
          </motion.div>
          <motion.p {...scrollAnim(0.2)} className="text-xs text-muted-foreground mt-5">No credit card required · Cancel anytime</motion.p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-muted/30 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <img src="/noteora-logo.png" alt="Noteora" className="h-9 w-auto" />
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Data intelligence for the modern enterprise. Import, visualize, and share your data with confidence.
              </p>
              <div className="flex gap-3 mt-5">
                <div className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 cursor-pointer transition-colors">
                  <Shield className="h-4 w-4" />
                </div>
                <div className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 cursor-pointer transition-colors">
                  <Users className="h-4 w-4" />
                </div>
                <div className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 cursor-pointer transition-colors">
                  <Globe className="h-4 w-4" />
                </div>
              </div>
            </div>
            {[
              { heading: "Product", links: [{ label: "Features", href: "/features" }, { label: "Pricing", href: "/pricing" }, { label: "Changelog", href: "/changelog" }, { label: "Roadmap", href: "/roadmap" }] },
              { heading: "Company", links: [{ label: "About", href: "/about" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }, { label: "Contact", href: "/contact" }] },
              { heading: "Legal", links: [{ label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Service", href: "/terms" }, { label: "Security", href: "/security" }, { label: "Cookies", href: "/cookies" }] },
            ].map((col) => (
              <div key={col.heading}>
                <h4 className="font-bold text-sm mb-4">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Noteora. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">SOC 2 Compliant</span>
              <span className="text-muted-foreground/30">·</span>
              <span className="text-xs text-muted-foreground">GDPR Ready</span>
              <span className="text-muted-foreground/30">·</span>
              <span className="text-xs text-muted-foreground">99.9% Uptime</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
