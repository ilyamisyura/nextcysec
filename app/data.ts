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
          {
            title: "Anmeldedaten für Ihr Konto",
            description:
              "Mit Ihren Anmeldedaten können sie in Ihrem Namen handeln und weitere Angriffe starten. Dies ist oft nur der erste Schritt für grössere Betrügereien.",
          },
          {
            title: "Kreditkartendaten",
            description:
              "Die Kartennummer, Ablaufdatum und CVV-Code ermöglichen sofortige Online-Einkäufe. Betrüger verkaufen diese Daten auch im Darknet weiter. Bis Sie es merken, ist der Schaden oft schon gross.",
          },
          {
            title: "Zugriff auf Ihr E-Mail-Konto",
            description:
              "Ihr E-Mail-Konto ist der Schlüssel zu allen anderen Konten über Passwort-Resets. Betrüger können damit Ihre Identität übernehmen und Kollegen täuschen. E-Mail-Zugriff ist für Kriminelle wertvoller als Geld.",
          },
        ],
        actions: [
          {
            title: "Auf den Link klicken",
            description:
              "Der Link führt auf eine gefälschte Website, die täuschend echt aussieht. Schon der Klick kann Schadsoftware aktivieren. Die Webadresse in der Statusleiste zeigt oft verräterische Abweichungen.",
          },
          {
            title: "Benutzernamen und Passwort eingeben",
            description:
              "Die Eingabemaske sieht aus wie die echte Login-Seite Ihrer Bank oder Firma. Ihre Daten landen direkt bei den Betrügern. Diese melden sich sofort damit an und ändern Ihr Passwort.",
          },
          {
            title: "Anhang öffnen oder Software installieren",
            description:
              "Der Anhang enthält versteckte Schadsoftware, auch in scheinbar harmlosen PDFs oder Word-Dateien. Die Software verschlüsselt Ihre Dateien oder spioniert Tastatureingaben aus. Ein Klick kann das ganze Firmennetzwerk infizieren.",
          },
        ],
        detection: [
          {
            title: "Drohung mit Sperrung oder Frist",
            description:
              "«Ihr Konto wird in 24 Stunden gesperrt» erzeugt Handlungsdruck. Seriöse Firmen setzen keine derart kurzen Fristen per E-Mail. Diese künstliche Eile soll verhindern, dass Sie nachdenken oder nachfragen.",
          },
          {
            title: "Absenderadresse passt nicht zur Firma",
            description:
              "Die angezeigte Absenderadresse weicht subtil ab: support@miRCosoft.com statt miCRosoft.com. Prüfen Sie immer die vollständige Adresse, nicht nur den Anzeigenamen.",
          },
          {
            title: "Link-Adresse weicht von der offiziellen Seite ab",
            description:
              "Fahren Sie mit der Maus über den Link ohne zu klicken - die echte Adresse erscheint. Statt postfinance.ch steht da postfinance-sicherheit.fake-domain.com. Auch verkürzte Links (bit.ly) verschleiern das wahre Ziel.",
          },
        ],
        measures: [
          {
            title:
              "Webadresse immer selbst eintippen statt auf Links zu klicken",
            description: "",
          },
          { title: "Nichts eingeben; E-Mail intern melden", description: "" },
          {
            title: "Zwei-Faktor-Authentifizierung aktivieren",
            description: "",
          },
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
          {
            title: "Geld",
            description:
              "Betrüger wollen schnelle Überweisungen auf ihre Konten, oft im Ausland. Die Beträge sind geschickt gewählt - hoch genug für Profit, niedrig genug um nicht aufzufallen. Einmal überwiesen, ist das Geld meist unwiederbringlich verloren.",
          },
          {
            title: "Vertrauliche Daten",
            description:
              "Informationen über Geschäftspartner, Zahlungsabläufe und interne Prozesse. Diese Daten nutzen Betrüger für gezieltere Angriffe. Auch der Weiterverkauf von Geschäftsgeheimnissen ist lukrativ.",
          },
        ],
        actions: [
          {
            title: "Zahlung per E-Mail-Anweisung freigeben",
            description:
              "Sie kopieren die neue IBAN ohne Nachfrage in Ihr Zahlungssystem. Die Zahlung sieht normal aus - gleicher Betrag, gleicher Empfängername. Erst Wochen später merkt der echte Lieferant, dass kein Geld ankam.",
          },
          {
            title: "Prozesse umgehen (keine Vier Augen)",
            description:
              "Der angebliche Zeitdruck verleitet dazu, Sicherheitsprozesse zu überspringen. «Nur dieses eine Mal» wird zur teuren Ausnahme. Betrüger kennen Ihre Prozesse und fordern gezielt deren Umgehung.",
          },
          {
            title: "Nur per E-Mail kommunizieren",
            description:
              "Sie bleiben in der kompromittierten E-Mail-Kette gefangen. Der Betrüger kontrolliert die gesamte Kommunikation. Ein Anruf hätte den Betrug sofort aufgedeckt.",
          },
        ],
        detection: [
          {
            title: "Druck auf Tempo/Geheimhaltung «vom Chef»",
            description:
              "«Streng vertraulich, sofort erledigen, mit niemandem sprechen» sind Warnsignale. Echte Chefs respektieren Sicherheitsprozesse auch unter Zeitdruck. Die angebliche Geheimhaltung verhindert, dass Sie nachfragen.",
          },
          {
            title: "Absenderadresse minimal abweichend",
            description:
              "max.muster@firrna.ch statt firma.ch - ein Buchstabe Unterschied. Der Anzeigename «Max Muster» stimmt, aber die E-Mail-Adresse nicht. Diese Details übersieht man unter Stress leicht.",
          },
          {
            title: "Nicht zuständig für Zahlungen? Ignorieren oder melden",
            description:
              "Wenn Sie nicht für die Zahlungen verantwortlich sind, sind unerwartete Zahlungsanweisungen verdächtig. Reagieren Sie nicht darauf, sondern melden Sie dies intern.",
          },
        ],
        measures: [
          {
            title:
              "Immer telefonisch verifizieren (eigene Kontaktliste nutzen)",
            description:
              "Rufen Sie über die Ihnen bekannte Nummer zurück, nie über die in der E-Mail angegebene. Fragen Sie konkret nach der angeblichen Anweisung. Selbst wenn es peinlich scheint - besser einmal zu viel nachgefragt.",
          },
          {
            title:
              "Prozesse strikt einhalten: Vier-Augen-Prinzip/Unterschrift zu zweien",
            description:
              "Keine Ausnahmen, auch nicht für den «Chef» oder bei «Dringlichkeit». Diese Prozesse existieren genau für solche Situationen. Wer echten Zeitdruck hat, versteht die Notwendigkeit der Sicherheitsprüfung.",
          },
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
          {
            title: "Geld",
            description:
              "Die neue IBAN führt direkt auf das Konto der Betrüger. Sie geben sich als bestehender Lieferant aus und rechnen mit Ihrer Routine.",
          },
          {
            title: "Vertrauliche Daten",
            description:
              "Details über Zahlungsläufe, Lieferantenbeziehungen und Rechnungsbeträge. Diese Insider-Informationen machen künftige Angriffe glaubwürdiger. Die Betrüger lernen Ihre Abläufe und passen sich an.",
          },
        ],
        actions: [
          {
            title: "Geänderte IBAN in die Zahlung übernehmen",
            description:
              "Sie kopieren die neue IBAN ohne Nachfrage in Ihr Zahlungssystem. Die Zahlung sieht normal aus - gleicher Betrag, gleicher Empfängername. Erst Wochen später merkt der echte Lieferant, dass kein Geld ankam.",
          },
          {
            title: "Zahlung ohne Rückruf freigeben",
            description:
              "Sie verlassen sich auf die E-Mail-Kommunikation als einzige Quelle. Kein Anruf, keine Verifikation über einen zweiten Kanal. Diese Nachlässigkeit kostet Firmen jährlich Millionen.",
          },
          {
            title: "Ungeprüft an die Buchhaltung weiterleiten",
            description:
              "Sie geben die Information ohne Warnung oder Prüfung weiter. Die Buchhaltung vertraut Ihrer Weiterleitung und ändert die Stammdaten. Der Fehler multipliziert sich über alle künftigen Zahlungen.",
          },
        ],
        detection: [
          {
            title: "Rechnung kommt nochmals – mit neuer IBAN",
            description:
              "Dieselbe Rechnung erscheint erneut, nur die Bankdaten sind anders. Seriöse Firmen senden bei IBAN-Änderungen separate Mitteilungen, nicht einfach die alte Rechnung nochmals. Diese Dublette ist ein klares Warnsignal.",
          },
          {
            title: "Absenderadresse oder Signatur wirkt leicht anders",
            description:
              "Die E-Mail-Signatur fehlt oder sieht anders aus als gewohnt. Schriftart, Logos oder Kontaktdetails stimmen nicht. Diese Inkonsistenzen verraten die Fälschung.",
          },
          {
            title: "Ungewöhnliche Zahlungsaufforderung",
            description:
              "Timing, Tonfall oder Inhalt der Anfrage wirken anders als gewohnt. Unübliche Zahlungsziele oder Beträge sollten Sie stutzig machen. Vertrauen Sie Ihrem Bauchgefühl bei Abweichungen vom Normalen.",
          },
        ],
        measures: [
          {
            title: "Rückruf an bekannte Nummer – erst dann zahlen",
            description:
              "Nutzen Sie Ihre Kontaktliste oder alte Rechnungen für die Telefonnummer. Fragen Sie explizit nach der IBAN-Änderung und lassen Sie sich den Grund erklären. Kein Anruf = keine Zahlung, ohne Ausnahme.",
          },
          {
            title: "Vier-Augen-Prinzip / Unterschrift zu zweien einhalten",
            description:
              "IBAN-Änderungen müssen immer von zwei Personen geprüft werden. Beide müssen unabhängig die Änderung verifizieren. Dieser Prozess hat schon unzählige Betrugsfälle verhindert.",
          },
          {
            title: "Schon gezahlt? Handeln Sie sofort!",
            description:
              "Schnelligkeit ist entscheidend - informieren Sie sofort Ihre Bank für einen Rückrufversuch. Melden Sie den Vorfall der Kantonspolizei für die Strafverfolgung.",
          },
        ],
        area_tag: "accounting",
        badges: ["email", "invoice", "payment", "iban"],
        language: "de-CH",
      },
    ],
  },
  {
    id: "security_vulnerabilities",
    name: "Bewusstsein für Sicherheitslücken",
    items: [
      {
        hook: "Updates installiert? Identität geschützt.",
        scenario:
          "Updates bringen nicht nur neue Funktionen, sondern schliessen vor allem gefährliche Sicherheitslücken, die Angreifer ausnutzen können, um an Ihre Daten zu gelangen.",
        demand: [
          {
            title: "Ihre digitale Identität",
            description:
              "Gespeicherte Passwörter, Browser-Logins und Zugangsdaten zu allen Ihren Konten. Einmal im System, kopieren Angreifer alles: Banking, E-Mail, soziale Medien. Ihre komplette Online-Identität wird zur Handelsware.",
          },
          {
            title: "Firmenzugang und Geschäftsgeheimnisse",
            description:
              "VPN-Zugänge, Firmennetzwerk-Credentials und Zugriff auf vertrauliche Dokumente. Angreifer nutzen Ihr Gerät als Einfallstor ins Firmennetzwerk. Der Schaden multipliziert sich über die ganze Organisation.",
          },
        ],
        actions: [
          {
            title: "Update-Fenster wegklicken",
            description:
              "Sie klicken 'Später erinnern' oder schliessen das Update-Fenster. Die Sicherheitslücke bleibt offen, Angreifer nutzen bekannte Schwachstellen aus. Jeder verschobene Update erhöht das Risiko exponentiell.",
          },
          {
            title: "Automatische Updates deaktivieren",
            description:
              "Sie schalten Updates aus, weil sie 'nerven' oder 'zur falschen Zeit kommen'. Ihr System wird zur leichten Beute - Hacker scannen gezielt nach ungepatchten Systemen. Diese Nachlässigkeit ist wie das Haustürschloss zu entfernen.",
          },
          {
            title: "Virenschutz-Warnungen ignorieren",
            description:
              "Sie klicken Sicherheitswarnungen weg ohne zu lesen. Der Virenschutz wird wirkungslos, wenn seine Datenbank veraltet ist. Neue Bedrohungen werden nicht erkannt, alte Schutzmechanismen greifen ins Leere.",
          },
        ],
        detection: [
          {
            title: "Hartnäckige Update-Erinnerungen",
            description:
              "Windows zeigt täglich oder mehrmals täglich Update-Meldungen. Das System markiert Updates als 'kritisch' oder 'wichtig'. Diese Dringlichkeit hat einen Grund - es geht um aktiv ausgenutzte Sicherheitslücken.",
          },
          {
            title: "Computer wird langsamer",
            description:
              "Programme starten träge, der Browser reagiert verzögert, unerklärliche Festplattenaktivität. Diese Symptome deuten auf Malware hin, die Ihre Daten durchsucht und kopiert. Veraltete Systeme sind besonders anfällig.",
          },
          {
            title: "Rote Symbole im System-Tray",
            description:
              "Virenschutz oder Windows-Sicherheit zeigen rote Warnsymbole. Diese visuellen Alarme bedeuten: Ihr Schutz ist kompromittiert. Jede Minute ohne Reaktion erhöht das Risiko eines erfolgreichen Angriffs.",
          },
        ],
        measures: [
          {
            title: "Jetzt automatische Updates aktivieren",
            description:
              "Einstellungen → Update & Sicherheit → Automatische Updates EIN. Einmal aktiviert, läuft alles im Hintergrund. Wählen Sie Neustart-Zeiten ausserhalb der Arbeitszeit - das System arbeitet nachts für Ihre Sicherheit.",
          },
          {
            title: "Update-Meldung = sofort installieren",
            description:
              "Sehen Sie ein Update-Fenster? Klicken Sie 'Jetzt installieren', nicht 'Später'. Planen Sie 10 Minuten ein - diese Investment schützt vor tagelangen Wiederherstellungen nach einem Angriff. Keine Ausnahmen, keine Ausreden.",
          },
          {
            title: "Planen Sie einen monatlichen Komplettscan",
            description:
              "Kalendereintrag: Jeden 1. des Monats vollständige Systemprüfung starten. Lassen Sie den Scan während der Mittagspause laufen. Diese Routine findet Bedrohungen, bevor sie Schaden anrichten können.",
          },
        ],
        area_tag: "everyone",
        badges: ["software", "updates", "identity", "malware"],
        language: "de-CH",
      },
    ],
  },
  {
    id: "personal_id_compromise",
    name: "Kompromittierung persönlicher Identitäten",
    items: [
      {
        hook: "Bildschirm gesperrt? Daten sicher.",
        scenario:
          "Eine Mitarbeiterin geht 'nur kurz' zum Drucker – ein Besucher fotografiert ihre offenen Kundendaten.",
        demand: [
          {
            title: "Offene Sessions und Logins",
            description:
              "Alle Ihre eingeloggten Dienste stehen offen: E-Mail, Banking, Firmensysteme. In 30 Sekunden kann jemand Mails versenden, Überweisungen tätigen oder Daten kopieren. Ihr digitales Ich ist vollständig zugänglich.",
          },
          {
            title: "Visuelle Informationen",
            description:
              "Passwörter bei der Eingabe, vertrauliche Dokumente am Bildschirm, private Nachrichten. Schulterblicke im Büro oder Zug reichen aus. Diese Informationen werden für Social Engineering und gezielte Angriffe genutzt.",
          },
        ],
        actions: [
          {
            title: "Arbeitsplatz ungesperrt verlassen",
            description:
              "'Nur kurz zur Toilette' oder 'gleich zurück' - der Bildschirm bleibt offen. Diese Sekunden reichen für Datendiebstahl, Sabotage oder peinliche Streiche. Die meisten Insider-Angriffe nutzen genau diese Nachlässigkeit.",
          },
          {
            title: "Ohne Sichtschutz in der Öffentlichkeit arbeiten",
            description:
              "Im Zug, Café oder Grossraumbüro ohne Blickschutzfolie arbeiten. Jeder kann mitlesen: Passwörter, Geschäftszahlen, private Mails. Sie werden zum offenen Buch für neugierige oder böswillige Blicke.",
          },
          {
            title: "Webcam-Abdeckung offen lassen",
            description:
              "Nach dem Meeting bleibt die Kamera-Abdeckung offen. Malware kann unbemerkt aufzeichnen - private Momente, vertrauliche Gespräche, kompromittierende Situationen. Erpressungsmaterial entsteht ohne Ihr Wissen.",
          },
        ],
        detection: [
          {
            title: "Fremde Personen nähern sich Ihrem Arbeitsplatz",
            description:
              "Besucher, Reinigungspersonal oder unbekannte 'Kollegen' in Ihrer Nähe. Nicht jeder hat gute Absichten - opportunistische Angreifer nutzen jede Gelegenheit. Ihr offener Bildschirm ist eine Einladung.",
          },
          {
            title: "Ungewöhnliche Blicke auf Ihren Bildschirm",
            description:
              "Jemand schaut auffällig oft oder lange auf Ihren Monitor. Diese Person merkt sich möglicherweise Ihre Eingaben oder fotografiert heimlich. Vertrauen Sie Ihrem Unbehagen - es hat meist einen Grund.",
          },
          {
            title: "Webcam-LED leuchtet unerwartet",
            description:
              "Die Kamera-LED geht an, obwohl kein Meeting läuft. Dies könnte ein Zeichen für Malware sein, die Sie ausspioniert. Ohne Abdeckung sind Sie dieser Überwachung schutzlos ausgeliefert.",
          },
        ],
        measures: [
          {
            title: "Bildschirmsperre als neue Gewohnheit etablieren",
            description:
              "Beim Verlassen des Arbeitsplatzes empfiehlt es sich, den Bildschirm zu sperren - Windows+L oder Mac: Ctrl+Cmd+Q. Auch kurze Abwesenheiten können ein Risiko darstellen. Mit etwas Übung wird diese kleine Geste zur hilfreichen Routine, die Sie vor grösseren Unannehmlichkeiten bewahrt.",
          },
          {
            title: "Sichtschutz bei der Arbeit aktivieren",
            description:
              "Bei der Arbeit in öffentlichen Räumen oder im Büro empfiehlt sich ein Blickschutz. Manche Laptops haben bereits eine eingebaute Sichtschutz-Funktion – prüfen Sie Ihre Einstellungen. Falls nicht vorhanden, können Sie eine Schutzfolie selbst besorgen oder über Ihre IT-Abteilung anfordern.",
          },
          {
            title: "Melden Sie sich immer von sensiblen Konten ab",
            description:
              "Nach Online-Banking oder wichtigen Konten: immer explizit ausloggen, nicht nur Tab schliessen. Browser merken sich Ihre Sessions oft länger als Sie denken. Besonders wichtig bei gemeinsam genutzten Computern.",
          },
        ],
        area_tag: "everyone",
        badges: ["physical", "privacy", "webcam", "screen"],
        language: "de-CH",
      },
    ],
  },
];
