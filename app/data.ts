import { Topic } from "./types";

/**
 * -----------------------------
 *  Sample Data
 * -----------------------------
 */

/**
 * CATALOG: Add ~5 topics here. Each topic can have 1–3 versions.
 * For now we provide only the two Phishing versions as examples.
 */
export const CATALOG: Topic[] = [
    {
        id: "phishing",
        name: "Phishing",
        items: [
            {
                hook: "E-Mail-Link? Erst prüfen, dann klicken.",
                scenario:
                    "Sie erhalten eine überraschende E-Mail vom «Support», die Sie auffordert, Ihr Konto sofort zu bestätigen.",
                demand: [
                    { title: "Anmeldedaten für Ihr Konto", description: "" },
                    { title: "Kreditkartendaten", description: "" },
                    { title: "Zugriff auf Ihr E-Mail-Konto", description: "" },
                ],
                actions: [
                    { title: "Auf den Link klicken", description: "" },
                    { title: "Benutzernamen und Passwort eingeben", description: "" },
                    { title: "Anhang öffnen oder Software installieren", description: "" },
                ],
                detection: [
                    { title: "Drohung mit Sperrung oder Frist", description: "Darova yebat" },
                    { title: "Absenderadresse passt nicht zur Firma", description: "" },
                    { title: "Link-Adresse weicht von der offiziellen Seite ab", description: "" },
                ],
                measures: [
                    { title: "Webadresse immer selbst eintippen statt auf Links zu klicken", description: "" },
                    { title: "Nichts eingeben; E-Mail intern melden", description: "" },
                    { title: "Zwei-Faktor-Authentifizierung aktivieren", description: "" },
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
                demand: [
                    { title: "Geld", description: "" },
                    { title: "Zugangsdaten (E-Mail)", description: "" },
                    { title: "Vertrauliche Daten", description: "" },
                ],
                actions: [
                    { title: "Zahlung per E-Mail-Anweisung freigeben", description: "" },
                    { title: "Prozesse umgehen (keine Vier Augen)", description: "" },
                    { title: "Nur per E-Mail kommunizieren", description: "" },
                ],
                detection: [
                    { title: "Druck auf Tempo/Geheimhaltung «vom Chef»", description: "" },
                    { title: "Neue Bankdaten/IBAN-Wechsel", description: "" },
                    { title: "Absenderadresse minimal abweichend", description: "" },
                ],
                measures: [
                    { title: "Immer telefonisch verifizieren (eigene Kontaktliste nutzen)", description: "" },
                    { title: "Prozesse strikt einhalten: Vier-Augen-Prinzip/Unterschrift zu zweien", description: "" },
                    { title: "Schon gezahlt? Sofort Bank & Kantonspolizei; intern melden", description: "" },
                ],
                area_tag: "everyone",
                badges: ["email", "ceo", "payment", "iban", "urgency"],
                language: "de-CH",
            },
            {
                hook: "Neue IBAN? Erst verifizieren.",
                scenario:
                    "Sie erhalten eine Rechnung erneut – diesmal mit geänderter IBAN.",
                demand: [
                    { title: "Geld", description: "" },
                    { title: "Zugangsdaten (E-Mail)", description: "" },
                    { title: "Vertrauliche Daten", description: "" },
                ],
                actions: [
                    { title: "Geänderte IBAN in die Zahlung übernehmen", description: "" },
                    { title: "Zahlung ohne Rückruf freigeben", description: "" },
                    { title: "Ungeprüft an die Buchhaltung weiterleiten", description: "" },
                ],
                detection: [
                    { title: "Rechnung kommt nochmals – mit neuer IBAN", description: "" },
                    { title: "Bitte: «künftige Zahlungen auf anderes Konto»", description: "" },
                    { title: "Absenderadresse oder Signatur wirkt leicht anders", description: "" },
                ],
                measures: [
                    { title: "Rückruf an bekannte Nummer – erst dann zahlen", description: "" },
                    { title: "Vier-Augen-Prinzip / Unterschrift zu zweien einhalten", description: "" },
                    { title: "Schon gezahlt? Sofort Bank & Kantonspolizei; Absender informieren; Passwort ändern & Weiterleitungen prüfen", description: "" },
                ],
                area_tag: "accounting",
                badges: ["email", "invoice", "payment", "iban"],
                language: "de-CH",
            },
            {
                hook: "Rechnung? Erst verifizieren.",
                scenario:
                    "Sie erhalten eine «dringende» Zahlungsaufforderung mit Hinweis auf neue Zahlungsabwicklung/Bankdaten.",
                demand: [
                    { title: "Geld", description: "" },
                    { title: "Zugangsdaten (E-Mail)", description: "" },
                    { title: "Vertrauliche Daten", description: "" },
                ],
                actions: [
                    { title: "Neue Bankdaten ungeprüft übernehmen", description: "" },
                    { title: "Ohne Rücksprache freigeben", description: "" },
                    { title: "Interne Freigabeprozesse umgehen", description: "" },
                ],
                detection: [
                    { title: "Ungewöhnliche Zahlungsaufforderung", description: "" },
                    { title: "Hinweis: «künftige Zahlungen auf anderes Konto»", description: "" },
                    { title: "Bezug auf laufende Konversation – Details plötzlich geändert", description: "" },
                ],
                measures: [
                    { title: "Telefonisch rückfragen (nicht über die E-Mail-Kette)", description: "" },
                    { title: "Firmenprozess einhalten: Vier-Augen/Unterschrift zu zweien", description: "" },
                    { title: "Schon gezahlt oder kompromittiert? Bank & Kantonspolizei; Passwort ändern, Filter/Weiterleitungen prüfen", description: "" },
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
