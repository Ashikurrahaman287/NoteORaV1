import { Router } from "express";
import { db, chartsTable } from "@workspace/db";
import { eq, and, sql } from "drizzle-orm";
import { requireAuth, type AuthedRequest } from "../middlewares/requireAuth";
import { CreateChartBody, UpdateChartBody } from "@workspace/api-zod";

const router = Router();

const toChart = (c: typeof chartsTable.$inferSelect) => ({
  id: c.id,
  projectId: c.projectId,
  datasetId: c.datasetId ?? null,
  userId: c.userId,
  title: c.title,
  chartType: c.chartType as "line" | "bar" | "pie" | "area" | "donut" | "table" | "kpi" | "comparison",
  xAxis: c.xAxis ?? null,
  yAxis: c.yAxis ?? null,
  config: (c.config as Record<string, unknown>) ?? null,
  pinnedToDashboard: c.pinnedToDashboard,
  createdAt: c.createdAt.toISOString(),
  updatedAt: c.updatedAt.toISOString(),
});

router.get("/charts", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  try {
    const charts = await db
      .select()
      .from(chartsTable)
      .where(eq(chartsTable.userId, userId))
      .orderBy(sql`${chartsTable.updatedAt} desc`);
    res.json(charts.map(toChart));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to list charts" });
  }
});

router.post("/charts", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const parsed = CreateChartBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  try {
    const [chart] = await db
      .insert(chartsTable)
      .values({ ...parsed.data, userId })
      .returning();
    res.status(201).json(toChart(chart));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to create chart" });
  }
});

router.get("/charts/:id", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const id = Number(req.params.id);
  try {
    const [chart] = await db
      .select()
      .from(chartsTable)
      .where(and(eq(chartsTable.id, id), eq(chartsTable.userId, userId)));
    if (!chart) { res.status(404).json({ error: "Not found" }); return; }
    res.json(toChart(chart));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to get chart" });
  }
});

router.put("/charts/:id", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const id = Number(req.params.id);
  const parsed = UpdateChartBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  try {
    const [chart] = await db
      .update(chartsTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(and(eq(chartsTable.id, id), eq(chartsTable.userId, userId)))
      .returning();
    if (!chart) { res.status(404).json({ error: "Not found" }); return; }
    res.json(toChart(chart));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to update chart" });
  }
});

router.delete("/charts/:id", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const id = Number(req.params.id);
  try {
    await db.delete(chartsTable).where(and(eq(chartsTable.id, id), eq(chartsTable.userId, userId)));
    res.status(204).send();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to delete chart" });
  }
});

export default router;
