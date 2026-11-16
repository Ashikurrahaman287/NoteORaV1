import { useState } from "react";
import { useListCharts, getListChartsQueryKey, useCreateChart, useDeleteChart, useListProjects, getListProjectsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, BarChart3, Trash2, TrendingUp, PieChart, AreaChart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  BarChart, Bar, LineChart, Line, PieChart as RPieChart, Pie, Cell,
  AreaChart as RAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const chartTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  line: TrendingUp,
  bar: BarChart3,
  area: AreaChart,
  pie: PieChart,
  donut: PieChart,
};

const CHART_COLORS = ["hsl(235 86% 65%)", "hsl(280 80% 60%)", "hsl(160 70% 45%)", "hsl(30 90% 60%)", "hsl(0 80% 60%)"];

const SAMPLE_DATA = [
  { name: "Jan", value: 400, value2: 240 },
  { name: "Feb", value: 300, value2: 380 },
  { name: "Mar", value: 600, value2: 290 },
  { name: "Apr", value: 800, value2: 430 },
  { name: "May", value: 500, value2: 550 },
  { name: "Jun", value: 900, value2: 670 },
];
const PIE_DATA = [
  { name: "Category A", value: 400 },
  { name: "Category B", value: 300 },
  { name: "Category C", value: 200 },
  { name: "Category D", value: 100 },
];

function ChartPreview({ chartType }: { chartType: string }) {
  const style = { width: "100%", height: 160 };
  if (chartType === "bar")
    return (
      <ResponsiveContainer {...style}>
        <BarChart data={SAMPLE_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
          <YAxis fontSize={10} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
          <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
          <Bar dataKey="value" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  if (chartType === "area")
    return (
      <ResponsiveContainer {...style}>
        <RAreaChart data={SAMPLE_DATA}>
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS[0]} stopOpacity={0.3} />
              <stop offset="95%" stopColor={CHART_COLORS[0]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
          <YAxis fontSize={10} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
          <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
          <Area type="monotone" dataKey="value" stroke={CHART_COLORS[0]} fill="url(#areaGrad)" strokeWidth={2} />
        </RAreaChart>
      </ResponsiveContainer>
    );
  if (chartType === "pie" || chartType === "donut")
    return (
      <ResponsiveContainer {...style}>
        <RPieChart>
          <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={chartType === "donut" ? 40 : 0} outerRadius={60} dataKey="value">
            {PIE_DATA.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
        </RPieChart>
      </ResponsiveContainer>
    );
  return (
    <ResponsiveContainer {...style}>
      <LineChart data={SAMPLE_DATA}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
        <YAxis fontSize={10} tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" />
        <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
        <Line type="monotone" dataKey="value" stroke={CHART_COLORS[0]} strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="value2" stroke={CHART_COLORS[1]} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  projectId: z.coerce.number().positive("Select a project"),
  chartType: z.enum(["line", "bar", "pie", "area", "donut", "table", "kpi", "comparison"]),
  xAxis: z.string().optional(),
  yAxis: z.string().optional(),
  pinnedToDashboard: z.boolean().default(false),
});

export default function Analytics() {
  const queryClient = useQueryClient();
  const { data: charts, isLoading } = useListCharts({ query: { queryKey: getListChartsQueryKey() } });
  const { data: projects } = useListProjects({ query: { queryKey: getListProjectsQueryKey() } });
  const createChart = useCreateChart();
  const deleteChart = useDeleteChart();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", projectId: 0, chartType: "line", xAxis: "", yAxis: "", pinnedToDashboard: false },
  });

  const watchedType = form.watch("chartType");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createChart.mutate(
      { data: { ...values, xAxis: values.xAxis ?? null, yAxis: values.yAxis ?? null } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListChartsQueryKey() });
          setOpen(false);
          form.reset();
        },
      }
    );
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this chart?")) {
      deleteChart.mutate({ id }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListChartsQueryKey() }) });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Build and manage your data visualizations.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-new-chart"><Plus className="mr-2 h-4 w-4" /> New Chart</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Chart</DialogTitle>
            </DialogHeader>
            <div className="rounded-lg border bg-secondary/20 p-3 mb-2">
              <ChartPreview chartType={watchedType} />
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Title</FormLabel><FormControl><Input data-testid="input-chart-title" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="projectId" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value?.toString()}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select project" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {projects?.map((p) => <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="chartType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chart Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        {["line", "bar", "area", "pie", "donut", "kpi", "table", "comparison"].map((t) => (
                          <SelectItem key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <div className="grid grid-cols-2 gap-3">
                  <FormField control={form.control} name="xAxis" render={({ field }) => (
                    <FormItem><FormLabel>X Axis</FormLabel><FormControl><Input placeholder="e.g. date" {...field} /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name="yAxis" render={({ field }) => (
                    <FormItem><FormLabel>Y Axis</FormLabel><FormControl><Input placeholder="e.g. revenue" {...field} /></FormControl></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="pinnedToDashboard" render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormLabel className="mb-0">Pin to Dashboard</FormLabel>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} data-testid="switch-pin-dashboard" /></FormControl>
                  </FormItem>
                )} />
                <Button type="submit" disabled={createChart.isPending} data-testid="button-create-chart">
                  {createChart.isPending ? "Creating..." : "Create Chart"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64" />)
          : charts?.length === 0
          ? (
            <div className="col-span-full py-12 text-center border rounded-lg bg-secondary/20">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No charts yet</h3>
              <p className="text-muted-foreground mt-1">Create a chart to start visualizing your data.</p>
            </div>
          )
          : charts?.map((chart) => {
            const Icon = chartTypeIcons[chart.chartType] ?? BarChart3;
            return (
              <Card key={chart.id} data-testid={`card-chart-${chart.id}`} className="flex flex-col group relative">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{chart.title}</CardTitle>
                    <Badge variant="outline" className="text-xs shrink-0">{chart.chartType}</Badge>
                  </div>
                  {chart.pinnedToDashboard && (
                    <span className="text-xs text-primary font-medium">Pinned to dashboard</span>
                  )}
                </CardHeader>
                <CardContent className="flex-1">
                  <ChartPreview chartType={chart.chartType} />
                </CardContent>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:bg-destructive/10"
                    data-testid={`button-delete-chart-${chart.id}`}
                    onClick={(e) => handleDelete(chart.id, e)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
