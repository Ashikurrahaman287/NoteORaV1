import { useGetDashboardSummary, getGetDashboardSummaryQueryKey, useGetTrends, getGetTrendsQueryKey, useGetRecentActivity, getGetRecentActivityQueryKey, useGetInsights, getGetInsightsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FolderKanban, Database, BarChart3, FileText, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: summary, isLoading: isLoadingSummary } = useGetDashboardSummary({ query: { queryKey: getGetDashboardSummaryQueryKey() } });
  const { data: trends, isLoading: isLoadingTrends } = useGetTrends({ query: { queryKey: getGetTrendsQueryKey() } });
  const { data: activity, isLoading: isLoadingActivity } = useGetRecentActivity({ query: { queryKey: getGetRecentActivityQueryKey() } });
  const { data: insights, isLoading: isLoadingInsights } = useGetInsights({ query: { queryKey: getGetInsightsQueryKey() } });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your data intelligence.</p>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[
          { label: "Projects", value: summary?.totalProjects, icon: FolderKanban },
          { label: "Datasets", value: summary?.totalDatasets, icon: Database },
          { label: "Charts", value: summary?.totalCharts, icon: BarChart3 },
          { label: "Reports", value: summary?.totalReports, icon: FileText },
          { label: "Total Rows", value: summary?.totalRows, icon: Activity }
        ].map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoadingSummary ? (
                <Skeleton className="h-8 w-[100px]" />
              ) : (
                <div className="text-2xl font-bold">{stat.value?.toLocaleString() || 0}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* Main Chart */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Growth Trends</CardTitle>
            <CardDescription>Monthly creation activity across resources</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {isLoadingTrends ? (
              <Skeleton className="w-full h-full" />
            ) : trends ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCharts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Area type="monotone" dataKey="charts" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorCharts)" strokeWidth={2} />
                  <Line type="monotone" dataKey="datasets" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">No data available</div>
            )}
          </CardContent>
        </Card>

        {/* Activity & Insights */}
        <div className="md:col-span-3 space-y-6">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingInsights ? (
                Array.from({length: 3}).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)
              ) : insights?.slice(0, 3).map((insight) => (
                <div key={insight.id} className="p-3 border rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{insight.title}</span>
                    <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${insight.severity === 'high' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                      {insight.type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{insight.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}