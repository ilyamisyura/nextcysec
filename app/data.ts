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
                    { title: "Anmeldedaten für Ihr Konto", description: "Mit Ihren Anmeldedaten können sie in Ihrem Namen handeln und weitere Angriffe starten. Dies ist oft nur der erste Schritt für grössere Betrügereien." },
                    { title: "Kreditkartendaten", description: "Die Kartennummer, Ablaufdatum und CVV-Code ermöglichen sofortige Online-Einkäufe. Betrüger verkaufen diese Daten auch im Darknet weiter. Bis Sie es merken, ist der Schaden oft schon gross." },
                    { title: "Zugriff auf Ihr E-Mail-Konto", description: "Ihr E-Mail-Konto ist der Schlüssel zu allen anderen Konten über Passwort-Resets. Betrüger können damit Ihre Identität übernehmen und Kollegen täuschen. E-Mail-Zugriff ist für Kriminelle wertvoller als Geld." },
                ],
                actions: [
                    { title: "Auf den Link klicken", description: "Der Link führt auf eine gefälschte Website, die täuschend echt aussieht. Schon der Klick kann Schadsoftware aktivieren. Die Webadresse in der Statusleiste zeigt oft verräterische Abweichungen." },
                    { title: "Benutzernamen und Passwort eingeben", description: "Die Eingabemaske sieht aus wie die echte Login-Seite Ihrer Bank oder Firma. Ihre Daten landen direkt bei den Betrügern. Diese melden sich sofort damit an und ändern Ihr Passwort." },
                    { title: "Anhang öffnen oder Software installieren", description: "Der Anhang enthält versteckte Schadsoftware, auch in scheinbar harmlosen PDFs oder Word-Dateien. Die Software verschlüsselt Ihre Dateien oder spioniert Tastatureingaben aus. Ein Klick kann das ganze Firmennetzwerk infizieren." },
                ],
                detection: [
                    { title: "Drohung mit Sperrung oder Frist", description: "«Ihr Konto wird in 24 Stunden gesperrt» erzeugt Handlungsdruck. Seriöse Firmen setzen keine derart kurzen Fristen per E-Mail. Diese künstliche Eile soll verhindern, dass Sie nachdenken oder nachfragen." },
                    { title: "Absenderadresse passt nicht zur Firma", description: "Die angezeigte Absenderadresse weicht subtil ab: support@miRCosoft.com statt miCRosoft.com. Prüfen Sie immer die vollständige Adresse, nicht nur den Anzeigenamen." },
                    { title: "Link-Adresse weicht von der offiziellen Seite ab", description: "Fahren Sie mit der Maus über den Link ohne zu klicken - die echte Adresse erscheint. Statt postfinance.ch steht da postfinance-sicherheit.fake-domain.com. Auch verkürzte Links (bit.ly) verschleiern das wahre Ziel." },
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
            // #1 TODO add third detection and measures
            {
                hook: "Chef-Mail? Kurz zurückrufen.",
                scenario:
                    "Sie erhalten eine eilige Zahlungsanweisung «vom Chef» aus dem Ausland.",
                demand: [
                    { title: "Geld", description: "Betrüger wollen schnelle Überweisungen auf ihre Konten, oft im Ausland. Die Beträge sind geschickt gewählt - hoch genug für Profit, niedrig genug um nicht aufzufallen. Einmal überwiesen, ist das Geld meist unwiederbringlich verloren." },
                    { title: "Vertrauliche Daten", description: "Informationen über Geschäftspartner, Zahlungsabläufe und interne Prozesse. Diese Daten nutzen Betrüger für gezieltere Angriffe. Auch der Weiterverkauf von Geschäftsgeheimnissen ist lukrativ." },
                ],
                actions: [
                    { title: "Zahlung per E-Mail-Anweisung freigeben", description: "Sie kopieren die neue IBAN ohne Nachfrage in Ihr Zahlungssystem. Die Zahlung sieht normal aus - gleicher Betrag, gleicher Empfängername. Erst Wochen später merkt der echte Lieferant, dass kein Geld ankam." },
                    { title: "Prozesse umgehen (keine Vier Augen)", description: "Der angebliche Zeitdruck verleitet dazu, Sicherheitsprozesse zu überspringen. «Nur dieses eine Mal» wird zur teuren Ausnahme. Betrüger kennen Ihre Prozesse und fordern gezielt deren Umgehung." },
                    { title: "Nur per E-Mail kommunizieren", description: "Sie bleiben in der kompromittierten E-Mail-Kette gefangen. Der Betrüger kontrolliert die gesamte Kommunikation. Ein Anruf hätte den Betrug sofort aufgedeckt." },
                ],
                detection: [
                    { title: "Druck auf Tempo/Geheimhaltung «vom Chef»", description: "«Streng vertraulich, sofort erledigen, mit niemandem sprechen» sind Warnsignale. Echte Chefs respektieren Sicherheitsprozesse auch unter Zeitdruck. Die angebliche Geheimhaltung verhindert, dass Sie nachfragen." },
                    { title: "Absenderadresse minimal abweichend", description: "max.muster@firrna.ch statt firma.ch - ein Buchstabe Unterschied. Der Anzeigename «Max Muster» stimmt, aber die E-Mail-Adresse nicht. Diese Details übersieht man unter Stress leicht." },
                    { title: "Nicht zuständig für Zahlungen? Ignorieren oder melden", description: "Wenn Sie nicht für die Zahlungen verantwortlich sind, sind unerwartete Zahlungsanweisungen verdächtig. Reagieren Sie nicht darauf, sondern melden Sie dies intern." }

                ],
                measures: [
                    { title: "Immer telefonisch verifizieren (eigene Kontaktliste nutzen)", description: "Rufen Sie über die Ihnen bekannte Nummer zurück, nie über die in der E-Mail angegebene. Fragen Sie konkret nach der angeblichen Anweisung. Selbst wenn es peinlich scheint - besser einmal zu viel nachgefragt." },
                    { title: "Prozesse strikt einhalten: Vier-Augen-Prinzip/Unterschrift zu zweien", description: "Keine Ausnahmen, auch nicht für den «Chef» oder bei «Dringlichkeit». Diese Prozesse existieren genau für solche Situationen. Wer echten Zeitdruck hat, versteht die Notwendigkeit der Sicherheitsprüfung." },
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
                    { title: "Geld", description: "Die neue IBAN führt direkt auf das Konto der Betrüger. Sie geben sich als bestehender Lieferant aus und rechnen mit Ihrer Routine." },
                    { title: "Vertrauliche Daten", description: "Details über Zahlungsläufe, Lieferantenbeziehungen und Rechnungsbeträge. Diese Insider-Informationen machen künftige Angriffe glaubwürdiger. Die Betrüger lernen Ihre Abläufe und passen sich an." },
                ],
                actions: [
                    { title: "Geänderte IBAN in die Zahlung übernehmen", description: "Sie kopieren die neue IBAN ohne Nachfrage in Ihr Zahlungssystem. Die Zahlung sieht normal aus - gleicher Betrag, gleicher Empfängername. Erst Wochen später merkt der echte Lieferant, dass kein Geld ankam." },
                    { title: "Zahlung ohne Rückruf freigeben", description: "Sie verlassen sich auf die E-Mail-Kommunikation als einzige Quelle. Kein Anruf, keine Verifikation über einen zweiten Kanal. Diese Nachlässigkeit kostet Firmen jährlich Millionen." },
                    { title: "Ungeprüft an die Buchhaltung weiterleiten", description: "Sie geben die Information ohne Warnung oder Prüfung weiter. Die Buchhaltung vertraut Ihrer Weiterleitung und ändert die Stammdaten. Der Fehler multipliziert sich über alle künftigen Zahlungen." },
                ],
                detection: [
                    { title: "Rechnung kommt nochmals – mit neuer IBAN", description: "Dieselbe Rechnung erscheint erneut, nur die Bankdaten sind anders. Seriöse Firmen senden bei IBAN-Änderungen separate Mitteilungen, nicht einfach die alte Rechnung nochmals. Diese Dublette ist ein klares Warnsignal." },
                    { title: "Absenderadresse oder Signatur wirkt leicht anders", description: "Die E-Mail-Signatur fehlt oder sieht anders aus als gewohnt. Schriftart, Logos oder Kontaktdetails stimmen nicht. Diese Inkonsistenzen verraten die Fälschung." },
                    { title: "Ungewöhnliche Zahlungsaufforderung", description: "Timing, Tonfall oder Inhalt der Anfrage wirken anders als gewohnt. Unübliche Zahlungsziele oder Beträge sollten Sie stutzig machen. Vertrauen Sie Ihrem Bauchgefühl bei Abweichungen vom Normalen." },
                ],
                measures: [
                    { title: "Rückruf an bekannte Nummer – erst dann zahlen", description: "Nutzen Sie Ihre Kontaktliste oder alte Rechnungen für die Telefonnummer. Fragen Sie explizit nach der IBAN-Änderung und lassen Sie sich den Grund erklären. Kein Anruf = keine Zahlung, ohne Ausnahme." },
                    { title: "Vier-Augen-Prinzip / Unterschrift zu zweien einhalten", description: "IBAN-Änderungen müssen immer von zwei Personen geprüft werden. Beide müssen unabhängig die Änderung verifizieren. Dieser Prozess hat schon unzählige Betrugsfälle verhindert." },
                    { title: "Schon gezahlt? Handeln Sie sofort!", description: "Schnelligkeit ist entscheidend - informieren Sie sofort Ihre Bank für einen Rückrufversuch. Melden Sie den Vorfall der Kantonspolizei für die Strafverfolgung." },
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
