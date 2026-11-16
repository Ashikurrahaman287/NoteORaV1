import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Database, BarChart3, Globe, CheckCircle2, ArrowRight,
  Upload, Zap, FileText, Users, Lock, BellRing, Sparkles,
  RefreshCw, ChevronRight, Play
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: Upload,
    title: "Import your data",
    subtitle: "Any format. Any source. Zero friction.",
    color: "text-blue-500",
    iconBg: "bg-blue-500/10",
    gradientFrom: "from-blue-500/10",
    gradientTo: "to-cyan-500/5",
    desc: "Noteora accepts data in every format your team already uses. You don't need to reformat, rewrite, or run a pipeline before your data becomes useful — just bring it as-is.",
    details: [
      {
        title: "CSV & Excel Upload",
        desc: "Drag and drop files up to 100MB. Noteora automatically detects column types — dates, numbers, text, booleans — and shows you a live preview before you commit.",
      },
      {
        title: "REST API Connector",
        desc: "Point Noteora at any REST endpoint. Configure authentication headers, set a refresh interval (60 seconds minimum), and your data stays live without any manual exports.",
      },
      {
        title: "Manual Data Entry",
        desc: "A clean spreadsheet-style grid lets you type data directly. Great for small datasets or when you're combining data from multiple sources that don't have an API.",
      },
      {
        title: "Bulk Import",
        desc: "Import up to 10 files simultaneously. Each file is processed in parallel so you're never waiting for one to finish before the next starts.",
      },
    ],
    visual: [
      "Column type detection — automatic",
      "Duplicate row flagging — built in",
      "Null value handling — configurable",
      "Date format normalisation — always on",
      "Up to 10 million rows per dataset",
    ],
  },
  {
    number: "02",
    icon: BarChart3,
    title: "Build visualisations",
    subtitle: "From raw data to insights in under 5 minutes.",
    color: "text-violet-500",
    iconBg: "bg-violet-500/10",
    gradientFrom: "from-violet-500/10",
    gradientTo: "to-purple-500/5",
    desc: "The Noteora chart builder is opinionated in the best way — it makes sensible decisions by default so you can go from dataset to dashboard without reading documentation.",
    details: [
      {
        title: "12 Chart Types",
        desc: "Line, area, bar, grouped bar, stacked bar, pie, donut, scatter, bubble, radar, KPI card, and data table. Each type is optimised for a different kind of question.",
      },
      {
        title: "Drag-and-drop Configuration",
        desc: "Map any column to any axis in seconds. Set colours, labels, legends, and goal lines without touching any configuration file or writing any code.",
      },
      {
        title: "Dashboard Pinning",
        desc: "Pin your most important charts to a shared dashboard. Rearrange with drag and drop. Every team member sees the same view — no more emailing screenshots.",
      },
      {
        title: "AI Insights",
        desc: "The AI Insights engine runs in the background on every dataset. It surfaces anomalies, trend reversals, and correlations automatically — plain English, no prompts needed.",
      },
    ],
    visual: [
      "Real-time chart preview as you configure",
      "Responsive charts — look great on any screen",
      "Zoom and pan on time-series charts",
      "Export any chart as PNG or SVG",
      "Dark mode supported across all chart types",
    ],
  },
  {
    number: "03",
    icon: Globe,
    title: "Share insights",
    subtitle: "Get the right data to the right people instantly.",
    color: "text-emerald-500",
    iconBg: "bg-emerald-500/10",
    gradientFrom: "from-emerald-500/10",
    gradientTo: "to-teal-500/5",
    desc: "Insight is worthless if it stays on your screen. Noteora makes it effortless to share dashboards, auto-generate reports, and keep your whole team on the same page.",
    details: [
      {
        title: "PDF Reports",
        desc: "Select charts, add commentary, and generate a boardroom-ready PDF in under 30 seconds. Custom branding with your logo and colours on Pro and Enterprise plans.",
      },
      {
        title: "Scheduled Delivery",
        desc: "Set any report to arrive in inboxes automatically — every Monday morning, the first of the month, or any custom schedule. No manual steps, ever.",
      },
      {
        title: "Live Dashboard Sharing",
        desc: "Share a live dashboard link with anyone. Choose whether to require login or allow public access. Set an expiry date so links don't stay live forever.",
      },
      {
        title: "Team Workspaces",
        desc: "Invite colleagues with view, edit, or admin roles. Everyone sees the same live data. Activity feeds keep the team in sync without unnecessary meetings.",
      },
    ],
    visual: [
      "PDF export with custom branding",
      "Shareable dashboard links with expiry",
      "Slack notifications (coming Q3 2026)",
      "Role-based access — viewer / editor / admin",
      "Audit trail of who accessed what",
    ],
  },
];

