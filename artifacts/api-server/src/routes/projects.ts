import { Router } from "express";
import { db, projectsTable, datasetsTable, chartsTable } from "@workspace/db";
import { eq, and, count, sql } from "drizzle-orm";
import { requireAuth, type AuthedRequest } from "../middlewares/requireAuth";
import {
  CreateProjectBody,
  UpdateProjectBody,
} from "@workspace/api-zod";

const router = Router();

router.get("/projects", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  try {
    const projects = await db
      .select({
        id: projectsTable.id,
        userId: projectsTable.userId,
        name: projectsTable.name,
        description: projectsTable.description,
        status: projectsTable.status,
        createdAt: projectsTable.createdAt,
        updatedAt: projectsTable.updatedAt,
      })
      .from(projectsTable)
      .where(eq(projectsTable.userId, userId))
      .orderBy(sql`${projectsTable.updatedAt} desc`);

    const projectsWithCounts = await Promise.all(
      projects.map(async (p) => {
        const [datasetCount] = await db
          .select({ count: count() })
          .from(datasetsTable)
          .where(and(eq(datasetsTable.projectId, p.id), eq(datasetsTable.userId, userId)));
        const [chartCount] = await db
          .select({ count: count() })
          .from(chartsTable)
          .where(and(eq(chartsTable.projectId, p.id), eq(chartsTable.userId, userId)));
        return {
          ...p,
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString(),
          datasetCount: Number(datasetCount?.count ?? 0),
          chartCount: Number(chartCount?.count ?? 0),
        };
      })
    );

    res.json(projectsWithCounts);
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to list projects" });
  }
});

router.post("/projects", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const parsed = CreateProjectBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  try {
    const [project] = await db
      .insert(projectsTable)
      .values({ ...parsed.data, userId })
      .returning();
    res.status(201).json({
      ...project,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      datasetCount: 0,
      chartCount: 0,
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

router.get("/projects/:id", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const id = Number(req.params.id);
  try {
    const [project] = await db
      .select()
      .from(projectsTable)
      .where(and(eq(projectsTable.id, id), eq(projectsTable.userId, userId)));
    if (!project) { res.status(404).json({ error: "Not found" }); return; }
    const [datasetCount] = await db
      .select({ count: count() })
      .from(datasetsTable)
      .where(and(eq(datasetsTable.projectId, id), eq(datasetsTable.userId, userId)));
    const [chartCount] = await db
      .select({ count: count() })
      .from(chartsTable)
      .where(and(eq(chartsTable.projectId, id), eq(chartsTable.userId, userId)));
    res.json({
      ...project,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      datasetCount: Number(datasetCount?.count ?? 0),
      chartCount: Number(chartCount?.count ?? 0),
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to get project" });
  }
});

router.put("/projects/:id", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const id = Number(req.params.id);
  const parsed = UpdateProjectBody.safeParse(req.body);
  if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
  try {
    const [project] = await db
      .update(projectsTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(and(eq(projectsTable.id, id), eq(projectsTable.userId, userId)))
      .returning();
    if (!project) { res.status(404).json({ error: "Not found" }); return; }
    const [datasetCount] = await db
      .select({ count: count() })
      .from(datasetsTable)
      .where(and(eq(datasetsTable.projectId, id), eq(datasetsTable.userId, userId)));
    const [chartCount] = await db
      .select({ count: count() })
      .from(chartsTable)
      .where(and(eq(chartsTable.projectId, id), eq(chartsTable.userId, userId)));
    res.json({
      ...project,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      datasetCount: Number(datasetCount?.count ?? 0),
      chartCount: Number(chartCount?.count ?? 0),
    });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to update project" });
  }
});

router.delete("/projects/:id", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const id = Number(req.params.id);
  try {
    await db
      .delete(projectsTable)
      .where(and(eq(projectsTable.id, id), eq(projectsTable.userId, userId)));
    res.status(204).send();
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;
