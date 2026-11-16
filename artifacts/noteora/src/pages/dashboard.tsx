import { useGetDashboardSummary, getGetDashboardSummaryQueryKey, useGetTrends, getGetTrendsQueryKey, useGetRecentActivity, getGetRecentActivityQueryKey, useGetInsights, getGetInsightsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FolderKanban, Database, BarChart3, FileText, Activity, TrendingUp, TrendingDown, Sparkles, Clock, CheckCircle, AlertTriangle, Info, Zap, Share2, RefreshCw, Bell, Users } from "lucide-react";
import { OnboardingChecklist } from "@/components/OnboardingChecklist";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const KPI_META = [
  { label: "Projects",   icon: FolderKanban, key: "totalProjects"  as const, trend: +12, color: "text-blue-500",    bg: "bg-blue-500/10"    },
  { label: "Datasets",   icon: Database,     key: "totalDatasets"  as const, trend: +8,  color: "text-violet-500", bg: "bg-violet-500/10"  },
  { label: "Charts",     icon: BarChart3,    key: "totalCharts"    as const, trend: +23, color: "text-cyan-500",   bg: "bg-cyan-500/10"    },
  { label: "Reports",    icon: FileText,     key: "totalReports"   as const, trend: +5,  color: "text-emerald-500",bg: "bg-emerald-500/10" },
  { label: "Total Rows", icon: Activity,     key: "totalRows"      as const, trend: +18, color: "text-amber-500",  bg: "bg-amber-500/10"   },
];

// ─── Live Feed ───────────────────────────────────────────────────────────────

type FeedEventType = "success" | "info" | "warning" | "ai";

interface FeedEvent {
  id: number;
  type: FeedEventType;
  icon: React.ElementType;
  title: string;
  detail: string;
  ts: Date;
}

const EVENT_POOL: Omit<FeedEvent, "id" | "ts">[] = [
  { type: "success", icon: CheckCircle,  title: "Dataset sync complete",      detail: "Q4_Revenue.csv · 1,247 rows imported" },
  { type: "ai",      icon: Sparkles,     title: "AI insight generated",       detail: "MRR up 18.3% compared to last month" },
  { type: "info",    icon: BarChart3,    title: "Chart added to dashboard",   detail: "Revenue Trend · pinned by you" },
  { type: "success", icon: Share2,       title: "Report delivered",           detail: "Q4 Summary → 4 recipients via email" },
  { type: "warning", icon: AlertTriangle,title: "Threshold alert triggered",  detail: "Churn rate exceeded 6% — check segments" },
  { type: "info",    icon: RefreshCw,    title: "Salesforce sync running",    detail: "API connector · ~30s remaining" },
  { type: "success", icon: CheckCircle,  title: "New project created",        detail: "\"APAC Growth Q1\" · 3 datasets linked" },
  { type: "ai",      icon: Zap,          title: "Anomaly detected",           detail: "Spike in EMEA conversions — +47% on Friday" },
  { type: "info",    icon: Users,        title: "Team member joined",         detail: "Riya Shah accepted your workspace invite" },
  { type: "success", icon: FileText,     title: "Report generated",           detail: "Monthly KPI Digest · PDF ready to share" },
  { type: "info",    icon: Database,     title: "Dataset updated",            detail: "marketing_data.xlsx · 890 rows refreshed" },
  { type: "ai",      icon: Sparkles,     title: "Forecast updated",           detail: "Q1 2026 MRR projected at $3.1M (+29%)" },
  { type: "warning", icon: Bell,         title: "Scheduled report delayed",   detail: "Weekly digest missed window — retrying" },
  { type: "success", icon: CheckCircle,  title: "Chart exported",             detail: "Revenue_by_Region.png · 2048 × 1024" },
  { type: "info",    icon: Info,         title: "API rate limit at 80%",      detail: "Salesforce connector · consider upgrading" },
];