const COMPARISON = [
  { feature: "No data engineer required", noteora: true, sheets: false, looker: false },
  { feature: "Sub-200ms query responses", noteora: true, sheets: false, looker: false },
  { feature: "12 chart types out of the box", noteora: true, sheets: false, looker: true },
  { feature: "AI-powered anomaly detection", noteora: true, sheets: false, looker: false },
  { feature: "Setup in under 10 minutes", noteora: true, sheets: true, looker: false },
  { feature: "Automated PDF reports", noteora: true, sheets: false, looker: true },
  { feature: "SOC 2 Type II certified", noteora: true, sheets: false, looker: true },
  { feature: "Usage-based pricing with free tier", noteora: true, sheets: true, looker: false },
];

const FAQS = [
  { q: "Do I need any technical knowledge to use Noteora?", a: "No. Noteora is designed for analysts, founders, and business teams — not data engineers. If you can use a spreadsheet, you can use Noteora. The chart builder is entirely visual, and no SQL or code is required." },
  { q: "How long does it take to set up?", a: "Most customers go from sign-up to their first live dashboard in under 10 minutes. The record is 6 minutes, set by a customer who uploaded a CSV and built three charts before their coffee finished brewing." },
  { q: "What happens to my data?", a: "Your data is stored securely on our SOC 2 Type II certified infrastructure, encrypted at rest (AES-256) and in transit (TLS 1.3). Row-level security ensures no one else can access your data. You can delete everything at any time from your account settings." },
  { q: "Can I connect my live database?", a: "Native Postgres, BigQuery, and Snowflake connectors are on our roadmap for Q3 2026. Today, you can use the REST API connector to pull data from any service that exposes an HTTP endpoint, or export from your database and upload as CSV." },
  { q: "What's the row limit per dataset?", a: "Starter plan: 100,000 rows per dataset. Pro plan: 10 million rows. Enterprise: unlimited. If you need more on a lower plan, contact us and we'll work something out." },
];

