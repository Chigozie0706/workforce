"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { api } from "../lib/api";
import type { UserRole } from "../lib/types";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AppContextValue {
  user: SessionUser | null;
  role: UserRole;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const data = await api<{ user: SessionUser | null }>("/api/auth/me");
    setUser(data.user);
    setLoading(false);
  }, []);

  const logout = useCallback(async () => {
    await api("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AppContext.Provider
      value={{ user, role: user?.role ?? null, loading, refresh, logout }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppRole() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppRole must be used within <AppProvider>");
  return ctx;
}
