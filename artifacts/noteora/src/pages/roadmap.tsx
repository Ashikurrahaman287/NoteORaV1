import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, CheckCircle2, Sparkles } from "lucide-react";

const STATUSES = [
  { key: "shipped", label: "Recently shipped", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", badge: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20" },
  { key: "building", label: "In progress", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10", badge: "bg-amber-500/10 text-amber-700 border-amber-500/20" },
  { key: "planned", label: "Planned", icon: Clock, color: "text-blue-500", bg: "bg-blue-500/10", badge: "bg-blue-500/10 text-blue-700 border-blue-500/20" },
  { key: "exploring", label: "Exploring", icon: Sparkles, color: "text-violet-500", bg: "bg-violet-500/10", badge: "bg-violet-500/10 text-violet-700 border-violet-500/20" },
];

const ITEMS = [
  { status: "shipped", title: "AI Insights Engine", desc: "Automatically surfaces anomalies, trends, and opportunities across your datasets without manual prompts.", quarter: "Q2 2026", votes: 312 },
  { status: "shipped", title: "Team Workspaces", desc: "Invite collaborators with granular roles (viewer, editor, admin) and share dashboards across your organisation.", quarter: "Q1 2026", votes: 248 },
  { status: "shipped", title: "Custom Report Templates", desc: "Save your favourite report layouts and reuse them across projects in seconds.", quarter: "Q1 2026", votes: 189 },
  { status: "shipped", title: "Real-time Alerts", desc: "Set metric thresholds and get notified via email or in-app when they're crossed.", quarter: "Q4 2025", votes: 201 },
  { status: "building", title: "Natural Language Queries", desc: "Ask your data a question in plain English — \"What was our fastest-growing product last quarter?\" — and get an instant chart.", quarter: "Q3 2026", votes: 489 },
  { status: "building", title: "Native Slack Integration", desc: "Push dashboard snapshots and alert notifications directly to your Slack channels on a schedule.", quarter: "Q3 2026", votes: 367 },
  { status: "building", title: "Scheduled Reports", desc: "Set any report to email automatically — daily, weekly, or monthly — to any stakeholder, no login required.", quarter: "Q2 2026", votes: 294 },
  { status: "planned", title: "Python & SQL Notebooks", desc: "Run Python or SQL directly against your datasets inside Noteora. No infrastructure, no setup.", quarter: "Q4 2026", votes: 412 },
  { status: "planned", title: "Native Postgres / BigQuery Connectors", desc: "Connect directly to your existing databases and query them live — no ETL required.", quarter: "Q3 2026", votes: 378 },
  { status: "planned", title: "White-label Dashboards", desc: "Embed public-facing, branded dashboards on your own website or product with a single script tag.", quarter: "Q4 2026", votes: 256 },
  { status: "planned", title: "Audit Logs (Enterprise)", desc: "Full tamper-proof audit logs of every action in your organisation's workspace — who did what, when.", quarter: "Q3 2026", votes: 203 },
  { status: "exploring", title: "Mobile App", desc: "A native iOS and Android app for checking dashboards and alerts on the go.", quarter: "2027", votes: 534 },
  { status: "exploring", title: "AI Report Writer", desc: "Turn any dashboard into a written executive summary in one click — complete with data-backed narratives.", quarter: "2027", votes: 401 },
  { status: "exploring", title: "Data Quality Monitoring", desc: "Automatically detect broken pipelines, schema drift, and anomalous values before your stakeholders do.", quarter: "2027", votes: 289 },
];

export default function RoadmapPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">What's coming</p>
          <h1 className="text-5xl font-extrabold mb-4">Product Roadmap</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Here's what we're building, what we're planning, and what we're still exploring. Upvotes help us prioritise — let us know what matters most to you.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Last updated: <strong>May 2026</strong></p>
        </div>

        {STATUSES.map((status) => {
          const items = ITEMS.filter((i) => i.status === status.key);
          const cfg = status;
          return (
            <div key={status.key} className="max-w-4xl mx-auto mb-14">
              <div className="flex items-center gap-2.5 mb-6">
                <div className={`h-8 w-8 rounded-lg ${cfg.bg} flex items-center justify-center`}>
                  <cfg.icon className={`h-4.5 w-4.5 ${cfg.color}`} />
                </div>
                <h2 className="text-xl font-extrabold">{cfg.label}</h2>
                <span className="text-sm text-muted-foreground">({items.length})</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {items.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border p-6 hover:shadow-sm transition-shadow flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-base leading-snug">{item.title}</h3>
                      <Badge variant="outline" className={`text-xs shrink-0 ${cfg.badge}`}>{item.quarter}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <span className="text-base">▲</span>
                        <span className="font-medium">{item.votes}</span>
                        <span>votes</span>
                      </button>
                      <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Request feature */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-dashed border-border p-10 text-center">
          <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
          <h3 className="text-xl font-extrabold mb-2">Don't see what you need?</h3>
          <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">Send us your idea. Every feature request is read by the product team, and the most-requested ones make it onto this page.</p>
          <a href="/contact">
            <button className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
              Request a feature
            </button>
          </a>
        </div>
      </section>
    </PublicLayout>
  );
}
