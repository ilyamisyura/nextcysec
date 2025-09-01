"use client";
import React from "react";
import { cx } from "../lib/cx";

type PillProps = {
  children: React.ReactNode;
  accent?: boolean;
  className?: string;
};

export default function Pill({ children, accent = false, className }: PillProps) {
  const base = "inline-flex items-center rounded-full border px-2 py-0.5 text-xs";
  const normal =
    "border-zinc-300/60 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200";
  const accented =
    // Light blue that works in both themes
    "border-sky-300/60 bg-sky-50 text-sky-800 dark:border-sky-400/40 dark:bg-sky-400/15 dark:text-sky-100";

  return (
    <span className={cx(base, accent ? accented : normal, className)}>{children}</span>
  );
}
