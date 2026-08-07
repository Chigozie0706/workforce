import "dotenv/config";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { db } from "../src/db";
import { users, workers, reviews, notifications, conversations, messages } from "../src/db/schema";
import { WORKERS, NOTIFICATIONS, CHAT_MESSAGES } from "./seed-data";

async function main() {
  console.log("Seeding...");

  await db.delete(messages);
  await db.delete(conversations);
  await db.delete(reviews);
  await db.delete(notifications);
  await db.delete(workers);
  await db.delete(users);

  const passwordHash = await bcrypt.hash("password123", 10);

  const [customer] = await db.insert(users).values({
    id: randomUUID(),
    name: "Sarah Mitchell",
    email: "sarah@example.com",
    passwordHash,
    role: "customer",
  }).returning();

  const [workerUser] = await db.insert(users).values({
    id: randomUUID(),
    name: "Marcus Johnson",
    email: "marcus@example.com",
    passwordHash,
    role: "worker",
  }).returning();

  for (const w of WORKERS) {
    const [inserted] = await db.insert(workers).values({
      name: w.name,
      skill: w.skill,
      category: w.category,
      rating: w.rating,
      reviewCount: w.reviews,
      distance: w.distance,
      price: w.price,
      avatar: w.avatar,
      coverImg: w.coverImg,
      verified: w.verified,
      jobs: w.jobs,
      bio: w.bio,
      portfolio: w.portfolio,
      tags: w.tags,
      userId: w.id === 1 ? workerUser.id : null,
    }).returning();

    if (w.reviewsList.length > 0) {
      await db.insert(reviews).values(
        w.reviewsList.map(r => ({
          workerId: inserted.id,
          author: r.author,
          avatar: r.avatar,
          rating: r.rating,
          text: r.text,
          date: r.date,
        }))
      );
    }

    if (w.id === 1) {
      const [conv] = await db.insert(conversations).values({
        customerId: customer.id,
        workerId: inserted.id,
      }).returning();

      await db.insert(messages).values(
        CHAT_MESSAGES.map(m => ({
          conversationId: conv.id,
          sender: m.sender,
          text: m.text,
        }))
      );
    }
  }

  await db.insert(notifications).values(
    NOTIFICATIONS.map(n => ({
      userId: customer.id,
      type: n.type,
      title: n.title,
      body: n.body,
      time: n.time,
      read: n.read,
      avatarUrl: n.avatarUrl,
    }))
  );

  console.log("Seed complete.");
  console.log("Demo customer login: sarah@example.com / password123");
  console.log("Demo worker login:   marcus@example.com / password123");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => process.exit(0));