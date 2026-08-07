import type { Request, Response, NextFunction } from "express";
import { getSession, SessionPayload } from "../lib/auth";

declare global {
  namespace Express {
    interface Request {
      session?: SessionPayload;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const session = await getSession(req);
  if (!session) {
    res.status(401).json({ error: "Not signed in" });
    return;
  }
  req.session = session;
  next();
}