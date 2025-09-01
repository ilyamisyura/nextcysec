"use client";
import React, { useEffect, useMemo, useState } from "react";
import Controls from "./components/Controls";
import TableStandCard from "./components/TableStandCard";
import type { Artifact, Topic } from "./types";
import { CATALOG } from "./data";

/**
 * Main Page
 */
export default function TableStandApp() {
  // Defaults
  const [topicId, setTopicId] = useState(CATALOG[0].id);
  const [versionIdx, setVersionIdx] = useState(0);
  const [mode, setMode] = useState<"full" | "detection" | "measures">("full");

  // Keep only one view for now (Hochformat).
  const orientation: "portrait" | "landscape" = "portrait";

  const topic = useMemo(
    () => CATALOG.find((t) => t.id === topicId)!,
    [topicId]
  );
  const current = useMemo(() => topic.items[versionIdx], [topic, versionIdx]);

  // Reset version when switching topic
  useEffect(() => {
    setVersionIdx(0);
  }, [topicId]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <h1 className="mb-4 text-3xl font-semibold tracking-tight">
        A5 Table-Stands · Cyber Awareness
      </h1>

      <Controls
        topics={CATALOG}
        topicId={topicId}
        setTopicId={setTopicId}
        versionIdx={versionIdx}
        setVersionIdx={setVersionIdx}
        mode={mode}
        setMode={setMode}
      />

      {current ? (
        <div className="grid gap-6 md:grid-cols-1">
          <TableStandCard
            data={current}
            orientation={orientation}
            index={versionIdx}
            mode={mode}
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          Für dieses Thema sind noch keine Versionen hinterlegt. Fügen Sie
          Einträge in <code>CATALOG</code> hinzu.
        </div>
      )}

      {/* Print styles */}
      <style>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          main { margin: 0 !important; padding: 0 !important; }
          .sticky { position: static !important; }
          button, select, label { display: none !important; }
          h1, p, section { break-inside: avoid; }
        }
      `}</style>
    </main>
  );
}
