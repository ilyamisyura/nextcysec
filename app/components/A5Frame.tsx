"use client";
import React from "react";
import { cx } from "../lib/cx";

export default function A5Frame({
  children,
  orientation = "portrait",
}: {
  children: React.ReactNode;
  orientation?: "portrait" | "landscape";
}) {
  return (
    <div
      className={cx(
        "relative isolate w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl ring-1 ring-black/5 dark:border-zinc-700 dark:bg-zinc-900"
      )}
    >
      {/* subtle gradient corners */}
      <div className="pointer-events-none absolute -inset-32 -z-10 bg-[radial-gradient(40rem_30rem_at_0%_0%,rgba(99,102,241,0.06),transparent_60%),radial-gradient(32rem_24rem_at_100%_100%,rgba(16,185,129,0.06),transparent_60%)]" />
      {children}
    </div>
  );
}

