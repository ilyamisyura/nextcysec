import { Target, MousePointerClick, Search, ShieldCheck } from "lucide-react";

export const PROCESS = [
  {
    key: "demand" as const,
    title: "Angreifer wollen …",
    icon: Target,
    accent: "from-rose-500 to-orange-500",
  },
  {
    key: "actions" as const,
    title: "So greifen Sie an …",
    icon: MousePointerClick,
    accent: "from-amber-500 to-yellow-500",
  },
  {
    key: "detection" as const,
    title: "So erkennen Sie es …",
    icon: Search,
    accent: "from-sky-500 to-cyan-500",
  },
  {
    key: "measures" as const,
    title: "Das tun Sie stattdessen …",
    icon: ShieldCheck,
    accent: "from-emerald-500 to-lime-500",
  },
];

