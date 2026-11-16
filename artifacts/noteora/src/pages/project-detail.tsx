import { useParams, Link } from "wouter";
import { useGetProject, getGetProjectQueryKey, useListProjectDatasets, getListProjectDatasetsQueryKey, useListCharts, getListChartsQueryKey } from "@workspace/api-client-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Database, BarChart3, FileSpreadsheet } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  draft: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  archived: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const { data: project, isLoading } = useGetProject(projectId, { query: { enabled: !!projectId, queryKey: getGetProjectQueryKey(projectId) } });
  const { data: datasets } = useListProjectDatasets(projectId, { query: { enabled: !!projectId, queryKey: getListProjectDatasetsQueryKey(projectId) } });
  const { data: allCharts } = useListCharts({ query: { queryKey: getListChartsQueryKey() } });
  const projectCharts = allCharts?.filter((c) => c.projectId === projectId);

  if (isLoading) return <div className="space-y-4"><Skeleton className="h-10 w-64" /><Skeleton className="h-32" /></div>;
  if (!project) return <div className="text-center py-12 text-muted-foreground">Project not found</div>;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <Link href="/projects">
          <Button variant="ghost" size="icon" data-testid="button-back"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[project.status] ?? ""}`}>
              {project.status}
            </span>
          </div>
          {project.description && <p className="text-muted-foreground mt-1">{project.description}</p>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold">{project.datasetCount}</div>
            <p className="text-sm text-muted-foreground mt-1">Datasets</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold">{project.chartCount}</div>
            <p className="text-sm text-muted-foreground mt-1">Charts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold">{new Date(project.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div>
            <p className="text-sm text-muted-foreground mt-1">Last Updated</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2"><Database className="h-4 w-4" /> Datasets</h2>
          <Link href="/datasets">
            <Button variant="outline" size="sm">View all</Button>
          </Link>
        </div>
        {datasets?.length === 0 ? (
          <div className="border rounded-lg p-8 text-center text-muted-foreground bg-secondary/20">
            <FileSpreadsheet className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">No datasets in this project yet</p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {datasets?.map((d) => (
              <Link key={d.id} href={`/datasets/${d.id}`}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="p-4 flex items-center gap-3">
                    <FileSpreadsheet className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{d.name}</p>
                      <p className="text-xs text-muted-foreground">{d.rowCount.toLocaleString()} rows · {d.columns.length} cols</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2"><BarChart3 className="h-4 w-4" /> Charts</h2>
          <Link href="/analytics">
            <Button variant="outline" size="sm">View all</Button>
          </Link>
        </div>
        {projectCharts?.length === 0 ? (
          <div className="border rounded-lg p-8 text-center text-muted-foreground bg-secondary/20">
            <BarChart3 className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">No charts for this project yet</p>
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {projectCharts?.map((c) => (
              <Card key={c.id} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-muted-foreground shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{c.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{c.chartType} chart</p>
                    </div>
                  </div>
                  {c.pinnedToDashboard && <Badge variant="secondary" className="text-xs">Pinned</Badge>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
