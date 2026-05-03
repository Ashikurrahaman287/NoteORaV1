import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sparkles, Users, Globe, TrendingUp, Heart, Shield, Zap } from "lucide-react";

const TEAM = [
  { name: "Arjun Gupta", role: "CEO & Co-founder", bio: "Former VP of Engineering at Databricks. Built analytics systems at scale for over a decade.", avatar: "AG", color: "bg-blue-600" },
  { name: "Tomás Rivera", role: "CTO & Co-founder", bio: "Ex-Google. Architected real-time data pipelines serving billions of events per day.", avatar: "TR", color: "bg-violet-600" },
  { name: "Lena Fischer", role: "Chief Product Officer", bio: "Led product at Looker before its acquisition by Google. Obsessed with making data accessible to everyone.", avatar: "LF", color: "bg-emerald-600" },
  { name: "Kwame Asante", role: "Head of Engineering", bio: "Previously Staff Engineer at Stripe. Loves distributed systems and well-typed code.", avatar: "KA", color: "bg-amber-600" },
  { name: "Priya Mehta", role: "Head of Design", bio: "Designed interfaces for over 50 SaaS products. Believes great data tools should feel effortless.", avatar: "PM", color: "bg-rose-600" },
  { name: "Daniel Park", role: "VP of Sales", bio: "Grew ARR from $0 to $20M at two previous startups. Loves helping teams unlock the value in their data.", avatar: "DP", color: "bg-sky-600" },
];

const VALUES = [
  { icon: Zap, title: "Speed by Default", desc: "Every decision, every feature, every line of code is evaluated against a single question: is this faster for our users?", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: Shield, title: "Trust is Non-Negotiable", desc: "We treat customer data with the same care we'd want for our own. Security, privacy, and reliability are not features — they're the foundation.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: Heart, title: "Empathy First", desc: "We build for humans, not personas. Every support ticket is a gift. Every piece of feedback makes us better.", color: "text-rose-500", bg: "bg-rose-500/10" },
  { icon: Globe, title: "Radical Transparency", desc: "We share our roadmap, our uptime, our mistakes. Transparency builds the kind of trust that lasts.", color: "text-blue-500", bg: "bg-blue-500/10" },
];

const MILESTONES = [
  { year: "2024 Q3", event: "Noteora founded by AGT Venture in San Francisco" },
  { year: "2024 Q4", event: "Closed $2M pre-seed round to build the core platform" },
  { year: "2025 Q1", event: "Launched private beta with 50 design-partner companies" },
  { year: "2025 Q3", event: "Public launch — 500 teams onboarded in the first month" },
  { year: "2025 Q4", event: "Reached $1M ARR and expanded to EMEA" },
  { year: "2026 Q1", event: "Raised $10M Series A led by Horizon Ventures — building the AI analytics layer" },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/8 blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            <Sparkles className="h-3 w-3 mr-1.5" /> Founded by AGT Venture
          </Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            We're building the future of{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              data intelligence
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Noteora was born from a simple frustration: brilliant teams were drowning in spreadsheets and expensive BI tools that required dedicated data engineers just to answer basic questions.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6 border-y border-border bg-muted/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "$10M", label: "Raised in 2026" },
            { value: "500+", label: "Companies" },
            { value: "6", label: "Countries" },
            { value: "30+", label: "Team members" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Our story</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">From venture studio to product</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-5 text-muted-foreground leading-relaxed">
            <p>
              Noteora started inside <strong className="text-foreground">AGT Venture</strong> — a San Francisco-based venture studio focused on building category-defining B2B software companies. AGT Venture has a track record of spinning out products that reach scale: its portfolio companies have collectively raised over $80M and serve customers in 30+ countries.
            </p>
            <p>
              In mid-2024, the AGT team noticed a recurring pattern in portfolio companies: every founder eventually reached a point where they needed real-time visibility into their business metrics, but the existing tools were either too complex (Looker, Power BI) or too simple (Google Sheets). There was a clear gap for a product that felt as intuitive as a spreadsheet but as powerful as a full BI suite.
            </p>
            <p>
              We built Noteora to fill that gap. The product is opinionated — we make the hard decisions so you don't have to — and obsessively fast. From the first import to the first shared dashboard should take less than 10 minutes. Always.
            </p>
            <p>
              In early 2026, we closed a <strong className="text-foreground">$10M Series A</strong> led by Horizon Ventures, with participation from AGT Venture and a group of angel investors including former executives from Databricks, Snowflake, and Stripe. The capital is being deployed into our AI analytics layer — giving every team a data analyst that never sleeps.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Timeline</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10">How we got here</h2>
          <div className="relative">
            <div className="absolute left-[76px] top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-16 text-right shrink-0">
                    <span className="text-xs font-bold text-muted-foreground">{m.year}</span>
                  </div>
                  <div className="relative mt-0.5">
                    <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                  </div>
                  <p className="text-sm leading-relaxed pt-0.5">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3 text-center">What we believe</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">Our values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border p-7 hover:shadow-sm transition-shadow">
                <div className={`h-10 w-10 rounded-xl ${v.bg} flex items-center justify-center mb-4`}>
                  <v.icon className={`h-5 w-5 ${v.color}`} />
                </div>
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3 text-center">The people</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-center">Meet the team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TEAM.map((m) => (
              <div key={m.name} className="rounded-2xl border border-border p-6 hover:shadow-sm transition-shadow">
                <div className={`h-14 w-14 rounded-2xl ${m.color} flex items-center justify-center text-white font-bold text-lg mb-4`}>
                  {m.avatar}
                </div>
                <h3 className="font-bold text-base">{m.name}</h3>
                <p className="text-xs text-primary font-medium mb-3">{m.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <Users className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold mb-4">Want to join us?</h2>
          <p className="text-muted-foreground mb-8">We're a small, fast-moving team that cares deeply about craft. Check out our open roles.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/careers">
              <Button size="lg">View open roles</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">Get in touch</Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
