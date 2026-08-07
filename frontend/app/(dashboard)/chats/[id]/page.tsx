"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Phone,
  MoreVertical,
  Briefcase,
  Image as ImageIcon,
  Send,
} from "lucide-react";
import { BLUE } from "../../../../lib/data";
import { api } from "../../../../lib/api";
import type { Worker } from "../../../../lib/types";

interface ChatMessage {
  id: number;
  sender: string;
  text: string;
  time: string;
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<ChatMessage[]>([]);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [contacts, setContacts] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api<Worker>(`/api/workers/${params.id}`),
      api<ChatMessage[]>(`/api/conversations/${params.id}`),
      api<Worker[]>("/api/workers"),
    ])
      .then(([w, messages, allWorkers]) => {
        setWorker(w);
        setMsgs(messages);
        setContacts(allWorkers.slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const sent = await api<ChatMessage>(`/api/conversations/${params.id}`, {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    setMsgs((p) => [...p, sent]);
  };

  if (loading || !worker) {
    return (
      <div className="min-h-full flex items-center justify-center py-20 text-slate-400">
        Loading…
      </div>
    );
  }
  const w = worker;

  return (
    <div
      className="h-full flex flex-col lg:flex-row overflow-hidden"
      style={{ height: "calc(100vh - 0px)" }}
    >
      {/* Desktop: contacts list */}
      <aside className="hidden lg:flex flex-col w-80 xl:w-96 border-r border-slate-100 bg-white flex-shrink-0">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-extrabold text-lg text-slate-900 mb-3">
            Messages
          </h2>
          <div className="bg-slate-100 rounded-xl flex items-center gap-2 px-4 py-2.5">
            <Search size={15} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400"
            />
          </div>
        </div>
        <div
          className="flex-1 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {contacts.map((c, i) => (
            <Link
              key={c.id}
              href={`/chats/${c.id}`}
              className="flex items-center gap-3 px-5 py-4 border-b border-slate-50 cursor-pointer transition-all"
              style={{ background: c.id === w.id ? "#F0F7FF" : "white" }}
            >
              <div className="relative">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-extrabold text-sm text-slate-900 truncate">
                    {c.name}
                  </p>
                </div>
                <p className="text-xs text-slate-400 truncate">
                  {i === 0 ? "See you at 3!" : "Thanks for the great work!"}
                </p>
              </div>
              {c.id === w.id && (
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: BLUE }}
                />
              )}
            </Link>
          ))}
        </div>
      </aside>

      {/* Chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-3.5 bg-white border-b border-slate-100 shadow-sm flex-shrink-0">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center lg:hidden"
          >
            <ArrowLeft size={17} className="text-slate-700" />
          </button>
          <img
            src={w.avatar}
            alt={w.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
          />
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-sm text-slate-900">{w.name}</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-400 rounded-full" />
              <p className="text-xs text-emerald-600 font-bold">Online now</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors">
              <Phone size={15} className="text-slate-700" />
            </button>
            <button className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-colors">
              <MoreVertical size={15} className="text-slate-700" />
            </button>
          </div>
        </div>

        {/* Job banner */}
        <div className="px-4 sm:px-6 py-2.5 border-b border-slate-100 flex items-center gap-2 bg-blue-50">
          <Briefcase
            size={13}
            style={{ color: BLUE }}
            className="flex-shrink-0"
          />
          <p className="text-xs font-extrabold" style={{ color: "#1E40AF" }}>
            Discussing: {w.skill} job · {w.price}
          </p>
          <span
            className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ background: "#DBEAFE", color: BLUE }}
          >
            Active
          </span>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-4 bg-slate-50"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400 font-semibold">Today</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {msgs.map((msg) => {
            const isCust = msg.sender === "customer";
            return (
              <div
                key={msg.id}
                className={`flex items-end gap-3 ${isCust ? "justify-end" : "justify-start"}`}
              >
                {!isCust && (
                  <img
                    src={w.avatar}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0 shadow-sm"
                  />
                )}
                <div
                  className="max-w-[70%] sm:max-w-[60%] px-4 py-3 text-sm leading-relaxed"
                  style={
                    isCust
                      ? {
                          background: BLUE,
                          color: "white",
                          borderRadius: "18px 18px 4px 18px",
                          boxShadow: `0 4px 12px ${BLUE}35`,
                        }
                      : {
                          background: "white",
                          color: "#111827",
                          borderRadius: "18px 18px 18px 4px",
                          border: "1px solid #E2E8F0",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        }
                  }
                >
                  {msg.text}
                  <p
                    className="text-[10px] mt-1 font-semibold"
                    style={{
                      color: isCust ? "rgba(255,255,255,0.5)" : "#94A3B8",
                      textAlign: isCust ? "right" : "left",
                    }}
                  >
                    {msg.time} {isCust && "✓✓"}
                  </p>
                </div>
                {isCust && (
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop"
                    alt="Me"
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0 shadow-sm"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="px-4 sm:px-6 py-4 bg-white border-t border-slate-100 flex gap-3 items-center">
          <button className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-slate-200 transition-colors">
            <ImageIcon size={17} className="text-slate-500" />
          </button>
          <div className="flex-1 bg-slate-100 rounded-2xl px-4 py-3 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400"
            />
          </div>
          <button
            onClick={send}
            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-white shadow-md transition-all hover:opacity-90 active:scale-90"
            style={{ background: input.trim() ? BLUE : "#CBD5E1" }}
          >
            <Send size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}
