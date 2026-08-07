import { Router } from "express";
import { and, gte, eq } from "drizzle-orm";
import { db } from "../db";
import { workers } from "../db/schema";

export const workersRouter = Router();

workersRouter.get("/", async (req, res) => {
  const category = req.query.category as string | undefined;
  const minRating = Number(req.query.minRating ?? 0);

  const conditions = [gte(workers.rating, minRating)];
  if (category && category !== "All") conditions.push(eq(workers.category, category));

  const rows = await db.select().from(workers).where(and(...conditions));

  res.json(rows.map(w => ({
    id: w.id, name: w.name, skill: w.skill, category: w.category,
    rating: w.rating, reviews: w.reviewCount, distance: w.distance, price: w.price,
    avatar: w.avatar, coverImg: w.coverImg, verified: w.verified, jobs: w.jobs,
    bio: w.bio, portfolio: w.portfolio, tags: w.tags,
  })));
});

workersRouter.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: "Invalid worker id" });
    return;
  }

  const worker = await db.query.workers.findFirst({
    where: eq(workers.id, id),
    with: { reviewsList: true },
  });

  if (!worker) {
    res.status(404).json({ error: "Worker not found" });
    return;
  }

  res.json({
    id: worker.id, name: worker.name, skill: worker.skill, category: worker.category,
    rating: worker.rating, reviews: worker.reviewCount, distance: worker.distance, price: worker.price,
    avatar: worker.avatar, coverImg: worker.coverImg, verified: worker.verified, jobs: worker.jobs,
    bio: worker.bio, portfolio: worker.portfolio, tags: worker.tags,
    reviewsList: worker.reviewsList.map(r => ({
      author: r.author, avatar: r.avatar, rating: r.rating, text: r.text, date: r.date,
    })),
  });
});