export default function HowItWorksPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/8 blur-[100px]" />
          <div className="absolute top-20 left-1/4 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[80px]" />
          <div className="absolute top-10 right-1/4 w-[250px] h-[250px] rounded-full bg-violet-500/5 blur-[80px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            <Play className="h-3 w-3 mr-1.5 fill-current" /> How it works
          </Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            From raw data to{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              shared insights
            </span>
            <br />in under 10 minutes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            No data engineers. No SQL. No setup fees. Noteora is three simple steps — import, visualise, share — done in the time it takes to make a coffee.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/sign-up">
              <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-xl shadow-primary/25">
                Get started free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                See all features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Step overview strip */}
      <section className="py-6 px-6 border-y border-border bg-muted/20">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex items-center gap-0">
              <div className="flex items-center gap-3 px-6">
                <div className={`h-8 w-8 rounded-full ${step.iconBg} flex items-center justify-center`}>
                  <step.icon className={`h-4 w-4 ${step.color}`} />
                </div>
                <span className="font-bold text-sm">{step.number} · {step.title}</span>
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Detailed steps */}
      {STEPS.map((step, idx) => (
        <section key={step.number} className={`py-20 px-6 ${idx % 2 === 1 ? "bg-muted/20 border-y border-border" : ""}`}>
          <div className="max-w-5xl mx-auto">
            {/* Step header */}
            <div className="flex items-start gap-5 mb-12">
              <div className={`h-16 w-16 rounded-2xl ${step.iconBg} flex items-center justify-center shrink-0`}>
                <step.icon className={`h-8 w-8 ${step.color}`} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className={`text-sm font-extrabold uppercase tracking-widest ${step.color}`}>Step {step.number}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-2">{step.title}</h2>
                <p className={`font-semibold text-base ${step.color}`}>{step.subtitle}</p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-12 max-w-3xl">{step.desc}</p>

            {/* Detail cards + visual */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
                {step.details.map((d) => (
                  <div key={d.title} className="rounded-2xl border border-border p-6 hover:shadow-sm hover:border-primary/20 transition-all">
                    <h3 className="font-bold text-base mb-2">{d.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>

              <div className={`rounded-2xl bg-gradient-to-br ${step.gradientFrom} ${step.gradientTo} border border-border p-6 flex flex-col justify-center`}>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">What's included</p>
                <ul className="space-y-3">
                  {step.visual.map((v) => (
                    <li key={v} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className={`h-4 w-4 ${step.color} mt-0.5 shrink-0`} />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* How data flows */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Under the hood</p>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">How your data flows through Noteora</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Every query is fast by design. Here's why.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: Upload, title: "Ingest", desc: "Your file or API response is received, parsed, and validated in real time.", color: "text-blue-500", bg: "bg-blue-500/10" },
              { icon: Zap, title: "Normalise", desc: "Column types are detected, dates standardised, and pre-aggregations computed once at import time.", color: "text-amber-500", bg: "bg-amber-500/10" },
              { icon: Database, title: "Cache", desc: "Query plans and result sets are cached. 78% of chart renders are served from cache — no database hit.", color: "text-violet-500", bg: "bg-violet-500/10" },
              { icon: BarChart3, title: "Render", desc: "Your chart renders in the browser at sub-200ms p95. Data stays fresh via smart background invalidation.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
            ].map((item, i) => (
              <div key={item.title} className="relative">
                <div className="rounded-2xl border border-border p-6 h-full">
                  <div className={`h-10 w-10 rounded-xl ${item.bg} flex items-center justify-center mb-4`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div className="text-3xl font-black text-border/40 mb-2">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
                {i < 3 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40 z-10" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            {[
              { value: "47ms", label: "Median query time (p50)" },
              { value: "168ms", label: "p95 query time (our target: <200ms)" },
              { value: "78%", label: "Chart renders served from cache" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-muted/40 border border-border py-5 px-4">
                <p className="text-3xl font-extrabold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 px-6 bg-muted/20 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Why Noteora</p>
            <h2 className="text-3xl md:text-4xl font-extrabold">Compared to the alternatives</h2>
          </div>

          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="grid grid-cols-4 bg-muted/50 border-b border-border text-sm font-bold">
              <div className="px-6 py-4">Feature</div>
              <div className="px-4 py-4 text-center text-primary">Noteora</div>
              <div className="px-4 py-4 text-center text-muted-foreground">Google Sheets</div>
              <div className="px-4 py-4 text-center text-muted-foreground">Looker</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-4 text-sm ${i !== COMPARISON.length - 1 ? "border-b border-border" : ""}`}>
                <div className="px-6 py-4 font-medium">{row.feature}</div>
                {([row.noteora, row.sheets, row.looker] as boolean[]).map((val, j) => (
                  <div key={j} className={`px-4 py-4 flex justify-center items-center ${j === 0 ? "bg-primary/3" : ""}`}>
                    {val
                      ? <CheckCircle2 className={`h-5 w-5 ${j === 0 ? "text-primary" : "text-emerald-500"}`} />
                      : <span className="h-5 w-5 flex items-center justify-center text-muted-foreground/30 text-lg">—</span>
                    }
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Questions</p>
            <h2 className="text-3xl font-extrabold">Frequently asked</h2>
          </div>
          <div className="space-y-0 rounded-2xl border border-border overflow-hidden">
            {FAQS.map((faq, i) => (
              <details key={i} className={`group ${i !== FAQS.length - 1 ? "border-b border-border" : ""}`}>
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-semibold text-sm list-none hover:bg-muted/30 transition-colors">
                  {faq.q}
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform shrink-0 ml-3" />
                </summary>
                <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center border-t border-border bg-gradient-to-b from-background to-primary/5">
        <div className="max-w-2xl mx-auto">
          <Sparkles className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-extrabold mb-4">Ready to see it for yourself?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Start for free — no credit card required. Your first dashboard in under 10 minutes, guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-semibold shadow-xl shadow-primary/20">
                Get started free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base">
                Book a demo
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-5">No credit card required · Free forever on Starter · Cancel anytime</p>
        </div>
      </section>
    </PublicLayout>
  );
}
