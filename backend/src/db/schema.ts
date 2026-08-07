import {
  pgTable, serial, text, integer, boolean, real, timestamp,
  varchar, pgEnum, uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["customer", "worker"]);

export const users = pgTable("users", {
  id: varchar("id", { length: 191 }).primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: roleEnum("role").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const workers = pgTable("workers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  skill: text("skill").notNull(),
  category: text("category").notNull(),
  rating: real("rating").notNull().default(0),
  reviewCount: integer("review_count").notNull().default(0),
  distance: text("distance").notNull().default(""),
  price: text("price").notNull(),
  avatar: text("avatar").notNull(),
  coverImg: text("cover_img").notNull(),
  verified: boolean("verified").notNull().default(false),
  jobs: integer("jobs").notNull().default(0),
  bio: text("bio").notNull().default(""),
  portfolio: text("portfolio").array().notNull().default([]),
  tags: text("tags").array().notNull().default([]),
  userId: varchar("user_id", { length: 191 }).references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  workerId: integer("worker_id").notNull().references(() => workers.id, { onDelete: "cascade" }),
  author: text("author").notNull(),
  avatar: text("avatar").notNull(),
  rating: integer("rating").notNull(),
  text: text("text").notNull(),
  date: text("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 191 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  time: text("time").notNull(),
  read: boolean("read").notNull().default(false),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at").defaultNow().notNull(),

  customerId: varchar("customer_id", { length: 191 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  workerId: integer("worker_id").notNull().references(() => workers.id, { onDelete: "cascade" }),

}, (t) => ({
  customerWorkerUnique: uniqueIndex("conversations_customer_worker_idx").on(t.customerId, t.workerId),
}));

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  sender: text("sender").notNull(), // "customer" | "worker"
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),

  conversationId: integer("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  workerProfile: one(workers, { fields: [users.id], references: [workers.userId] }),
  notifications: many(notifications),
  conversations: many(conversations),
}));

export const workersRelations = relations(workers, ({ one, many }) => ({
  user: one(users, { fields: [workers.userId], references: [users.id] }),
  reviewsList: many(reviews),
  conversations: many(conversations),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  worker: one(workers, { fields: [reviews.workerId], references: [workers.id] }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, { fields: [notifications.userId], references: [users.id] }),
}));

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  customer: one(users, { fields: [conversations.customerId], references: [users.id] }),
  worker: one(workers, { fields: [conversations.workerId], references: [workers.id] }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, { fields: [messages.conversationId], references: [conversations.id] }),
}));