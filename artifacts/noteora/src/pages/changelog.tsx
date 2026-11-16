import { PublicLayout } from "@/components/layout/PublicLayout";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wrench, Zap, Bug, Shield } from "lucide-react";

const RELEASES = [
  {
    version: "1.4.0",
    date: "April 28, 2026",
    type: "feature",
    highlights: ["AI Insights engine — surfaces anomalies, trends, and opportunities automatically", "New KPI chart type with goal lines and sparkline history", "Bulk dataset import via drag-and-drop (supports up to 10 files at once)", "Dashboard shared links with configurable expiry"],
    fixes: ["Fixed chart legend overflow on small screens", "Fixed date formatting inconsistency in French locale"],
    improvements: ["50% faster initial dashboard load via server-side caching", "Improved mobile sidebar navigation"],
  },
  {
    version: "1.3.0",
    date: "March 15, 2026",
    type: "feature",
    highlights: ["Custom report templates — save and reuse your favourite layouts", "Team workspaces — invite collaborators with view, edit, or admin roles", "API key management — create, rotate, and revoke keys from Settings"],
    fixes: ["Fixed pagination in Datasets table for large datasets (>10k rows)", "Fixed notification badge count not clearing after read"],
    improvements: ["Recharts upgraded for better tooltips and zoom on line charts", "Faster CSV parser — 2× improvement for files >50MB"],
  },
  {
    version: "1.2.0",
    date: "February 1, 2026",
    type: "feature",
    highlights: ["Dark mode — a deep, beautiful dark theme across all pages", "Donut chart type added to Analytics builder", "Real-time alerts — set thresholds on any metric and get notified via email", "Noteora raised $10M Series A 🎉"],
    fixes: ["Fixed chart axis labels being cut off on export", "Fixed sign-up flow on Safari iOS"],
    improvements: ["Sidebar redesigned with dark navy theme and cleaner active states", "Clerk authentication upgraded to latest SDK"],
  },
  {
    version: "1.1.0",
    date: "December 10, 2025",
    type: "feature",
    highlights: ["Reports module — compose multi-chart PDF reports in seconds", "Notifications centre — in-app alerts for dataset imports, report completions, and team activity", "Project archiving — keep your workspace clean without deleting data"],
    fixes: ["Fixed dataset column type detection for mixed-format CSVs", "Fixed report generation hanging on datasets with null values"],
    improvements: ["Dashboard KPI cards now show period-over-period trends", "Chart configuration panel redesigned for clarity"],
  },
  {
    version: "1.0.0",
    date: "October 1, 2025",
    type: "launch",
    highlights: ["🚀 Public launch!", "Core dataset management (CSV, Excel, manual, API)", "Analytics builder with 8 chart types (line, bar, area, pie, scatter, bubble, radar, table)", "Project-based organisation", "Clerk authentication with Google SSO", "Starter, Pro, and Enterprise plans"],
    fixes: [],
    improvements: [],
  },
  {
    version: "0.9.0 (Beta)",
    date: "July 15, 2025",
    type: "beta",
    highlights: ["Private beta launched to 50 design-partner companies", "Core import pipeline and chart builder functional", "Dashboard pinning and sharing"],
    fixes: ["Numerous stability fixes based on beta feedback"],
    improvements: ["Reduced p95 query latency from 900ms to 180ms"],
  },
];

const TYPE_CONFIG = {
  feature: { label: "New release", color: "bg-primary/10 text-primary border-primary/20", dot: "bg-primary" },
  launch: { label: "Launch", color: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20", dot: "bg-emerald-500" },
  beta: { label: "Beta", color: "bg-violet-500/10 text-violet-700 border-violet-500/20", dot: "bg-violet-500" },
};

export default function ChangelogPage() {
  return (
    <PublicLayout>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-14">
            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">What's new</p>
            <h1 className="text-5xl font-extrabold mb-4">Changelog</h1>
            <p className="text-muted-foreground text-lg">Every release, every fix, every improvement — documented here.</p>
          </div>

          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-0 w-px bg-border" />

            <div className="space-y-14">
              {RELEASES.map((release) => {
                const cfg = TYPE_CONFIG[release.type as keyof typeof TYPE_CONFIG];
                return (
                  <div key={release.version} className="relative pl-8">
                    <div className={`absolute left-0 top-2 h-3.5 w-3.5 rounded-full ${cfg.dot} ring-4 ring-background`} />

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h2 className="text-2xl font-extrabold">v{release.version}</h2>
                      <Badge variant="outline" className={`text-xs ${cfg.color}`}>{cfg.label}</Badge>
                      <span className="text-sm text-muted-foreground">{release.date}</span>
                    </div>

                    {release.highlights.length > 0 && (
                      <div className="mb-5">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                          <Sparkles className="h-3.5 w-3.5" /> Highlights
                        </div>
                        <ul className="space-y-2">
                          {release.highlights.map((h) => (
                            <li key={h} className="flex items-start gap-2 text-sm">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {release.improvements.length > 0 && (
                      <div className="mb-5">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                          <Zap className="h-3.5 w-3.5" /> Improvements
                        </div>
                        <ul className="space-y-2">
                          {release.improvements.map((imp) => (
                            <li key={imp} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                              {imp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {release.fixes.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                          <Bug className="h-3.5 w-3.5" /> Bug fixes
                        </div>
                        <ul className="space-y-2">
                          {release.fixes.map((fix) => (
                            <li key={fix} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
                              {fix}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
