"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { BLUE } from "../../../lib/data";
import { api } from "../../../lib/api";
import { NotifBadge } from "../../../components/dashboard/atoms";

interface Notification {
  id: number;
  type: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  avatarUrl: string | null;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Notification[]>("/api/notifications")
      .then(setNotifications)
      .finally(() => setLoading(false));
  }, []);

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-full pb-8">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
              Notifications
            </h1>
            <p className="text-sm text-slate-400 font-semibold mt-1">
              {unread} unread messages
            </p>
          </div>
          <button
            className="text-sm font-extrabold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors"
            style={{ color: BLUE }}
          >
            Mark all read
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-slate-400">Loading…</p>
        ) : (
          <div className="space-y-2">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="flex gap-4 p-4 rounded-2xl border transition-all hover:shadow-sm"
                style={{
                  background: !n.read ? "#F0F7FF" : "white",
                  borderColor: !n.read ? "#DBEAFE" : "#F1F5F9",
                }}
              >
                <div className="relative flex-shrink-0">
                  {n.avatarUrl ? (
                    <img
                      src={n.avatarUrl}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                      <Bell size={19} className="text-slate-400" />
                    </div>
                  )}
                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-sm">
                    <NotifBadge type={n.type} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-extrabold text-sm text-slate-900">
                        {n.title}
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">
                        {n.body}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 font-semibold whitespace-nowrap flex-shrink-0">
                      {n.time}
                    </span>
                  </div>
                </div>
                {!n.read && (
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: BLUE }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
