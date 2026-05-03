import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight, Database, Lock, Zap, LineChart,
  Shield, Users, TrendingUp, CheckCircle2, FileText,
  BellRing, Star, ChevronRight, BarChart3,
  Sparkles, Globe, GitBranch, Menu, X, Play,
  ArrowUpRight, Award, Clock, Cpu, RefreshCw,
} from "lucide-react";

const heroAnim = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
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
    title: "Sub-200ms Rendering",
    desc: "Every visualisation renders in under 200ms regardless of dataset size. Built on a high-performance columnar engine designed for real-time analytics.",
    iconColor: "text-amber-500",
    iconBg: "bg-amber-500/10 border border-amber-500/20",
  },
  {
    icon: Database,
    title: "Universal Data Connectors",
    desc: "REST APIs, PostgreSQL, MySQL, CSV, Excel, Google Sheets — Noteora normalises everything into a unified schema automatically.",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10 border border-blue-500/20",
  },
  {
    icon: Lock,
    title: "Enterprise-grade Security",
    desc: "End-to-end encryption at rest and in transit, Clerk-powered SSO, SAML 2.0, row-level access isolation, and full audit logging.",
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-500/10 border border-emerald-500/20",
  },
  {
    icon: LineChart,
    title: "12 Visualisation Types",
    desc: "Line, bar, area, stacked, pie, donut, funnel, KPI, scatter, heatmap, table, and geo maps — all production-ready out of the box.",
    iconColor: "text-violet-500",
    iconBg: "bg-violet-500/10 border border-violet-500/20",
  },
  {
    icon: BellRing,
    title: "Threshold Alerts",
    desc: "Configure metric conditions and receive Slack, email, or webhook notifications the moment a threshold is crossed.",
    iconColor: "text-rose-500",
    iconBg: "bg-rose-500/10 border border-rose-500/20",
  },
  {
    icon: FileText,
    title: "Automated Reporting",
    desc: "Compose branded PDF or HTML reports from any chart or dataset combination. Schedule delivery on any cadence.",
    iconColor: "text-sky-500",
    iconBg: "bg-sky-500/10 border border-sky-500/20",
  },
];

