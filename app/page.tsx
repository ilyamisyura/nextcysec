"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Target,
  MousePointerClick,
  Search,
  ShieldCheck,
  Maximize2,
  Minimize2,
  RotateCw,
  Printer,
} from "lucide-react";

/**
 * Next/React single-file demo for A5 table-stand artifacts
 * - Uses Tailwind (v4-compatible utility classes)
 * - Beautiful, responsive cards with fixed Process Strip
 * - Now supports: Topic & Version selectors
 *
 * How to use in Next.js (app router):
 * 1) Create `app/page.tsx` and paste this entire file there.
 * 2) Ensure Tailwind is set up; no custom plugin required. (Tailwind v3+ works too.)
 * 3) Run the dev server and adjust CATALOG as needed.
 */

/**
 * -----------------------------
 *  Types & Sample Data
 * -----------------------------
 */
export type Artifact = {
  hook: string;
  scenario: string;
  demand: string[]; // attacker wants
  detection: string[]; // how to spot it
  actions: string[]; // what users might do (risk)
  measures: string[]; // what to do instead
  area_tag: string; // e.g., "everyone", "accounting"
  badges: string[]; // e.g., ["email", "web", "phone"]
  language: string; // e.g., "de-CH"
};

export type Topic = {
  id: string; // e.g., "phishing"
  name: string; // e.g., "Phishing"
  items: Artifact[]; // one or more versions for this topic
};

/**
 * CATALOG: Add ~5 topics here. Each topic can have 1–3 versions.
 * For now we provide only the two Phishing versions as examples.
 */
const CATALOG: Topic[] = [
  {
    id: "phishing",
    name: "Phishing",
    items: [
      {
        hook: "E-Mail-Link? Erst prüfen, dann klicken.",
        scenario:
          "Sie erhalten eine überraschende E-Mail vom «Support», die Sie auffordert, Ihr Konto sofort zu bestätigen.",
        demand: [
          "Anmeldedaten für Ihr Konto",
          "Kreditkartendaten",
          "Zugriff auf Ihr E-Mail-Konto",
        ],
        actions: [
          "Auf den Link klicken",
          "Benutzernamen und Passwort eingeben",
          "Anhang öffnen oder Software installieren",
        ],
        detection: [
          "Drohung mit Sperrung oder Frist",
          "Absenderadresse passt nicht zur Firma",
          "Link-Adresse weicht von der offiziellen Seite ab",
        ],
        measures: [
          "Webadresse immer selbst eintippen statt auf Links zu klicken",
          "Nichts eingeben; E-Mail intern melden",
          "Zwei-Faktor-Authentifizierung aktivieren",
        ],
        area_tag: "everyone",
        badges: ["email", "web", "password"],
        language: "de-CH",
      },
      {
        hook: "Rechnung? Erst prüfen, dann zahlen.",
        scenario:
          "Sie bekommen eine E-Mail mit «dringender» Zahlungsaufforderung und einem Link zur angeblichen Rechnungsfreigabe.",
        demand: ["Geldüberweisung", "Kreditkartendaten", "Freigabe von Zahlungen"],
        actions: [
          "Auf Zahlungs-Link klicken",
          "Kartendaten eingeben",
          "Freigabe ohne Rückfrage erteilen",
        ],
        detection: [
          "Ungewöhnlicher Zeitdruck («heute noch zahlen»)",
          "Absender oder Link-Domäne wirken ungewohnt",
          "Bitte, Daten über E-Mail/Link einzugeben",
        ],
        measures: [
          "Zahlungen nur über den bekannten Prozess (z. B. Vier-Augen-Prinzip) freigeben",
          "URL selbst eintippen; keine Links aus E-Mails verwenden",
          "Unsicher? Sofort intern melden; keine Daten preisgeben",
        ],
        area_tag: "accounting",
        badges: ["email", "payments", "web"],
        language: "de-CH",
      },
    ],
  },
  // Example placeholder topic (add your real items later)
  { id: "smishing", name: "Smishing (SMS)", items: [] },
  { id: "vishing", name: "Vishing (Telefon)", items: [] },
  { id: "quishing", name: "QR-Code-Fallen", items: [] },
  { id: "passwords", name: "Passwörter & 2FA", items: [] },
];

/**
 * Fixed Process Strip titles (de-CH)
 * The order and icons must not change.
 */
const PROCESS = [
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

/** Utility: classnames */
function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/** Badge pill */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-300/60 bg-zinc-50 px-2 py-0.5 text-xs text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
      {children}
    </span>
  );
}

/** Small divider */
function Dot() {
  return <span className="mx-1 inline-block h-1 w-1 rounded-full bg-zinc-400 align-middle" />;
}

