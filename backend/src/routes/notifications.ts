import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { db } from "../db";
import { notifications } from "../db/schema";
import { requireAuth } from "../middleware/requireAuth";

export const notificationsRouter = Router();

notificationsRouter.get("/", requireAuth, async (req, res) => {
  const rows = await db.select().from(notifications)
    .where(eq(notifications.userId, req.session!.userId))
    .orderBy(desc(notifications.createdAt));

  res.json(rows.map(n => ({
    id: n.id, type: n.type, title: n.title, body: n.body, time: n.time,
    read: n.read, avatarUrl: n.avatarUrl,
  })));
});