const STATS = [
  { value: "10,000+", label: "Datasets processed daily" },
  { value: "99.97%", label: "Uptime last 12 months" },
  { value: "< 180ms", label: "Median query latency" },
  { value: "SOC 2 Type II", label: "Security certification" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Connect your data",
    desc: "Upload CSV or Excel, connect a live API, or pull directly from your database. Noteora normalises every source into a unified schema — no ETL pipelines required.",
    icon: Database,
  },
  {
    step: "02",
    title: "Build and configure",
    desc: "Choose from 12 chart types. Configure metrics, filters, and dimensions visually. Pin charts to a shared dashboard in seconds.",
    icon: BarChart3,
  },
  {
    step: "03",
    title: "Share and automate",
    desc: "Generate a branded PDF report or share a live dashboard link. Schedule recurring delivery to any Slack channel or inbox.",
    icon: Globe,
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "For solo analysts and early-stage founders exploring their data.",
    cta: "Get started free",
    href: "/sign-up",
    highlight: false,
    features: [
      "3 projects",
      "5 datasets",
      "10 charts per project",
      "CSV & manual imports",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing teams that need speed, depth, and collaboration.",
    cta: "Start 14-day free trial",
    href: "/sign-up",
    highlight: true,
    features: [
      "Unlimited projects",
      "50 datasets",
      "Unlimited charts",
      "All data connectors",
      "AI-powered insights",
      "Priority support (4h SLA)",
      "Custom branded reports",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organisations requiring dedicated infrastructure and bespoke SLAs.",
    cta: "Talk to sales",
    href: "/contact",
    highlight: false,
    features: [
      "Everything in Pro",
      "SSO & SAML 2.0",
      "Dedicated infrastructure",
      "99.99% uptime SLA",
      "White-glove onboarding",
      "Full audit logging",
      "Custom contracts",
    ],
  },
];

const TESTIMONIALS = [
  {
    quote: "Noteora cut our weekly reporting cycle from 4 hours to under 20 minutes. The chart builder is the best I've used — and I've tried them all.",
    author: "Sarah Chen",
    role: "Head of Growth",
    company: "Meridian Labs",
    avatar: "SC",
    color: "bg-blue-600",
    metric: "92% time saved",
  },
  {
    quote: "We replaced three separate BI tools with Noteora and our analysts haven't looked back. The speed is genuinely remarkable.",
    author: "James Okafor",
    role: "Chief Technology Officer",
    company: "Stackwise",
    avatar: "JO",
    color: "bg-violet-600",
    metric: "3 tools consolidated",
  },
  {
    quote: "Finally a data platform that doesn't need a data engineer to configure. We onboarded in under an hour and had our first dashboard live by end of day.",
    author: "Priya Nair",
    role: "Founder & CEO",
    company: "Optico",
    avatar: "PN",
    color: "bg-emerald-600",
    metric: "Live in < 1 hour",
  },
];

const LOGOS = [
  "Meridian Labs",
  "Stackwise",
  "Optico",
  "Vantage",
  "Luminary",
  "Acme Corp",
];

const TRUST_ITEMS = [
  { icon: Shield, label: "SOC 2 Type II" },
  { icon: Lock, label: "GDPR Compliant" },
  { icon: Award, label: "ISO 27001" },
  { icon: RefreshCw, label: "99.97% Uptime" },
  { icon: Clock, label: "< 180ms Latency" },
  { icon: Cpu, label: "AES-256 Encryption" },
];

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Announcement bar ── */}
      <div className="bg-primary text-primary-foreground text-xs font-medium text-center py-2.5 px-4 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 shrink-0" />
          Noteora raises <strong>$10M Series A</strong> led by AGT Venture — read the announcement
        </span>
        <Link href="/blog/noteora-series-a">
          <span className="underline underline-offset-2 hover:no-underline cursor-pointer flex items-center gap-0.5">
            Read more <ArrowUpRight className="h-3 w-3" />
          </span>
        </Link>
      </div>

      {/* ── Nav ── */}
      <header className="sticky top-0 w-full z-50 border-b border-border/50 bg-background/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <span className="text-lg font-extrabold tracking-tight cursor-pointer hover:text-primary transition-colors">Noteora</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/how-it-works">
              <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">How it works</span>
            </Link>
            {[
              { label: "Features", id: "features" },
              { label: "Pricing", id: "pricing" },
              { label: "Reviews", id: "testimonials" },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer bg-transparent border-none p-0 text-sm"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/sign-in">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Log in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="shadow-md shadow-primary/20">
                Get Started <ChevronRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Link href="/sign-up" onClick={() => setMobileOpen(false)}>
              <Button size="sm" className="shadow-md shadow-primary/20">Get Started</Button>
            </Link>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
              <Link href="/how-it-works" onClick={() => setMobileOpen(false)}>
                <span className="flex items-center h-11 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg px-3 transition-colors cursor-pointer">How it works</span>
              </Link>
              {[
                { label: "Features", id: "features" },
                { label: "Pricing", id: "pricing" },
                { label: "Reviews", id: "testimonials" },
              ].map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="flex items-center h-11 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg px-3 transition-colors cursor-pointer w-full text-left"
                >
                  {label}
                </button>
              ))}
              <div className="border-t border-border mt-2 pt-3 flex flex-col gap-2">
                <Link href="/sign-in" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Log in</Button>
                </Link>
                <Link href="/sign-up" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full shadow-md shadow-primary/20">
                    Get Started <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-full bg-blue-600/8 blur-[140px]" />
          <div className="absolute top-10 left-1/4 w-[500px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px]" />
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-500/4 blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            {...heroAnim()}
            className="inline-flex items-center gap-2 text-xs font-semibold bg-blue-600/10 text-blue-600 border border-blue-600/25 rounded-full px-3.5 py-1.5 mb-8"
          >
            <Sparkles className="h-3 w-3" /> Series A · Backed by AGT Venture · $10M raised in 2026
          </motion.div>

          <motion.h1
            {...heroAnim(0.08)}
            className="text-5xl sm:text-6xl md:text-[4.5rem] font-extrabold tracking-tight leading-[1.06] mb-6"
          >
            The analytics platform
            <span className="block bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent pb-2">
              built for scale.
            </span>
          </motion.h1>

          <motion.p
            {...heroAnim(0.14)}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Import any dataset, build production-ready visualisations, and deliver
            professional reports — without a single line of SQL or a data engineer on retainer.
          </motion.p>

          <motion.div {...heroAnim(0.2)} className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/sign-up">
              <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-xl shadow-blue-600/20">
                Start for free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <button className="inline-flex items-center gap-2 h-12 px-8 text-base rounded-xl border border-border bg-background hover:bg-muted transition-colors font-medium">
                <Play className="h-4 w-4 fill-current" /> See how it works
              </button>
            </Link>
          </motion.div>

          <motion.p {...heroAnim(0.25)} className="text-xs text-muted-foreground mt-4">
            Free forever on Starter · No credit card required · Setup in under 5 minutes
          </motion.p>
        </div>

        {/* Product mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.3 }}
          className="max-w-5xl mx-auto mt-16 rounded-2xl border border-border/80 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.15)] overflow-hidden ring-1 ring-black/6"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/60">
            <div className="h-3 w-3 rounded-full bg-red-400/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
            <div className="h-3 w-3 rounded-full bg-green-400/80" />
            <div className="ml-4 flex items-center gap-1.5 bg-background/80 border border-border/60 rounded-md px-3 py-1 flex-1 max-w-xs">
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-muted-foreground font-mono select-none">app.noteora.com/dashboard</span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Shield className="h-3 w-3 text-primary" />
              </div>
            </div>
          </div>

          {/* App shell */}
          <div className="flex min-h-[360px] bg-[#f8fafc] dark:bg-background">
            {/* Sidebar */}
            <div
              className="hidden md:flex flex-col w-[188px] shrink-0 border-r border-white/8 p-3 gap-0.5"
              style={{ background: "hsl(222 47% 11%)" }}
            >
              <div className="px-2 py-2 mb-3">
                <span className="text-white font-extrabold text-sm tracking-tight">Noteora</span>
                <span className="ml-1.5 text-[10px] font-semibold bg-blue-500/30 text-blue-300 rounded px-1.5 py-0.5">Pro</span>
              </div>
              {[
                { label: "Dashboard", active: true },
                { label: "Projects", active: false },
                { label: "Datasets", active: false },
                { label: "Analytics", active: false },
                { label: "Reports", active: false },
                { label: "Settings", active: false },
              ].map(({ label, active }) => (
                <div
                  key={label}
                  className={`text-xs px-3 py-2 rounded-lg flex items-center gap-2.5 transition-colors ${
                    active
                      ? "bg-white/12 text-white font-semibold"
                      : "text-white/40 hover:text-white/65 hover:bg-white/5"
                  }`}
                >
                  <div className={`h-1.5 w-1.5 rounded-full ${active ? "bg-blue-400" : "bg-white/20"}`} />
                  {label}
                </div>
              ))}
              <div className="mt-auto pt-4 border-t border-white/10 px-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-[9px] text-white font-bold shrink-0">S</div>
                  <div>
                    <div className="text-[10px] text-white/80 font-medium leading-none">Sarah Chen</div>
                    <div className="text-[9px] text-white/35 mt-0.5">Admin</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-5 space-y-4 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-foreground">Good morning, Sarah</div>
                  <div className="text-xs text-muted-foreground">Revenue Analytics · Updated 2 min ago</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-emerald-600 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    ↑ All systems normal
                  </div>
                </div>
              </div>

              {/* KPI row */}
              <div className="grid grid-cols-4 gap-2.5">
                {[
                  { v: "$2.4M", l: "MRR", d: "+18.3%", up: true },
                  { v: "12,847", l: "Active users", d: "+6.1%", up: true },
                  { v: "94.2%", l: "Retention", d: "+1.4pp", up: true },
                  { v: "1.2M", l: "Rows processed", d: "Today", up: null },
                ].map(({ v, l, d, up }) => (
                  <div key={l} className="bg-white dark:bg-card rounded-xl p-3 border border-border/60 shadow-sm">
                    <div className="text-base font-bold text-foreground tracking-tight">{v}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{l}</div>
                    <div className={`text-[10px] font-semibold mt-1 ${up === true ? "text-emerald-500" : up === false ? "text-rose-500" : "text-muted-foreground"}`}>{d}</div>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-7 gap-2.5">
                <div className="col-span-4 bg-white dark:bg-card rounded-xl border border-border/60 p-3.5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">MRR Growth</div>
                    <div className="text-[9px] text-primary font-semibold bg-primary/8 px-2 py-0.5 rounded">Last 12 months</div>
                  </div>
                  <div className="flex items-end gap-[3px] h-16">
                    {[28, 38, 35, 52, 48, 65, 58, 74, 62, 88, 79, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-[3px]"
                        style={{
                          height: `${h}%`,
                          background: i === 11
                            ? "hsl(217 91% 60%)"
                            : `hsl(217 91% ${52 + i * 1.5}% / ${0.4 + i * 0.05})`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5">
                    {["J","F","M","A","M","J","J","A","S","O","N","D"].map((m, i) => (
                      <div key={i} className="text-[8px] text-muted-foreground/60 flex-1 text-center">{m}</div>
                    ))}
                  </div>
                </div>
                <div className="col-span-3 bg-white dark:bg-card rounded-xl border border-border/60 p-3.5 shadow-sm">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5">AI Insights</div>
                  <div className="space-y-2.5">
                    {[
                      { text: "MRR up 18.3% vs last month", color: "bg-emerald-500", tag: "Growth" },
                      { text: "Churn rate below industry avg", color: "bg-blue-500", tag: "Retention" },
                      { text: "Q4 forecast: $3.1M MRR", color: "bg-violet-500", tag: "Forecast" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className={`h-1.5 w-1.5 rounded-full ${item.color} mt-1 shrink-0`} />
                        <span className="text-[10px] text-muted-foreground leading-tight">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-border">
                    <div className="text-[9px] text-primary font-semibold cursor-pointer hover:underline">View full analysis →</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trusted by */}
        <motion.div {...heroAnim(0.55)} className="max-w-4xl mx-auto mt-12">
          <p className="text-center text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-6">
            Trusted by data teams at leading companies
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {LOGOS.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 border border-border/70 rounded-lg px-4 py-2 bg-muted/30 hover:bg-muted/60 transition-colors"
              >
                <div className="h-2 w-2 rounded-full bg-primary/50" />
                <span className="text-sm font-semibold text-muted-foreground">{name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── Trust bar ── */}
      <section className="py-10 border-y border-border bg-muted/25">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-muted-foreground">
                <Icon className="h-3.5 w-3.5 text-primary/70 shrink-0" />
                <span className="text-xs font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div {...scrollAnim()} className="text-center mb-12">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">By the numbers</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">Performance you can measure</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                {...scrollAnim(i * 0.07)}
                className="text-center p-6 rounded-2xl border border-border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">{s.value}</div>
                <div className="text-sm text-muted-foreground leading-snug">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-24 px-6 bg-muted/20 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.p {...scrollAnim()} className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Process</motion.p>
            <motion.h2 {...scrollAnim(0.05)} className="text-3xl md:text-4xl font-extrabold mb-4">Up and running in minutes</motion.h2>
            <motion.p {...scrollAnim(0.1)} className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              No setup fees. No data engineers. No SQL. Noteora handles the complexity so your team can focus on decisions.
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector lines */}
            <div className="hidden md:block absolute top-8 left-[33%] right-[33%] h-px bg-gradient-to-r from-border via-primary/40 to-border" />
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={i}
                {...scrollAnim(i * 0.1)}
                className="relative flex flex-col bg-card rounded-2xl border border-border p-7 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-4xl font-black text-border/50 tabular-nums">{step.step}</span>
                </div>
                <h3 className="text-base font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...scrollAnim(0.3)} className="text-center mt-10">
            <Link href="/how-it-works">
              <Button variant="outline" size="sm" className="gap-2">
                See the full walkthrough <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.p {...scrollAnim()} className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Capabilities</motion.p>
            <motion.h2 {...scrollAnim(0.05)} className="text-3xl md:text-4xl font-extrabold mb-4">Everything your team needs</motion.h2>
            <motion.p {...scrollAnim(0.1)} className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Built for analysts who demand performance, founders who need clarity, and ops teams that can't afford downtime.
            </motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                {...scrollAnim(i * 0.05)}
                className="group bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
              >
                <div className={`h-11 w-11 ${f.iconBg} ${f.iconColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200`}>
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...scrollAnim(0.3)} className="text-center mt-10">
            <Link href="/features">
              <Button variant="outline" size="sm" className="gap-2">
                View all features <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-24 px-6 bg-muted/20 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.p {...scrollAnim()} className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Customer stories</motion.p>
            <motion.h2 {...scrollAnim(0.05)} className="text-3xl md:text-4xl font-extrabold mb-3">
              Trusted by high-output teams
            </motion.h2>
            <motion.p {...scrollAnim(0.1)} className="text-muted-foreground">
              From Series A startups to enterprise analytics departments.
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                {...scrollAnim(i * 0.08)}
                className="bg-card rounded-2xl border border-border p-6 flex flex-col hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    {t.metric}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-foreground flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
                  <div className={`h-9 w-9 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-xs shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm leading-tight">{t.author}</div>
                    <div className="text-xs text-muted-foreground">{t.role} · {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <motion.p {...scrollAnim()} className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Pricing</motion.p>
            <motion.h2 {...scrollAnim(0.05)} className="text-3xl md:text-4xl font-extrabold mb-3">
              Transparent, predictable pricing
            </motion.h2>
            <motion.p {...scrollAnim(0.1)} className="text-muted-foreground">
              Start free. Scale when you're ready. No hidden fees, no per-seat surprises.
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PRICING.map((plan, i) => (
              <motion.div
                key={i}
                {...scrollAnim(i * 0.07)}
                className={`rounded-2xl flex flex-col relative ${
                  plan.highlight
                    ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/25 ring-1 ring-primary/30 md:scale-[1.03]"
                    : "bg-card border border-border"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-[11px] font-extrabold px-4 py-1.5 rounded-full shadow-lg tracking-wide">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-7 pb-5">
                  <h3 className={`text-base font-bold mb-1 ${plan.highlight ? "text-primary-foreground" : ""}`}>{plan.name}</h3>
                  <div className="flex items-end gap-1 mt-3 mb-1">
                    <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                    {plan.period && <span className={`text-sm mb-1.5 ${plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{plan.period}</span>}
                  </div>
                  <p className={`text-sm mt-2 leading-relaxed ${plan.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{plan.description}</p>
                </div>
                <div className="px-7 pb-6 flex-1 flex flex-col">
                  <div className={`w-full h-px mb-5 ${plan.highlight ? "bg-primary-foreground/15" : "bg-border"}`} />
                  <ul className="space-y-3 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${plan.highlight ? "text-primary-foreground/75" : "text-primary"}`} />
                        <span className={plan.highlight ? "text-primary-foreground/90" : ""}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.href}>
                    <Button
                      className="w-full font-semibold"
                      variant={plan.highlight ? "secondary" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p {...scrollAnim(0.25)} className="text-center text-xs text-muted-foreground mt-8">
            All plans include a 30-day money-back guarantee · Annual billing saves 20%
          </motion.p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "hsl(222 47% 9%)" }} />
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-blue-600/15 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            {...scrollAnim()}
            className="inline-flex items-center gap-2 text-xs font-semibold bg-white/10 text-white/90 border border-white/15 rounded-full px-3.5 py-1.5 mb-8"
          >
            <GitBranch className="h-3 w-3" /> Joined by 10,000+ analysts worldwide
          </motion.div>
          <motion.h2
            {...scrollAnim(0.06)}
            className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight text-white"
          >
            Your data deserves better<br />than a spreadsheet.
          </motion.h2>
          <motion.p
            {...scrollAnim(0.12)}
            className="text-white/60 mb-10 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Join thousands of teams who stopped guessing and started knowing.
            Noteora turns raw data into clear, confident decisions.
          </motion.p>
          <motion.div
            {...scrollAnim(0.18)}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/sign-up">
              <Button
                size="lg"
                className="h-12 px-10 text-base font-bold bg-white text-blue-900 hover:bg-white/90 shadow-2xl"
              >
                Start for free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-10 text-base border-white/20 text-white/90 hover:bg-white/8 hover:text-white"
              >
                Talk to sales
              </Button>
            </Link>
          </motion.div>
          <motion.p
            {...scrollAnim(0.24)}
            className="text-xs text-white/35 mt-5"
          >
            No credit card required · Cancel anytime · SOC 2 certified
          </motion.p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border bg-muted/20 py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <Link href="/">
                <span className="text-lg font-extrabold tracking-tight cursor-pointer hover:text-primary transition-colors block mb-3">Noteora</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Data intelligence for the modern enterprise. A product of AGT Venture. Import, visualise, and share your data with confidence.
              </p>
              <p className="text-xs text-muted-foreground/60 mt-3 font-medium">Series A · $10M · 2026</p>
              <div className="flex gap-3 mt-5">
                {[Shield, Users, Globe].map((Icon, i) => (
                  <div key={i} className="h-8 w-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 cursor-pointer transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                ))}
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
                      <Link href={l.href}>
                        <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{l.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Noteora, Inc. · A product of AGT Venture. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">SOC 2 Type II</span>
              <span className="text-muted-foreground/30">·</span>
              <span className="text-xs text-muted-foreground">GDPR Ready</span>
              <span className="text-muted-foreground/30">·</span>
              <span className="text-xs text-muted-foreground">99.97% Uptime</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
