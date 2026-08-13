import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth";
import { workersRouter } from "./routes/workers";
import { notificationsRouter } from "./routes/notifications";
import { conversationsRouter } from "./routes/conversations";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:3000")
  .split(",")
  .map(o => o.trim());

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRouter);
app.use("/api/workers", workersRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/conversations", conversationsRouter);

const port = process.env.PORT ?? 4000;
app.listen(port, () => {
  console.log(`SkillConnect backend listening on http://localhost:${port}`);
});