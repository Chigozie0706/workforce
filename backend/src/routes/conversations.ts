import { Router } from "express";
import { and, eq, asc } from "drizzle-orm";
import { db } from "../db";
import { conversations, messages } from "../db/schema";
import { requireAuth } from "../middleware/requireAuth";

export const conversationsRouter = Router();

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

async function findOrCreateConversation(customerId: string, workerId: number) {
  const existing = await db.query.conversations.findFirst({
    where: and(eq(conversations.customerId, customerId), eq(conversations.workerId, workerId)),
  });
  if (existing) return existing;

  const [created] = await db.insert(conversations).values({ customerId, workerId }).returning();
  return created;
}

conversationsRouter.get("/:workerId", requireAuth, async (req, res) => {
  const workerId = Number(req.params.workerId);
  if (Number.isNaN(workerId)) {
    res.status(400).json({ error: "Invalid worker id" });
    return;
  }

  const conversation = await findOrCreateConversation(req.session!.userId, workerId);

  const rows = await db.select().from(messages)
    .where(eq(messages.conversationId, conversation.id))
    .orderBy(asc(messages.createdAt));

  res.json(rows.map(m => ({
    id: m.id, sender: m.sender, text: m.text, time: formatTime(m.createdAt),
  })));
});

conversationsRouter.post("/:workerId", requireAuth, async (req, res) => {
  const workerId = Number(req.params.workerId);
  if (Number.isNaN(workerId)) {
    res.status(400).json({ error: "Invalid worker id" });
    return;
  }

  const text: string | undefined = req.body?.text?.trim();
  if (!text) {
    res.status(400).json({ error: "text is required" });
    return;
  }

  const conversation = await findOrCreateConversation(req.session!.userId, workerId);

  const [inserted] = await db.insert(messages).values({
    conversationId: conversation.id,
    sender: req.session!.role, // "customer" | "worker" — whoever's signed in sent it
    text,
  }).returning();

  res.json({
    id: inserted.id, sender: inserted.sender, text: inserted.text, time: formatTime(inserted.createdAt),
  });
});