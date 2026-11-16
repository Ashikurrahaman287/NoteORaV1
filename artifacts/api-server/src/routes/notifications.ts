import { Router } from "express";
import { db, notificationsTable } from "@workspace/db";
import { eq, and, sql } from "drizzle-orm";
import { requireAuth, type AuthedRequest } from "../middlewares/requireAuth";

const router = Router();

const toNotification = (n: typeof notificationsTable.$inferSelect) => ({
  id: n.id,
  userId: n.userId,
  title: n.title,
  message: n.message,
  type: n.type as "info" | "warning" | "success" | "error",
  isRead: n.isRead,
  createdAt: n.createdAt.toISOString(),
});

router.get("/notifications", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  try {
    const notifications = await db
      .select()
      .from(notificationsTable)
      .where(eq(notificationsTable.userId, userId))
      .orderBy(sql`${notificationsTable.createdAt} desc`);
    res.json(notifications.map(toNotification));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to list notifications" });
  }
});

router.post("/notifications/:id/read", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  const id = Number(req.params.id);
  try {
    const [notification] = await db
      .update(notificationsTable)
      .set({ isRead: true })
      .where(and(eq(notificationsTable.id, id), eq(notificationsTable.userId, userId)))
      .returning();
    if (!notification) { res.status(404).json({ error: "Not found" }); return; }
    res.json(toNotification(notification));
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to mark notification read" });
  }
});

router.post("/notifications/read-all", requireAuth, async (req, res) => {
  const userId = (req as AuthedRequest).userId;
  try {
    const updated = await db
      .update(notificationsTable)
      .set({ isRead: true })
      .where(and(eq(notificationsTable.userId, userId), eq(notificationsTable.isRead, false)))
      .returning();
    res.json({ updated: updated.length });
  } catch (err) {
    req.log.error(err);
    res.status(500).json({ error: "Failed to mark all notifications read" });
  }
});

export default router;
