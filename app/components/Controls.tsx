"use client";
import React from "react";
import type { Topic } from "../types";
import { Printer } from "lucide-react";

export default function Controls({
  topics,
  topicId,
  setTopicId,
  versionIdx,
  setVersionIdx,
}: {
  topics: Topic[];
  topicId: string;
  setTopicId: (id: string) => void;
  versionIdx: number;
  setVersionIdx: (i: number) => void;
}) {
  const topic = topics.find((t) => t.id === topicId);
  const versions = topic?.items ?? [];

  return (
    <div className="top-0 z-10 mb-6 rounded-2xl border border-zinc-200/80 bg-white/80 p-3 backdrop-blur dark:border-zinc-700/80 dark:bg-zinc-900/80">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Topic select */}
          <label className="flex items-center gap-2 text-sm">
            <span className="text-zinc-600 dark:text-zinc-300">Thema</span>
            <select
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="w-48 rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 shadow-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            >
              {topics.map((t) => (
                <option
                  key={t.id}
                  value={t.id}
                  disabled={(t.items?.length ?? 0) === 0}
                >
                  {t.name}
                  {(t.items?.length ?? 0) === 0 ? " (leer)" : ""}
                </option>
              ))}
            </select>
          </label>

          {/* Version select */}
          <label className="flex items-center gap-2 text-sm">
            <span className="text-zinc-600 dark:text-zinc-300">Version</span>
            <select
              value={versionIdx}
              onChange={(e) => setVersionIdx(Number(e.target.value))}
              className="w-52 rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 shadow-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            >
              {versions.map((v, i) => (
                <option key={i} value={i}>
                  V{i + 1} —{" "}
                  {v.hook.length > 36 ? v.hook.slice(0, 33) + "…" : v.hook}
                </option>
              ))}
            </select>
          </label>

          {/* Format placeholder (future) */}
          <label className="flex items-center gap-2 text-sm opacity-60">
            <span className="text-zinc-600 dark:text-zinc-300">Format</span>
            <select
              disabled
              className="rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            >
              <option>Hochformat (A5)</option>
              <option>— weitere folgen —</option>
            </select>
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <Printer className="h-4 w-4" /> Drucken
          </button>
        </div>
      </div>
    </div>
  );
}

