import { useState } from "react";
import { Link } from "wouter";
import { useListProjects, getListProjectsQueryKey, useCreateProject, useDeleteProject } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, FolderKanban, Trash2, Edit } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
});

export default function Projects() {
  const queryClient = useQueryClient();
  const { data: projects, isLoading } = useListProjects({ query: { queryKey: getListProjectsQueryKey() } });
  const createProject = useCreateProject();
  const deleteProject = useDeleteProject();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", description: "" }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createProject.mutate({ data: { ...values, status: "active" } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() });
        setOpen(false);
        form.reset();
      }
    });
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    if(confirm("Are you sure?")) {
      deleteProject.mutate({ id }, {
        onSuccess: () => queryClient.invalidateQueries({ queryKey: getListProjectsQueryKey() })
      });
    }
  };

  const filteredProjects = projects?.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your analysis workspaces.</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> New Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Project</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem><FormLabel>Description</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage/></FormItem>
                )} />
                <Button type="submit" disabled={createProject.isPending}>
                  {createProject.isPending ? "Creating..." : "Create Project"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search projects..." 
          className="pl-9"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({length: 6}).map((_, i) => <Skeleton key={i} className="h-40" />)
        ) : filteredProjects?.length === 0 ? (
          <div className="col-span-full py-12 text-center border rounded-lg bg-secondary/20">
            <FolderKanban className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No projects found</h3>
          </div>
        ) : (
          filteredProjects?.map(project => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer group h-full flex flex-col relative">
                <CardHeader>
                  <CardTitle className="text-lg flex justify-between items-start pr-8">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{project.description || "No description"}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-4 flex gap-4 text-sm text-muted-foreground border-t">
                  <span>{project.datasetCount} Datasets</span>
                  <span>{project.chartCount} Charts</span>
                </CardContent>
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={(e) => handleDelete(project.id, e)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}