const TYPE_STYLES: Record<FeedEventType, { dot: string; badge: string; badgeText: string; iconColor: string; bg: string }> = {
  success: { dot: "bg-emerald-500", badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", badgeText: "success",  iconColor: "text-emerald-500", bg: "bg-emerald-500/8" },
  info:    { dot: "bg-blue-500",    badge: "bg-blue-500/10 text-blue-600 border-blue-500/20",          badgeText: "info",     iconColor: "text-blue-500",    bg: "bg-blue-500/8"    },
  warning: { dot: "bg-amber-500",   badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",       badgeText: "alert",    iconColor: "text-amber-500",   bg: "bg-amber-500/8"   },
  ai:      { dot: "bg-violet-500",  badge: "bg-violet-500/10 text-violet-600 border-violet-500/20",    badgeText: "ai",       iconColor: "text-violet-500",  bg: "bg-violet-500/8"  },
};

function useLiveFeed() {
  const idRef = useRef(0);
  const poolRef = useRef([...EVENT_POOL].sort(() => Math.random() - 0.5));

  const makeEvent = (): FeedEvent => {
    if (poolRef.current.length === 0) poolRef.current = [...EVENT_POOL].sort(() => Math.random() - 0.5);
    const template = poolRef.current.pop()!;
    return { ...template, id: ++idRef.current, ts: new Date() };
  };

  const [events, setEvents] = useState<FeedEvent[]>(() =>
    Array.from({ length: 4 }, () => {
      const e = makeEvent();
      e.ts = new Date(Date.now() - Math.random() * 5 * 60000);
      return e;
    })
  );

  useEffect(() => {
    const schedule = () => {
      const delay = 4000 + Math.random() * 5000;
      return setTimeout(() => {
        setEvents(prev => [makeEvent(), ...prev].slice(0, 12));
        timerRef.current = schedule();
      }, delay);
    };
    const timerRef = { current: schedule() };
    return () => clearTimeout(timerRef.current);
  }, []);

  return events;
}

function LiveFeedPanel() {
  const events = useLiveFeed();
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => setPulse(p => !p), 1200);
    return () => clearInterval(iv);
  }, []);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            Live Activity Feed
          </CardTitle>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
            <span className={`h-2 w-2 rounded-full bg-emerald-500 transition-opacity duration-500 ${pulse ? "opacity-100" : "opacity-30"}`} />
            LIVE
          </div>
        </div>
        <CardDescription>Real-time events across your workspace</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden pr-2">
        <div className="space-y-1 overflow-y-auto max-h-[420px] pr-1 scrollbar-thin">
          <AnimatePresence initial={false}>
            {events.map((ev) => {
              const s = TYPE_STYLES[ev.type];
              const Icon = ev.icon;
              return (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, y: -12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.28 }}
                  className={`flex items-start gap-3 rounded-xl px-3 py-2.5 border border-transparent hover:bg-muted/40 transition-colors group ${ev.id === events[0]?.id ? s.bg + " border-border/60" : ""}`}
                >
                  <div className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${s.bg} border border-border/50`}>
                    <Icon className={`h-3.5 w-3.5 ${s.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold leading-snug truncate">{ev.title}</span>
                      <span className={`hidden group-hover:inline-flex text-[9px] font-bold px-1.5 py-0.5 rounded border ${s.badge} shrink-0`}>
                        {s.badgeText}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-snug truncate">{ev.detail}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground/60 shrink-0 mt-0.5 tabular-nums">
                    {ev.ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { user } = useUser();
  const { data: summary, isLoading: isLoadingSummary } = useGetDashboardSummary({ query: { queryKey: getGetDashboardSummaryQueryKey() } });
  const { data: trends, isLoading: isLoadingTrends } = useGetTrends({ query: { queryKey: getGetTrendsQueryKey() } });
  const { data: activity, isLoading: isLoadingActivity } = useGetRecentActivity({ query: { queryKey: getGetRecentActivityQueryKey() } });
  const { data: insights, isLoading: isLoadingInsights } = useGetInsights({ query: { queryKey: getGetInsightsQueryKey() } });

  // Auto-detect completed onboarding steps from real API data
  const apiDone: string[] = [];
  if (summary) {
    if ((summary.totalProjects ?? 0) > 0)  apiDone.push("project");
    if ((summary.totalDatasets ?? 0) > 0)  apiDone.push("dataset");
    if ((summary.totalCharts   ?? 0) > 0)  apiDone.push("chart");
    if ((summary.totalReports  ?? 0) > 0)  apiDone.push("report");
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {getGreeting()}{user?.firstName ? `, ${user.firstName}` : ""} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">Here's your data intelligence overview.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 border border-border rounded-lg px-3 py-2 w-fit">
          <Clock className="h-4 w-4" />
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* Onboarding checklist — shown until dismissed or all steps done */}
      <OnboardingChecklist apiDone={apiDone} />

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {KPI_META.map((stat, i) => {
          const value = summary?.[stat.key];
          return (
            <Card key={i} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
                <div className={`h-8 w-8 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingSummary ? (
                  <Skeleton className="h-7 w-20 mb-1" />
                ) : (
                  <div className="text-2xl font-bold">{value?.toLocaleString() ?? 0}</div>
                )}
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend > 0
                    ? <TrendingUp className="h-3 w-3 text-emerald-500" />
                    : <TrendingDown className="h-3 w-3 text-red-500" />
                  }
                  <span className={`text-xs font-medium ${stat.trend > 0 ? "text-emerald-500" : "text-red-500"}`}>
                    {stat.trend > 0 ? "+" : ""}{stat.trend}% this month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Area Chart + AI Insights */}
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Growth Trends</CardTitle>
            <CardDescription>Monthly creation activity across all resources</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            {isLoadingTrends ? (
              <Skeleton className="w-full h-full" />
            ) : trends ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCharts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDatasets" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px', fontSize: 12 }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                    cursor={{ stroke: 'hsl(var(--border))' }}
                  />
                  <Area type="monotone" dataKey="charts" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorCharts)" strokeWidth={2} name="Charts" />
                  <Area type="monotone" dataKey="datasets" stroke="hsl(var(--chart-2))" fillOpacity={1} fill="url(#colorDatasets)" strokeWidth={2} name="Datasets" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-muted-foreground gap-2">
                <BarChart3 className="h-8 w-8 opacity-40" />
                <p className="text-sm">No trend data yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="lg:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" /> AI Insights
            </CardTitle>
            <CardDescription>Automated analysis of your data</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-2.5">
            {isLoadingInsights
              ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)
              : insights?.length === 0
              ? (
                <div className="flex flex-col items-center justify-center h-full py-8 text-muted-foreground">
                  <Sparkles className="h-8 w-8 mb-2 opacity-40" />
                  <p className="text-sm">Insights will appear once you add data</p>
                </div>
              )
              : insights?.slice(0, 4).map((insight) => (
                <div key={insight.id} className="p-3 border border-border rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="font-semibold text-sm leading-snug">{insight.title}</span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] shrink-0 ${
                        insight.severity === 'high'
                          ? 'border-red-200 bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400'
                          : 'border-primary/20 bg-primary/5 text-primary'
                      }`}
                    >
                      {insight.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{insight.message}</p>
                </div>
              ))
            }
          </CardContent>
        </Card>
      </div>

      {/* Bottom: API Recent Activity + Live Feed */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Recent Activity (API-backed) */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest workspace actions</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingActivity ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
              </div>
            ) : !activity?.length ? (
              <div className="py-10 text-center text-muted-foreground">
                <Activity className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No activity yet — create a project or dataset to get started.</p>
              </div>
            ) : (
              <div className="space-y-0.5">
                {activity.slice(0, 10).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-muted/40 transition-colors group">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0 group-hover:bg-primary transition-colors" />
                    <div className="flex-1 min-w-0">
                      <span className="text-sm">{item.action}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground shrink-0 tabular-nums">{timeAgo(item.createdAt)}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Feed */}
        <LiveFeedPanel />

      </div>
    </div>
  );
}
