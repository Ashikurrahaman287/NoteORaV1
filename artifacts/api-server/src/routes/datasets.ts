import { Router } from "express";
import { db, datasetsTable, datasetRowsTable, projectsTable } from "@workspace/db";
import { eq, and, sql, count } from "drizzle-orm";
import { requireAuth, type AuthedRequest } from "../middlewares/requireAuth";
import { CreateDatasetBody, AddDatasetRowsBody } from "@workspace/api-zod";

const router = Router();

const toDataset = (d: typeof datasetsTable.$inferSelect) => ({
  id: d.id,
  projectId: d.projectId,
  userId: d.userId,
  name: d.name,
  sourceType: d.sourceType as "csv" | "excel" | "manual" | "api",
  columns: (d.columns as string[]) ?? [],
  rowCount: d.rowCount,
  createdAt: d.createdAt.toISOString(),
  updatedAt: d.updatedAt.toISOString(),
});

router.get("/datasets", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  try {
    const datasets = await db
      .select()
      .from(datasetsTable)
      .where(eq(datasetsTable.userId, userId))
      .orderBy(sql`${datasetsTable.updatedAt} desc`);
    res.json(datasets.map(toDataset));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to list datasets" });
  }
});

router.get("/projects/:id/datasets", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const projectId = Number(req.params.id);
  try {
    const datasets = await db
      .select()
      .from(datasetsTable)
      .where(and(eq(datasetsTable.projectId, projectId), eq(datasetsTable.userId, userId)))
      .orderBy(sql`${datasetsTable.updatedAt} desc`);
    res.json(datasets.map(toDataset));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to list project datasets" });
  }
});

router.post("/datasets", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const parsed = CreateDatasetBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  try {
    const [dataset] = await db
      .insert(datasetsTable)
      .values({ ...parsed.data, userId, rowCount: 0 })
      .returning();
    res.status(201).json(toDataset(dataset));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to create dataset" });
  }
});

router.get("/datasets/:id", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const id = Number(req.params.id);
  try {
    const [dataset] = await db
      .select()
      .from(datasetsTable)
      .where(and(eq(datasetsTable.id, id), eq(datasetsTable.userId, userId)));
    if (!dataset) { res.status(404).json({ error: "Not found" }); return; }
    res.json(toDataset(dataset));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to get dataset" });
  }
});

router.delete("/datasets/:id", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const id = Number(req.params.id);
  try {
    await db.delete(datasetRowsTable).where(eq(datasetRowsTable.datasetId, id));
    await db.delete(datasetsTable).where(and(eq(datasetsTable.id, id), eq(datasetsTable.userId, userId)));
    res.status(204).send();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to delete dataset" });
  }
});

router.get("/datasets/:id/rows", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const id = Number(req.params.id);
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(200, Math.max(1, Number(req.query.limit) || 50));
  const offset = (page - 1) * limit;
  try {
    const [dataset] = await db
      .select()
      .from(datasetsTable)
      .where(and(eq(datasetsTable.id, id), eq(datasetsTable.userId, userId)));
    if (!dataset) { res.status(404).json({ error: "Not found" }); return; }

    const rows = await db
      .select()
      .from(datasetRowsTable)
      .where(eq(datasetRowsTable.datasetId, id))
      .limit(limit)
      .offset(offset);

    res.json({
      rows: rows.map((r) => r.rowData),
      total: dataset.rowCount,
      page,
      limit,
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to get dataset rows" });
  }
});

router.post("/datasets/:id/rows", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const id = Number(req.params.id);
  const parsed = AddDatasetRowsBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  try {
    const [dataset] = await db
      .select()
      .from(datasetsTable)
      .where(and(eq(datasetsTable.id, id), eq(datasetsTable.userId, userId)));
    if (!dataset) { res.status(404).json({ error: "Not found" }); return; }

    const rowValues = parsed.data.rows.map((r) => ({ datasetId: id, rowData: r }));
    await db.insert(datasetRowsTable).values(rowValues);
    await db
      .update(datasetsTable)
      .set({ rowCount: dataset.rowCount + parsed.data.rows.length, updatedAt: new Date() })
      .where(eq(datasetsTable.id, id));

    res.status(201).json({ inserted: parsed.data.rows.length });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to add rows" });
  }
});

export default router;
