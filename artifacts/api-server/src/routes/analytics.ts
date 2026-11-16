import { Router } from "express";
import { db, projectsTable, datasetsTable, chartsTable, reportsTable, notificationsTable, activityTable } from "@workspace/db";
import { eq, count, sum, sql } from "drizzle-orm";
import { requireAuth, type AuthedRequest } from "../middlewares/requireAuth";

const router = Router();

router.get("/analytics/dashboard", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  try {
    const [totalProjects] = await db.select({ count: count() }).from(projectsTable).where(eq(projectsTable.userId, userId));
    const [totalDatasets] = await db.select({ count: count() }).from(datasetsTable).where(eq(datasetsTable.userId, userId));
    const [totalCharts] = await db.select({ count: count() }).from(chartsTable).where(eq(chartsTable.userId, userId));
    const [totalReports] = await db.select({ count: count() }).from(reportsTable).where(eq(reportsTable.userId, userId));
    const [unreadNotifications] = await db.select({ count: count() }).from(notificationsTable)
      .where(sql`${notificationsTable.userId} = ${userId} AND ${notificationsTable.isRead} = false`);
    const [totalRowsResult] = await db.select({ total: sum(datasetsTable.rowCount) }).from(datasetsTable).where(eq(datasetsTable.userId, userId));
    const activeProjectsResult = await db.select({ count: count() }).from(projectsTable)
      .where(sql`${projectsTable.userId} = ${userId} AND ${projectsTable.status} = 'active'`);
    const recentProjects = await db.select({ name: projectsTable.name }).from(projectsTable)
      .where(eq(projectsTable.userId, userId)).orderBy(sql`${projectsTable.updatedAt} desc`).limit(5);

    res.json({
      totalProjects: Number(totalProjects?.count ?? 0),
      totalDatasets: Number(totalDatasets?.count ?? 0),
      totalCharts: Number(totalCharts?.count ?? 0),
      totalReports: Number(totalReports?.count ?? 0),
      totalRows: Number(totalRowsResult?.total ?? 0),
      activeProjects: Number(activeProjectsResult[0]?.count ?? 0),
      unreadNotifications: Number(unreadNotifications?.count ?? 0),
      recentProjectNames: recentProjects.map((p) => p.name),
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to get dashboard summary" });
  }
});

router.get("/analytics/insights", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  try {
    const projects = await db.select({ count: count() }).from(projectsTable).where(eq(projectsTable.userId, userId));
    const datasets = await db.select({ count: count() }).from(datasetsTable).where(eq(datasetsTable.userId, userId));
    const charts = await db.select({ count: count() }).from(chartsTable).where(eq(chartsTable.userId, userId));
    const totalProjects = Number(projects[0]?.count ?? 0);
    const totalDatasets = Number(datasets[0]?.count ?? 0);
    const totalCharts = Number(charts[0]?.count ?? 0);

    const insights = [];
    const now = new Date().toISOString();

    if (totalProjects === 0) {
      insights.push({ id: "no-projects", type: "opportunity", title: "Get started with your first project", message: "Create your first project to start tracking and analyzing your business data.", severity: "low", createdAt: now });
    } else {
      insights.push({ id: "projects-active", type: "summary", title: `${totalProjects} project${totalProjects > 1 ? "s" : ""} in your workspace`, message: `You have ${totalProjects} project${totalProjects > 1 ? "s" : ""} tracking your business data.`, severity: "low", createdAt: now });
    }
    if (totalDatasets === 0 && totalProjects > 0) {
      insights.push({ id: "no-datasets", type: "opportunity", title: "Upload your first dataset", message: "Import a CSV or Excel file to start generating visual insights from your data.", severity: "medium", createdAt: now });
    } else if (totalDatasets > 0) {
      insights.push({ id: "datasets-active", type: "summary", title: `${totalDatasets} dataset${totalDatasets > 1 ? "s" : ""} imported`, message: `Your workspace contains ${totalDatasets} dataset${totalDatasets > 1 ? "s" : ""} ready for analysis.`, severity: "low", createdAt: now });
    }
    if (totalCharts === 0 && totalDatasets > 0) {
      insights.push({ id: "no-charts", type: "opportunity", title: "Create your first chart", message: "Build charts to visualize your datasets and gain actionable insights.", severity: "medium", createdAt: now });
    } else if (totalCharts > 0) {
      insights.push({ id: "charts-ready", type: "trend", title: `${totalCharts} chart${totalCharts > 1 ? "s" : ""} ready for review`, message: `You have ${totalCharts} chart${totalCharts > 1 ? "s" : ""} created. Pin your favorites to the dashboard for quick access.`, severity: "low", createdAt: now });
    }
    insights.push({ id: "data-health", type: "summary", title: "Data workspace is healthy", message: "All your datasets and projects are accessible and up to date.", severity: "low", createdAt: now });

    res.json(insights);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to get insights" });
  }
});

router.get("/analytics/activity", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  try {
    const activities = await db
      .select()
      .from(activityTable)
      .where(eq(activityTable.userId, userId))
      .orderBy(sql`${activityTable.createdAt} desc`)
      .limit(20);
    res.json(
      activities.map((a) => ({
        id: a.id,
        action: a.action,
        entityType: a.entityType as "project" | "dataset" | "chart" | "report",
        entityName: a.entityName,
        createdAt: a.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to get activity" });
  }
});

router.get("/analytics/trends", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  try {
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        label: d.toLocaleString("default", { month: "short", year: "2-digit" }),
      });
    }

    const trends = await Promise.all(
      months.map(async ({ year, month, label }) => {
        const startDate = new Date(year, month - 1, 1).toISOString();
        const endDate = new Date(year, month, 1).toISOString();
        const [projects] = await db.select({ count: count() }).from(projectsTable)
          .where(sql`${projectsTable.userId} = ${userId} AND ${projectsTable.createdAt} < ${endDate}`);
        const [datasets] = await db.select({ count: count() }).from(datasetsTable)
          .where(sql`${datasetsTable.userId} = ${userId} AND ${datasetsTable.createdAt} < ${endDate}`);
        const [charts] = await db.select({ count: count() }).from(chartsTable)
          .where(sql`${chartsTable.userId} = ${userId} AND ${chartsTable.createdAt} < ${endDate}`);
        const [reports] = await db.select({ count: count() }).from(reportsTable)
          .where(sql`${reportsTable.userId} = ${userId} AND ${reportsTable.createdAt} < ${endDate}`);
        return {
          month: label,
          projects: Number(projects?.count ?? 0),
          datasets: Number(datasets?.count ?? 0),
          charts: Number(charts?.count ?? 0),
          reports: Number(reports?.count ?? 0),
        };
      })
    );

    res.json(trends);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to get trends" });
  }
});

export default router;
