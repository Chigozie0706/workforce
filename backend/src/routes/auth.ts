import { Router } from "express";
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users, workers } from "../db/schema";
import { hashPassword, verifyPassword, createSession, clearSession, getSession } from "../lib/auth";

export const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body ?? {};

  if (!name || !email || !password || (role !== "customer" && role !== "worker")) {
    res.status(400).json({ error: "name, email, password, and a valid role are required" });
    return;
  }

  const existing = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (existing) {
    res.status(409).json({ error: "An account with that email already exists" });
    return;
  }

  const passwordHash = await hashPassword(password);
  const id = randomUUID();
  const [user] = await db.insert(users).values({ id, name, email, passwordHash, role }).returning();

  // Workers get a bare-bones public listing right away — they can flesh it out later.
  if (role === "worker") {
    await db.insert(workers).values({
      name,
      skill: "New Worker",
      category: "Plumbing",
      price: "$0/hr",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format",
      coverImg: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&h=500&fit=crop&auto=format",
      bio: "New to SkillConnect — no bio yet.",
      userId: user.id,
    });
  }

  await createSession(res, { userId: user.id, role: user.role });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    res.status(400).json({ error: "email and password are required" });
    return;
  }

  const user = await db.query.users.findFirst({ where: eq(users.email, email) });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  await createSession(res, { userId: user.id, role: user.role });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

authRouter.post("/logout", (req, res) => {
  clearSession(res);
  res.json({ ok: true });
});

authRouter.get("/me", async (req, res) => {
  const session = await getSession(req);
  if (!session) {
    res.json({ user: null });
    return;
  }

  const user = await db.query.users.findFirst({ where: eq(users.id, session.userId) });
  if (!user) {
    res.json({ user: null });
    return;
  }

  res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});