"use client";
import React, { useEffect, useMemo, useState } from "react";
import Controls from "./components/Controls";
import TableStandCard from "./components/TableStandCard";
import type { Artifact, Topic } from "./types";

/**
 * -----------------------------
 *  Types & Sample Data
 * -----------------------------
 */
// Types moved to app/types.ts

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
    ],
  },
  {
    id: "business_email_compromise",
    name: "Rechnungsmanipulationsbetrug (BEC-Betrug)",
    items: [
      {
        hook: "Chef-Mail? Kurz zurückrufen.",
        scenario:
          "Sie erhalten eine eilige Zahlungsanweisung «vom Chef» aus dem Ausland.",
        demand: ["Geld", "Zugangsdaten (E-Mail)", "Vertrauliche Daten"],
        actions: [
          "Zahlung per E-Mail-Anweisung freigeben",
          "Prozesse umgehen (keine Vier Augen)",
          "Nur per E-Mail kommunizieren",
        ],
        detection: [
          "Druck auf Tempo/Geheimhaltung «vom Chef»",
          "Neue Bankdaten/IBAN-Wechsel",
          "Absenderadresse minimal abweichend",
        ],
        measures: [
          "Immer telefonisch verifizieren (eigene Kontaktliste nutzen)",
          "Prozesse strikt einhalten: Vier-Augen-Prinzip/Unterschrift zu zweien",
          "Schon gezahlt? Sofort Bank & Kantonspolizei; intern melden",
        ],
        area_tag: "everyone",
        badges: ["email", "ceo", "payment", "iban", "urgency"],
        language: "de-CH",
      },
      {
        hook: "Neue IBAN? Erst verifizieren.",
        scenario:
          "Sie erhalten eine Rechnung erneut – diesmal mit geänderter IBAN.",
        demand: ["Geld", "Zugangsdaten (E-Mail)", "Vertrauliche Daten"],
        actions: [
          "Geänderte IBAN in die Zahlung übernehmen",
          "Zahlung ohne Rückruf freigeben",
          "Ungeprüft an die Buchhaltung weiterleiten",
        ],
        detection: [
          "Rechnung kommt nochmals – mit neuer IBAN",
          "Bitte: «künftige Zahlungen auf anderes Konto»",
          "Absenderadresse oder Signatur wirkt leicht anders",
        ],
        measures: [
          "Rückruf an bekannte Nummer – erst dann zahlen",
          "Vier-Augen-Prinzip / Unterschrift zu zweien einhalten",
          "Schon gezahlt? Sofort Bank & Kantonspolizei; Absender informieren; Passwort ändern & Weiterleitungen prüfen",
        ],
        area_tag: "accounting",
        badges: ["email", "invoice", "payment", "iban"],
        language: "de-CH",
      },
      {
        hook: "Rechnung? Erst verifizieren.",
        scenario:
          "Sie erhalten eine «dringende» Zahlungsaufforderung mit Hinweis auf neue Zahlungsabwicklung/Bankdaten.",
        demand: ["Geld", "Zugangsdaten (E-Mail)", "Vertrauliche Daten"],
        actions: [
          "Neue Bankdaten ungeprüft übernehmen",
          "Ohne Rücksprache freigeben",
          "Interne Freigabeprozesse umgehen",
        ],
        detection: [
          "Ungewöhnliche Zahlungsaufforderung",
          "Hinweis: «künftige Zahlungen auf anderes Konto»",
          "Bezug auf laufende Konversation – Details plötzlich geändert",
        ],
        measures: [
          "Telefonisch rückfragen (nicht über die E-Mail-Kette)",
          "Firmenprozess einhalten: Vier-Augen/Unterschrift zu zweien",
          "Schon gezahlt oder kompromittiert? Bank & Kantonspolizei; Passwort ändern, Filter/Weiterleitungen prüfen",
        ],
        area_tag: "accounting",
        badges: ["email", "invoice", "payment", "iban"],
        language: "de-CH",
      },
    ],
  },
  { id: "vishing", name: "Vishing (Telefon)", items: [] },
  { id: "quishing", name: "QR-Code-Fallen", items: [] },
  { id: "passwords", name: "Passwörter & 2FA", items: [] },
];

/**
 * Main Page
 */
export default function TableStandApp() {
  // Defaults
  const [topicId, setTopicId] = useState(CATALOG[0].id);
  const [versionIdx, setVersionIdx] = useState(0);

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
      />

      {current ? (
        <div className="grid gap-6 md:grid-cols-1">
          <TableStandCard
            data={current}
            orientation={orientation}
            index={versionIdx}
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