/** A5 aspect box */
function A5Frame({
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

/** The card content for one artifact */
function TableStandCard({
  data,
  orientation,
  index,
}: {
  data: Artifact;
  orientation: "portrait" | "landscape";
  index: number;
}) {
  const grid = orientation === "portrait" ? "md:grid-cols-2" : "md:grid-cols-4";

  return (
    <A5Frame orientation={orientation}>
      <div className="flex h-full w-full flex-col">
        {/* Header */}
        <header className="flex items-start gap-3 border-b border-zinc-200/70 px-5 py-4 dark:border-zinc-700/70">
          <div className="flex-1">
            <div className="text-[0.7rem] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              A5 Table-Stand · Version {index + 1} · {data.language}
            </div>
            <h1 className="text-balance text-2xl font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
              {data.hook}
            </h1>
            <p className="mt-1 text-pretty text-sm text-zinc-600 dark:text-zinc-300">
              {data.scenario}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1">
            <Pill>{data.area_tag}</Pill>
            <div className="flex flex-wrap items-center gap-1.5">
              {data.badges.map((b) => (
                <Pill key={b}>{b}</Pill>
              ))}
            </div>
          </div>
        </header>

        {/* Process Strip */}
        <section className={cx("grid flex-1 grid-cols-1 gap-3 px-5 py-4", grid)}>
          {PROCESS.map(({ key, title, icon: Icon, accent }) => (
            <div
              key={key}
              className="group relative flex flex-col rounded-2xl border border-zinc-200/70 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-700/70 dark:bg-zinc-950"
            >
              <div className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-0 ring-1 ring-black/5 transition-opacity group-hover:opacity-100" />
              <div className="mb-2 flex items-center gap-2">
                <div className={cx("grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm", accent)}>
                  <Icon className="h-4 w-4" />
                </div>
                <h2 className="text-md font-semibold text-zinc-900 dark:text-zinc-100">{title}</h2>
              </div>
              <ul className="ml-1 space-y-1.5 text-md text-zinc-700 dark:text-zinc-300">
                {data[key].slice(0, 3).map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400/70" />
                    <span className="text-pretty leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-auto flex items-center justify-between gap-2 border-t border-zinc-200/70 px-5 py-3 text-xs text-zinc-500 dark:border-zinc-700/70 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span>Prozess: Druck → Neugier → Geld → Zugang</span>
            <Dot />
            <span>Immer gleiche Reihenfolge & Icons</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Drucken oder als PDF sichern</span>
          </div>
        </footer>
      </div>
    </A5Frame>
  );
}

/** Controls: Topic & Version selectors; keep space for future formats. */
function Controls({
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
    <div className="sticky top-0 z-10 -mx-4 mb-6 rounded-2xl border border-zinc-200/80 bg-white/80 p-3 backdrop-blur dark:border-zinc-700/80 dark:bg-zinc-900/80">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Topic select */}
          <label className="flex items-center gap-2 text-sm">
            <span className="text-zinc-600 dark:text-zinc-300">Thema</span>
            <select
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 shadow-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            >
              {topics.map((t) => (
                <option key={t.id} value={t.id} disabled={(t.items?.length ?? 0) === 0}>
                  {t.name}{(t.items?.length ?? 0) === 0 ? " (leer)" : ""}
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
              className="rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 shadow-sm outline-none focus:ring-2 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            >
              {versions.map((v, i) => (
                <option key={i} value={i}>
                  V{i + 1} — {v.hook.length > 36 ? v.hook.slice(0, 33) + "…" : v.hook}
                </option>
              ))}
            </select>
          </label>

          {/* Format placeholder (future) */}
          <label className="flex items-center gap-2 text-sm opacity-60">
            <span className="text-zinc-600 dark:text-zinc-300">Format</span>
            <select disabled className="rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-800 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
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

/**
 * Main Page
 */
export default function TableStandApp() {
  // Defaults
  const [topicId, setTopicId] = useState(CATALOG[0].id);
  const [versionIdx, setVersionIdx] = useState(0);

  // Keep only one view for now (Hochformat).
  const orientation: "portrait" | "landscape" = "portrait";

  const topic = useMemo(() => CATALOG.find((t) => t.id === topicId)!, [topicId]);
  const current = useMemo(() => topic.items[versionIdx], [topic, versionIdx]);

  // Reset version when switching topic
  useEffect(() => {
    setVersionIdx(0);
  }, [topicId]);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <h1 className="mb-2 text-3xl font-semibold tracking-tight">A5 Table-Stands · Cyber Awareness</h1>

      <Controls
        topics={CATALOG}
        topicId={topicId}
        setTopicId={setTopicId}
        versionIdx={versionIdx}
        setVersionIdx={setVersionIdx}
      />

      {current ? (
        <div className="grid gap-6 md:grid-cols-1">
          <TableStandCard data={current} orientation={orientation} index={versionIdx} />
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
          Für dieses Thema sind noch keine Versionen hinterlegt. Fügen Sie Einträge in <code>CATALOG</code> hinzu.
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
