import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Zap, Database, Lock, LineChart, BellRing, FileText,
  Globe, Users, RefreshCw, Shield, BarChart3, Sparkles,
  CheckCircle2, ArrowRight
} from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast Processing",
    tagline: "Sub-200ms query responses, guaranteed.",
    desc: "Noteora is built on a high-performance query engine that processes your data in real time. Complex aggregations across millions of rows render in milliseconds — not minutes. We benchmark every release against a 200ms p95 target.",
    bullets: ["Instant chart rendering on datasets up to 10M rows", "Server-side query optimisation and intelligent caching", "WebSocket-powered live updates as data changes"],
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    gradientFrom: "from-amber-500/15",
    gradientTo: "to-orange-500/5",
  },
  {
    icon: Database,
    title: "Any Data Source",
    tagline: "If you have data, we can analyse it.",
    desc: "Stop fighting with ETL pipelines. Noteora accepts data in every format your team already uses. Upload a CSV, paste a JSON array, connect an external API endpoint, or type data directly into a spreadsheet-style grid.",
    bullets: ["CSV and Excel file upload (up to 100MB per file)", "REST API connectors with custom auth headers", "Manual data entry with column type detection", "Upcoming: native Postgres, BigQuery, and Snowflake connectors"],
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    gradientFrom: "from-blue-500/15",
    gradientTo: "to-cyan-500/5",
  },
  {
    icon: Lock,
    title: "Enterprise-Grade Security",
    tagline: "SOC 2 Type II certified. Zero compromises.",
    desc: "Security is not a feature at Noteora — it's the foundation everything is built on. Your data is encrypted in transit (TLS 1.3) and at rest (AES-256). Row-level security means every user sees only their own data, even on shared infrastructure.",
    bullets: ["SOC 2 Type II certified infrastructure", "GDPR and CCPA compliant data handling", "Clerk-powered SSO with MFA support", "Full audit logs on Enterprise plan"],
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    gradientFrom: "from-emerald-500/15",
    gradientTo: "to-teal-500/5",
  },
  {
    icon: LineChart,
    title: "12 Chart Types Out of the Box",
    tagline: "The right visual for every question.",
    desc: "Different questions need different visuals. Noteora ships with twelve chart types — and we add more every quarter based on customer feedback. Every chart is fully configurable: axes, colours, legends, annotations, and goal lines.",
    bullets: ["Line, area, bar, pie, donut, scatter, bubble", "KPI cards with trend indicators and goal lines", "Data tables with sorting, filtering, and pagination", "Radar and heatmap charts — more coming in Q3 2026"],
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    gradientFrom: "from-violet-500/15",
    gradientTo: "to-purple-500/5",
  },
  {
    icon: BellRing,
    title: "Real-time Alerts",
    tagline: "Know when something important happens — automatically.",
    desc: "Define thresholds on any metric in your dataset. When a value crosses the line, Noteora fires an alert instantly — no manual monitoring, no cron jobs. Get notified in-app, by email, or (coming soon) in Slack.",
    bullets: ["Threshold alerts on any numeric column", "Multi-condition triggers (e.g. revenue AND churn both spike)", "Alert history and acknowledgement tracking", "Slack integration coming in Q3 2026"],
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    gradientFrom: "from-rose-500/15",
    gradientTo: "to-pink-500/5",
  },
  {
    icon: FileText,
    title: "Auto-generated Reports",
    tagline: "From data to boardroom-ready PDF in seconds.",
    desc: "Composing a weekly report used to take hours. With Noteora, select your charts, add commentary, and generate a polished PDF in under 30 seconds. Schedule reports to send automatically every Monday morning.",
    bullets: ["Drag-and-drop report composition from your chart library", "Custom branding — logo, colours, and headers", "Scheduled delivery to any email address", "Executive summary AI writing (Pro and Enterprise plans)"],
    color: "text-sky-500",
    bg: "bg-sky-500/10",
    gradientFrom: "from-sky-500/15",
    gradientTo: "to-blue-500/5",
  },
  {
    icon: Sparkles,
    title: "AI Insights",
    tagline: "An analyst that works while you sleep.",
    desc: "Our AI Insights engine scans your datasets continuously and surfaces anomalies, trend reversals, and correlations you might have missed. It explains findings in plain English — no data science degree required.",
    bullets: ["Automated anomaly detection with severity scoring", "Trend forecasting with confidence intervals", "Natural language summaries of every insight", "Ask follow-up questions in plain English (coming Q3 2026)"],
    color: "text-primary",
    bg: "bg-primary/10",
    gradientFrom: "from-primary/15",
    gradientTo: "to-cyan-500/5",
  },
  {
    icon: Users,
    title: "Team Workspaces",
    tagline: "Collaborate without chaos.",
    desc: "Invite your whole team to a shared workspace. Granular roles ensure the right people can view, edit, or administer each project. Activity feeds keep everyone in sync.",
    bullets: ["Viewer, Editor, and Admin roles per workspace", "Project-level access controls", "Real-time activity feed", "Coming soon: Guest sharing with expiring links"],
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    gradientFrom: "from-indigo-500/15",
    gradientTo: "to-blue-500/5",
  },
];

export default function FeaturesPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/8 blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            <Sparkles className="h-3 w-3 mr-1.5" /> Everything you need
          </Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Every feature built for{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              real teams
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Noteora gives you everything you need to go from raw data to shared insight — without the complexity of traditional BI tools.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["Sub-200ms queries", "12 chart types", "SOC 2 certified", "AI-powered insights", "No data engineers needed"].map((f) => (
              <span key={f} className="flex items-center gap-1.5 text-sm text-muted-foreground border border-border rounded-full px-3.5 py-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`rounded-2xl border border-border overflow-hidden grid md:grid-cols-2 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className={`bg-gradient-to-br ${f.gradientFrom} ${f.gradientTo} p-10 flex items-center justify-center min-h-48`}>
                <div className={`h-20 w-20 rounded-2xl ${f.bg} flex items-center justify-center`}>
                  <f.icon className={`h-10 w-10 ${f.color}`} />
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className={`text-xs font-bold uppercase tracking-widest ${f.color} mb-2`}>{f.tagline}</div>
                <h2 className="text-2xl font-extrabold mb-3">{f.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{f.desc}</p>
                <ul className="space-y-2">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <BarChart3 className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold mb-4">See it for yourself</h2>
          <p className="text-muted-foreground mb-8">Start for free — no credit card required. You'll have your first dashboard in under 10 minutes.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/sign-up">
              <Button size="lg" className="w-full sm:w-auto">
                Start for free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">Book a demo</Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
