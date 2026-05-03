import { useState } from "react";
import { Link } from "wouter";
import { useListDatasets, getListDatasetsQueryKey, useCreateDataset, useDeleteDataset } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Database, Trash2, FileSpreadsheet } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useListProjects, getListProjectsQueryKey } from "@workspace/api-client-react";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  projectId: z.coerce.number().positive("Select a project"),
  sourceType: z.enum(["csv", "excel", "manual", "api"]),
  columns: z.string().min(1, "Enter at least one column"),
});

const sourceTypeColors: Record<string, string> = {
  csv: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  excel: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  manual: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  api: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function Datasets() {
  const queryClient = useQueryClient();
  const { data: datasets, isLoading } = useListDatasets({ query: { queryKey: getListDatasetsQueryKey() } });
  const { data: projects } = useListProjects({ query: { queryKey: getListProjectsQueryKey() } });
  const createDataset = useCreateDataset();
  const deleteDataset = useDeleteDataset();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", projectId: 0, sourceType: "manual", columns: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const columns = values.columns.split(",").map((c) => c.trim()).filter(Boolean);
    createDataset.mutate(
      { data: { name: values.name, projectId: values.projectId, sourceType: values.sourceType, columns } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListDatasetsQueryKey() });
          setOpen(false);
          form.reset();
        },
      }
    );
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("Delete this dataset and all its rows?")) {
      deleteDataset.mutate({ id }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getListDatasetsQueryKey() }),
      });
    }
  };

  const filtered = datasets?.filter((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Datasets</h1>
          <p className="text-muted-foreground">All imported and manually created data sources.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-new-dataset"><Plus className="mr-2 h-4 w-4" /> New Dataset</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Dataset</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Name</FormLabel><FormControl><Input data-testid="input-dataset-name" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="projectId" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value?.toString()}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select project" /></SelectTrigger></FormControl>
                      <SelectContent>
                        {projects?.map((p) => (
                          <SelectItem key={p.id} value={p.id.toString()}>{p.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="sourceType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="api">API</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="columns" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Columns (comma-separated)</FormLabel>
                    <FormControl><Input data-testid="input-dataset-columns" placeholder="e.g. date, revenue, region" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" disabled={createDataset.isPending} data-testid="button-create-dataset">
                  {createDataset.isPending ? "Creating..." : "Create Dataset"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input data-testid="input-search" placeholder="Search datasets..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-40" />)
          : filtered?.length === 0
          ? (
            <div className="col-span-full py-12 text-center border rounded-lg bg-secondary/20">
              <Database className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No datasets found</h3>
              <p className="text-muted-foreground mt-1">Create a dataset to start organizing your data.</p>
            </div>
          )
          : filtered?.map((dataset) => (
            <Link key={dataset.id} href={`/datasets/${dataset.id}`}>
              <Card data-testid={`card-dataset-${dataset.id}`} className="hover:border-primary/50 transition-colors cursor-pointer group h-full flex flex-col relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-base">{dataset.name}</CardTitle>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sourceTypeColors[dataset.sourceType] ?? ""}`}>
                      {dataset.sourceType.toUpperCase()}
                    </span>
                  </div>
                  <CardDescription>{dataset.columns.length} columns · {dataset.rowCount.toLocaleString()} rows</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-4 border-t">
                  <div className="flex flex-wrap gap-1">
                    {dataset.columns.slice(0, 4).map((col) => (
                      <Badge key={col} variant="secondary" className="text-xs">{col}</Badge>
                    ))}
                    {dataset.columns.length > 4 && (
                      <Badge variant="secondary" className="text-xs">+{dataset.columns.length - 4}</Badge>
                    )}
                  </div>
                </CardContent>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10"
                    data-testid={`button-delete-dataset-${dataset.id}`}
                    onClick={(e) => handleDelete(dataset.id, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
