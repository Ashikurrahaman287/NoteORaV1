import { useGetDashboardSummary, getGetDashboardSummaryQueryKey, useGetTrends, getGetTrendsQueryKey, useGetRecentActivity, getGetRecentActivityQueryKey, useGetInsights, getGetInsightsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FolderKanban, Database, BarChart3, FileText, Activity, TrendingUp, TrendingDown, Sparkles, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, BarChart, Bar } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/react";
import { Badge } from "@/components/ui/badge";

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
  { label: "Projects", icon: FolderKanban, key: "totalProjects" as const, trend: +12, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Datasets", icon: Database, key: "totalDatasets" as const, trend: +8, color: "text-violet-500", bg: "bg-violet-500/10" },
  { label: "Charts", icon: BarChart3, key: "totalCharts" as const, trend: +23, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { label: "Reports", icon: FileText, key: "totalReports" as const, trend: +5, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Total Rows", icon: Activity, key: "totalRows" as const, trend: +18, color: "text-amber-500", bg: "bg-amber-500/10" },
];

export default function Dashboard() {
  const { user } = useUser();
  const { data: summary, isLoading: isLoadingSummary } = useGetDashboardSummary({ query: { queryKey: getGetDashboardSummaryQueryKey() } });
  const { data: trends, isLoading: isLoadingTrends } = useGetTrends({ query: { queryKey: getGetTrendsQueryKey() } });
  const { data: activity, isLoading: isLoadingActivity } = useGetRecentActivity({ query: { queryKey: getGetRecentActivityQueryKey() } });
  const { data: insights, isLoading: isLoadingInsights } = useGetInsights({ query: { queryKey: getGetInsightsQueryKey() } });

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

      {/* Charts + Insights */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Area chart */}
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
          <CardContent className="flex-1 space-y-3">
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

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4 text-muted-foreground" /> Recent Activity
          </CardTitle>
          <CardDescription>Latest actions across your workspace</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingActivity ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : !activity?.length ? (
            <div className="py-8 text-center text-muted-foreground">
              <Activity className="h-8 w-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No activity yet — start by creating a project or dataset.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {activity.slice(0, 8).map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-muted/40 transition-colors">
                  <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium">{item.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{timeAgo(item.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
