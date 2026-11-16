import { useState } from "react";
import { useListReports, getListReportsQueryKey, useCreateReport, useDeleteReport, useListProjects, getListProjectsQueryKey, useListCharts, getListChartsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, FileText, Trash2, CalendarRange } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  projectId: z.coerce.number().positive("Select a project"),
  summary: z.string().optional(),
  dateRangeStart: z.string().optional(),
  dateRangeEnd: z.string().optional(),
});

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function Reports() {
  const queryClient = useQueryClient();
  const { data: reports, isLoading } = useListReports({ query: { queryKey: getListReportsQueryKey() } });
  const { data: projects } = useListProjects({ query: { queryKey: getListProjectsQueryKey() } });
  const { data: charts } = useListCharts({ query: { queryKey: getListChartsQueryKey() } });
  const createReport = useCreateReport();
  const deleteReport = useDeleteReport();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", projectId: 0, summary: "", dateRangeStart: "", dateRangeEnd: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createReport.mutate(
      {
        data: {
          title: values.title,
          projectId: values.projectId,
          summary: values.summary ?? null,
          chartIds: [],
          dateRangeStart: values.dateRangeStart ?? null,
          dateRangeEnd: values.dateRangeEnd ?? null,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListReportsQueryKey() });
          setOpen(false);
          form.reset();
        },
      }
    );
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("Delete this report?")) {
      deleteReport.mutate({ id }, { onSuccess: () => queryClient.invalidateQueries({ queryKey: getListReportsQueryKey() }) });
    }
  };

  const projectMap = Object.fromEntries(projects?.map((p) => [p.id, p.name]) ?? []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Generate and manage business reports.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-new-report"><Plus className="mr-2 h-4 w-4" /> New Report</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Report</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Title</FormLabel><FormControl><Input data-testid="input-report-title" {...field} /></FormControl><FormMessage /></FormItem>
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
                <FormField control={form.control} name="summary" render={({ field }) => (
                  <FormItem><FormLabel>Summary</FormLabel><FormControl><Textarea placeholder="Brief description of this report..." {...field} /></FormControl></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-3">
                  <FormField control={form.control} name="dateRangeStart" render={({ field }) => (
                    <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name="dateRangeEnd" render={({ field }) => (
                    <FormItem><FormLabel>End Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl></FormItem>
                  )} />
                </div>
                <Button type="submit" disabled={createReport.isPending} data-testid="button-create-report">
                  {createReport.isPending ? "Creating..." : "Create Report"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-40" />)
          : reports?.length === 0
          ? (
            <div className="col-span-full py-12 text-center border rounded-lg bg-secondary/20">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No reports yet</h3>
              <p className="text-muted-foreground mt-1">Create a report to summarize your findings.</p>
            </div>
          )
          : reports?.map((report) => (
            <Card key={report.id} data-testid={`card-report-${report.id}`} className="flex flex-col group relative hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-base pr-8">{report.title}</CardTitle>
                <CardDescription className="text-xs">{projectMap[report.projectId] ?? "Unknown project"}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-2">
                {report.summary && <p className="text-sm text-muted-foreground line-clamp-2">{report.summary}</p>}
                {(report.dateRangeStart || report.dateRangeEnd) && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarRange className="h-3.5 w-3.5" />
                    {report.dateRangeStart && formatDate(report.dateRangeStart)}
                    {report.dateRangeStart && report.dateRangeEnd && " — "}
                    {report.dateRangeEnd && formatDate(report.dateRangeEnd)}
                  </div>
                )}
                <div className="text-xs text-muted-foreground">{report.chartIds.length} chart{report.chartIds.length !== 1 ? "s" : ""}</div>
              </CardContent>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:bg-destructive/10"
                  data-testid={`button-delete-report-${report.id}`}
                  onClick={(e) => handleDelete(report.id, e)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
}
