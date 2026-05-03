import { Router } from "express";
import { db, reportsTable } from "@workspace/db";
import { eq, and, sql } from "drizzle-orm";
import { requireAuth, type AuthedRequest } from "../middlewares/requireAuth";
import { CreateReportBody } from "@workspace/api-zod";

const router = Router();

const toReport = (r: typeof reportsTable.$inferSelect) => ({
  id: r.id,
  projectId: r.projectId,
  userId: r.userId,
  title: r.title,
  summary: r.summary ?? null,
  chartIds: (r.chartIds as number[]) ?? [],
  dateRangeStart: r.dateRangeStart ?? null,
  dateRangeEnd: r.dateRangeEnd ?? null,
  createdAt: r.createdAt.toISOString(),
});

router.get("/reports", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  try {
    const reports = await db
      .select()
      .from(reportsTable)
      .where(eq(reportsTable.userId, userId))
      .orderBy(sql`${reportsTable.createdAt} desc`);
    res.json(reports.map(toReport));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to list reports" });
  }
});

router.post("/reports", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const parsed = CreateReportBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  try {
    const [report] = await db
      .insert(reportsTable)
      .values({ ...parsed.data, userId })
      .returning();
    res.status(201).json(toReport(report));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to create report" });
  }
});

router.get("/reports/:id", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const id = Number(req.params.id);
  try {
    const [report] = await db
      .select()
      .from(reportsTable)
      .where(and(eq(reportsTable.id, id), eq(reportsTable.userId, userId)));
    if (!report) { res.status(404).json({ error: "Not found" }); return; }
    res.json(toReport(report));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to get report" });
  }
});

router.delete("/reports/:id", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const id = Number(req.params.id);
  try {
    await db.delete(reportsTable).where(and(eq(reportsTable.id, id), eq(reportsTable.userId, userId)));
    res.status(204).send();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to delete report" });
  }
});

export default router;
