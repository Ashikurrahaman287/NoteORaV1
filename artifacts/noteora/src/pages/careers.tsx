import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Clock, ArrowRight, Heart, Zap, Globe, Shield } from "lucide-react";

const PERKS = [
  { icon: Heart, title: "Generous equity", desc: "Every employee owns a meaningful piece of the company. We're building this together.", color: "text-rose-500", bg: "bg-rose-500/10" },
  { icon: Globe, title: "Remote-first", desc: "Work from anywhere. We have hubs in San Francisco, London, and Singapore but you don't have to use them.", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: Zap, title: "$3,000 learning budget", desc: "Conferences, courses, books — invest in yourself and we'll invest right alongside you.", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: Shield, title: "Full health coverage", desc: "Medical, dental, and vision fully covered for you and your dependents. No surprises.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
];

const OPENINGS = [
  { dept: "Engineering", title: "Senior Full-Stack Engineer (TypeScript / React)", location: "Remote (US/EU)", type: "Full-time", level: "Senior" },
  { dept: "Engineering", title: "Backend Engineer – Data Pipeline", location: "Remote (Worldwide)", type: "Full-time", level: "Mid–Senior" },
  { dept: "Engineering", title: "DevOps / Platform Engineer", location: "Remote (US)", type: "Full-time", level: "Senior" },
  { dept: "Product", title: "Senior Product Manager – Analytics", location: "San Francisco · Hybrid", type: "Full-time", level: "Senior" },
  { dept: "Design", title: "Product Designer (Data Visualisation)", location: "Remote (Worldwide)", type: "Full-time", level: "Mid–Senior" },
  { dept: "Marketing", title: "Growth Marketing Manager", location: "Remote (US/EU)", type: "Full-time", level: "Mid" },
  { dept: "Sales", title: "Account Executive – Mid-Market", location: "San Francisco · On-site", type: "Full-time", level: "Mid–Senior" },
  { dept: "Customer Success", title: "Customer Success Manager", location: "Remote (US)", type: "Full-time", level: "Mid" },
];

const DEPTS = [...new Set(OPENINGS.map((o) => o.dept))];

const DEPT_COLORS: Record<string, string> = {
  Engineering: "bg-violet-500/10 text-violet-600",
  Product: "bg-blue-500/10 text-blue-600",
  Design: "bg-rose-500/10 text-rose-600",
  Marketing: "bg-amber-500/10 text-amber-600",
  Sales: "bg-emerald-500/10 text-emerald-600",
  "Customer Success": "bg-sky-500/10 text-sky-600",
};

export default function CareersPage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-primary/8 blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            We're hiring · 8 open roles
          </Badge>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Build the future of{" "}
            <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
              data intelligence
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're a small team doing big things. If you love great craft, move fast, and want to build something that genuinely helps people — you'll fit right in.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 px-6 bg-muted/20 border-y border-border">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold mb-8 text-center">Why join Noteora?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PERKS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border bg-background p-6">
                <div className={`h-10 w-10 rounded-xl ${p.bg} flex items-center justify-center mb-4`}>
                  <p.icon className={`h-5 w-5 ${p.color}`} />
                </div>
                <h3 className="font-bold text-sm mb-2">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">Open roles</p>
          <h2 className="text-3xl font-extrabold mb-10">Current openings</h2>

          {DEPTS.map((dept) => (
            <div key={dept} className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">{dept}</h3>
              <div className="space-y-3">
                {OPENINGS.filter((o) => o.dept === dept).map((job) => (
                  <div key={job.title} className="rounded-xl border border-border p-5 hover:shadow-sm transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${DEPT_COLORS[dept]}`}>{job.level}</span>
                      </div>
                      <h4 className="font-bold group-hover:text-primary transition-colors">{job.title}</h4>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{job.type}</span>
                      </div>
                    </div>
                    <Link href="/contact">
                      <Button size="sm" variant="outline" className="shrink-0">
                        Apply <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-dashed border-border p-8 text-center mt-8">
            <h3 className="font-bold mb-2">Don't see your role?</h3>
            <p className="text-sm text-muted-foreground mb-4">We're always interested in exceptional people. Send us your CV and we'll keep you in mind.</p>
            <Link href="/contact">
              <Button variant="outline">Send a speculative application</Button>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
