"use client";
import React from "react";
import type { Artifact, Detail } from "../types";
import { cx } from "../lib/cx";
import { PROCESS } from "../lib/process";
import A5Frame from "./A5Frame";
import Pill from "./Pill";

export default function TableStandCard({
  data,
  orientation,
  index,
  mode = "full",
}: {
  data: Artifact;
  orientation: "portrait" | "landscape";
  index: number;
  mode?: "full" | "detect";
}) {
  const baseGrid = orientation === "portrait" ? "md:grid-cols-2" : "md:grid-cols-4";
  const grid = mode === "detect" ? "md:grid-cols-3" : baseGrid;

  return (
    <A5Frame orientation={orientation}>
      <div className="flex h-full w-full flex-col">
        {/* Header */}
        <header className="flex items-start gap-3 border-b border-zinc-200/70 px-5 py-4 dark:border-zinc-700/70">
          <div className="flex-1">
            <div className="mb-2 text-[0.7rem] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Version {index + 1} · {data.language}
            </div>
            <h1 className="text-balance text-2xl font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
              {data.hook}
            </h1>
            <p className="mt-1 text-pretty text-md text-zinc-600 dark:text-zinc-300">
              {data.scenario}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-2">
            <Pill>{data.area_tag}</Pill>
            <div className="flex flex-wrap items-center gap-1.5">
              {data.badges.map((b) => (
                <Pill key={b}>{b}</Pill>
              ))}
            </div>
          </div>
        </header>

        {/* Process Strip / Detect-only view */}
        <section className={cx("grid flex-1 grid-cols-1 gap-3 px-5 py-4", grid)}>
          {mode === "full"
            ? PROCESS.map(({ key, title, icon: Icon, accent }) => (
                <div
                  key={key}
                  className="group relative flex flex-col rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700/70 dark:bg-zinc-950"
                >
                  <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-0 ring-1 ring-black/5 transition-opacity group-hover:opacity-100" />
                  <div className="mb-2 flex items-center gap-2">
                    <div
                      className={cx(
                        "grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm",
                        accent
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <h2 className="text-md font-semibold text-zinc-900 dark:text-zinc-100">
                      {title}
                    </h2>
                  </div>
                  <ul className="ml-1 space-y-1.5 text-md text-zinc-700 dark:text-zinc-300">
                    {(data[key] as Detail[]).slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400/70" />
                        <div className="flex-1">
                          <div className="text-pretty leading-relaxed font-medium">
                            {item.title}
                          </div>
                          {item.description ? (
                            <div className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                              {item.description}
                            </div>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            : // Detect-only mode: show each detection item as its own card
              (data["detection"] as Detail[]).map((item, i) => (
                <div
                  key={i}
                  className="group relative flex flex-col rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700/70 dark:bg-zinc-950"
                >
                  <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-0 ring-1 ring-black/5 transition-opacity group-hover:opacity-100" />
                  <h2 className="mb-1 text-md font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </h2>
                  {item.description ? (
                    <p className="text-md text-zinc-700 dark:text-zinc-300">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              ))}
        </section>

        {/* Footer */}
        <footer className="mt-auto flex items-center justify-between gap-2 border-t border-zinc-200/70 px-5 py-3 text-xs text-zinc-500 dark:border-zinc-700/70 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span>Drucken oder als PDF sichern</span>
          </div>
        </footer>
      </div>
    </A5Frame>
  );
}
