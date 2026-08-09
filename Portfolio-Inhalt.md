---
title: Portfolio Emre Kilic – Gesamtinhalt
type: website-content-export
source: myportfolio (Angular Frontend + Spring Boot Backend)
exported: 2026-08-09
tags: [portfolio, website, emre-kilic]
---

# Portfolio Emre Kilic — Website-Inhalt

> Vollständige inhaltliche Erfassung der Website `myportfolio` (Angular-Frontend, Spring-Boot-Backend, PostgreSQL). Diese Notiz bildet **alle Texte, die auf der Seite angezeigt werden**, strukturiert ab — nicht den Quellcode selbst. Technische Hinweise stehen in Kommentar-Callouts.

## Inhaltsverzeichnis

- [[#Navigation (Header)]]
- [[#Hero-Bereich (Startseite)]]
- [[#Projekte]]
- [[#Über mich (About)]]
- [[#Werdegang (Berufserfahrung & Bildungsweg)]]
- [[#Kenntnisse (Skills)]]
- [[#Kontakt]]
- [[#Footer]]
- [[#Adminbereich]]
- [[#Technischer Kontext]]

---

## Navigation (Header)

Logo: **Emre Kilic**

Menüpunkte:
- `My Projects` → verlinkt zur Projekte-Sektion auf der Startseite
- `Über mich` → verlinkt zur About-Sektion (`#about`)
- `⚙ Adminbereich` → Link zu `/admin` (Login)

---

## Hero-Bereich (Startseite)

**Eyebrow:** Informatikstudent & Softwareentwickler

**Headline:**
> Hallo, ich bin **Emre Kilic.**

**Beschreibungstext:**
> Ich entwickle moderne Webanwendungen und Softwareprojekte mit Angular, TypeScript, Java, Spring Boot und Python.

**Buttons:**
- Primär: „Projekte ansehen" → scrollt zu `#projects`
- Sekundär: „Mehr über mich" → scrollt zu `#about`

---

## Projekte

**Sektions-Eyebrow:** Portfolio
**Überschrift:** My Projects

**Intro-Text:**
> Eine Auswahl meiner bisherigen IT-Projekte aus meinem Studium und meiner persönlichen Entwicklung.

**Bedienelemente:**
- Suchfeld: „Projekt nach Namen suchen ..."
- Technologie-Filter (dynamisch aus vorhandenen Projekten generiert, Button „All" + je Technologie ein Button)
- Ergebniszähler: „{n} Projekt(e) gefunden" mit Button „Filter zurücksetzen"

> [!info] Technischer Hinweis
> Die tatsächlich angezeigten Projekte werden **live vom Spring-Boot-Backend geladen** (`GET /api/projects`) und können über den Adminbereich verwaltet werden. Es existiert keine feste Seed-Daten-Tabelle in der Datenbank-Migration — die unten aufgeführten drei Projekte sind die im Frontend-Code hinterlegten Referenz-/Fallback-Inhalte (`data/projects.ts`). Der tatsächliche Live-Stand kann davon abweichen.

### Projekt 1 — Tour Planner
- **Kurzbeschreibung:** Eine Webanwendung zum Erstellen und Verwalten von Touren.
- **Beschreibung:** Der Tour Planner ermöglicht registrierten Benutzern, Touren und Tour Logs zu erstellen, zu bearbeiten und zu löschen. Die Anwendung besteht aus einem Angular-Frontend und einem Spring-Boot-Backend.
- **Technologien:** Angular, TypeScript, Java, Spring Boot, PostgreSQL
- **Featured:** Ja
- Screenshots: 3 Stück hinterlegt
- GitHub: `github.com/DEIN-BENUTZERNAME/tour-planner` *(Platzhalter, noch nicht final gesetzt)*
- Download: `downloads/tour-planner.zip`

### Projekt 2 — QR Code Generator
- **Kurzbeschreibung:** Eine Anwendung zum Erstellen und Verwalten eigener QR-Codes.
- **Beschreibung:** Benutzer können Inhalte in QR-Codes umwandeln, Kategorien auswählen, Codes als Favoriten speichern und gespeicherte QR-Codes filtern, sortieren oder löschen.
- **Technologien:** Python, Flet, SQLite, QR Code
- **Featured:** Ja
- Screenshots: 3 Stück hinterlegt
- GitHub: `github.com/DEIN-BENUTZERNAME/qr-code-generator` *(Platzhalter)*
- Download: `downloads/qr-code-generator.zip`

### Projekt 3 — pAIpline Generator
- **Kurzbeschreibung:** Ein KI-gestütztes Werkzeug zur Erstellung von Moodle-Kursen.
- **Beschreibung:** Das Projekt unterstützt Lehrende bei der automatischen Erstellung von Kursplänen und Unterrichtseinheiten. Die Inhalte können bearbeitet und anschließend exportiert werden.
- **Technologien:** Python, Artificial Intelligence, Moodle, JSON
- **Featured:** Nein
- Screenshots: 3 Stück hinterlegt
- GitHub: `github.com/DEIN-BENUTZERNAME/paipline-generator` *(Platzhalter)*
- Download: `downloads/paipline-generator.zip`

**Leerzustand-Texte** (wenn keine Projekte gefunden/geladen):
- Laden: „Projekte werden geladen ..."
- Fehler: „Verbindung zum Backend fehlgeschlagen" / „Die Projekte konnten nicht vom Backend geladen werden." + Button „Erneut versuchen"
- Keine Treffer: „Keine Projekte gefunden" / „Ändere den Suchbegriff oder wähle eine andere Technologie aus." + Button „Alle Projekte anzeigen"

**Projekt-Detailansicht (Modal)** zeigt zusätzlich: Titel, vollständige Beschreibung, Technologie-Tags, Screenshot-Galerie, sowie Buttons „ZIP herunterladen", „Live ansehen", „GitHub" (je nach Verfügbarkeit).

---

## Über mich (About)

**Eyebrow:** Über mich

**Headline:**
> Informatikstudent mit Interesse an moderner Softwareentwicklung.

**Textabsatz 1:**
> Mein Name ist Emre Kilic und ich studiere Informatik an der FH Technikum Wien. Besonders interessiere ich mich für moderne Webanwendungen sowie für die Verbindung zwischen Frontend, Backend und Datenbanken.

**Textabsatz 2:**
> Während meines Studiums habe ich Projekte mit Angular, Java, Spring Boot, Python und PostgreSQL umgesetzt. Dabei konnte ich Erfahrungen in der Planung, Implementierung und Präsentation von Softwareprojekten sammeln.

**Info-Grid:**

| Feld | Wert |
|---|---|
| Standort | Wien, Österreich |
| Studium | Bachelor Informatik |
| Sprachen | Deutsch, Türkisch, Englisch |
| Schwerpunkt | Full-Stack Development |

Profilbild: `images/profile.jpg`

---

## Werdegang (Berufserfahrung & Bildungsweg)

**Eyebrow:** Mein Werdegang
**Überschrift:** Berufserfahrung und Bildungsweg

**Intro-Text:**
> Eine Übersicht meiner bisherigen beruflichen Stationen und meiner Ausbildung. Durch Anklicken einer Station werden weitere Details eingeblendet.

### 01 — Berufserfahrung

#### Kellner — ProStaff (Wien)
*04/2022 – 10/2022*
- Bestellungen aufnehmen und Speisen sowie Getränke servieren.
- Freundlicher und professioneller Umgang mit Gästen.
- Zuverlässiges Arbeiten auch in einem dynamischen Arbeitsumfeld.

#### Ferialpraktikant — MA 31 (Wien)
*07/2022 – 08/2022*
- Schnelles und genaues Erledigen der übertragenen Aufgaben.
- Vorausschauendes und präzises Planen für kommende Tage und Wochen.
- Sorgfältiges Ausfüllen der vorgegebenen Dokumente.

#### Verkaufsberater — MediaMarkt (Wien Stadlau)
*10/2022 – 07/2024*
- Erstellen von Rechnungen sowie Bearbeiten von Rückgaben und Umtausch.
- Beratung und Empfehlung passender Produkte anhand der Kundenbedürfnisse und -wünsche.
- Unterstützung bei Fragen zu Produkten, Zubehör und Kaufabwicklung.

#### Zivildienst — Lebenshilfe (Niederösterreich)
*01/2024 – 09/2024*
- Betreuung und Unterstützung von Menschen mit Behinderung.
- Begleitung im Alltag sowie bei Ausflügen und gemeinsamen Aktivitäten.
- Verantwortungsbewusster und respektvoller Umgang mit betreuten Personen.

#### Verkaufsmitarbeiter — Hofer KG (Gänserndorf)
*05/2025 – 04/2026*
- Einsatz an der Kassa sowie Mitarbeit im Warenmanagement.
- Verantwortung für Einsortierung und ansprechende Präsentation der Ware.
- Unterstützung bei der Warenkontrolle und bei täglichen Abläufen in der Filiale.

### 02 — Bildungsweg

#### BRG – Erich Fried Realgymnasium (Wien)
*2014 – 2018* — Allgemeinbildende höhere Schule
- Besuch des Realgymnasiums mit allgemeinbildendem Schwerpunkt.
- Grundlegende schulische Ausbildung vor dem Wechsel an eine technische Schule.

#### HTL – TGM Technisches Gewerbemuseum (Wien)
*2018 – 2023* — Technische Ausbildung
- Technische und praxisorientierte Ausbildung mit Schwerpunkt auf Informatik und Softwareentwicklung.
- Erste umfangreiche Erfahrungen mit Programmierung, Projektarbeit und technischen Grundlagen.

#### FH Technikum Wien
*2024 – laufend* — Bachelorstudium Informatik
- Bachelorstudium Informatik mit Fokus auf Softwareentwicklung und moderne Webtechnologien.
- Arbeit mit Angular, Java, Spring Boot, Python, PostgreSQL und weiteren Technologien.
- Umsetzung von Teamprojekten von der Planung bis zur Präsentation.

---

## Kenntnisse (Skills)

**Eyebrow:** Kenntnisse
**Überschrift:** Technologien und Fähigkeiten

**Intro-Text:**
> Klicke auf eine Technologie, um meine bisherigen Erfahrungen und passende Projekte zu sehen.

Jede Skill-Kachel zeigt einen Kreis mit Logo/Icon + Namen; Klick öffnet ein Detail-Modal mit:
- Abschnitt „Was ich damit gemacht habe" (Liste von Erfahrungspunkten)
- Abschnitt „Projekte mit {Skill}" (automatisch verknüpfte Projekte anhand gemeinsamer Technologien)

> [!warning] Technischer Hinweis
> Skills werden **vollständig dynamisch aus der Datenbank** geladen (`GET /api/skills`) und über den Adminbereich gepflegt (Name, Icon-URL, Beschreibungspunkte, zugehörige Projekttechnologien). In der Datenbank-Migration existieren keine festen Seed-Werte — der Inhalt dieser Sektion war zum Zeitpunkt der Code-Analyse **nicht im Repository ersichtlich** und muss aus der laufenden Datenbank/dem Admin-Panel entnommen werden, falls der aktuelle Stand benötigt wird.

Standard-Icons (automatisch zugeordnet, falls im Admin kein eigenes Icon gesetzt wird), Quelle: devicon-CDN:
Java, JavaScript, TypeScript, Angular, React, Spring / Spring Boot, Node.js, Python, HTML5, CSS3, Git, Docker, PostgreSQL, MySQL, MongoDB, Kubernetes, C, C++, C#

Leerzustände: „Skills werden geladen..." / „Keine Skills vorhanden."

---

## Kontakt

**Eyebrow:** Kontakt
**Überschrift:** Lust auf eine Zusammenarbeit?

**Text:**
> Setzen wir uns in Kontakt – ich freue mich über deine Nachricht.

**Button:** „E-Mail schreiben" → `mailto:kilicemre004@gmail.com`

---

## Footer

> © {aktuelles Jahr} Emre Kilic

Links:
- GitHub → `github.com/DEIN-BENUTZERNAME` *(Platzhalter, noch nicht auf echtes Profil gesetzt)*
- E-Mail → `mailto:DEINE-EMAIL@BEISPIEL.COM` *(Platzhalter, noch nicht auf echte Adresse gesetzt — inkonsistent zur Kontakt-Sektion, die bereits `kilicemre004@gmail.com` verwendet)*

---

## Adminbereich

### Login-Seite (`/admin`)

**Eyebrow:** Adminbereich
**Headline:** Portfolio verwalten

**Beschreibung:**
> Melde dich im Adminbereich an, um später neue Projekte, Technologien und Skill-Circles zu verwalten.

**Feature-Liste:**
- ◉ Skills verwalten — Neue Technologien und Erfahrungswerte hinzufügen.
- ◫ Projekte verwalten — Projektdaten, Bilder und Technologien eintragen.
- ⚡ Backend vorbereitet — Die Oberfläche kann später mit Spring Boot verbunden werden.

**Login-Formular:** Benutzername, Passwort (mit Anzeigen/Verbergen-Toggle), Button „Zum Admin-Dashboard"

> [!note] Hinweis im UI (evtl. veraltet)
> Der Hinweistext „Dieses Login ist aktuell nur eine Frontend-Darstellung. Die echte Authentifizierung wird später über das Backend umgesetzt." steht noch im Code, obwohl laut Backend (`AuthController`, `AdminInitializer`, Spring Security) bereits eine echte Authentifizierung existiert. Eventuell nicht mehr aktuell.

### Dashboard (`/admin/dashboard`, geschützt via Guard)

Navigation: Übersicht · Skills · Projekte

**Übersicht:** zwei Karten „Skill-Circle eintragen und bearbeiten" und „Projekt eintragen und bearbeiten".

**Skills-Verwaltung:** Liste vorhandener Skills (bearbeiten/löschen) + Formular mit Feldern:
- Skill-Name
- Logo (Bild-URL oder Pfad, sonst automatisches Standard-Logo)
- Beschreibungspunkte (kommagetrennt)
- Passende Projekttechnologien (kommagetrennt)
- Live-Vorschau des Skill-Circles

**Projekte-Verwaltung:** Liste vorhandener Projekte (bearbeiten/löschen) + Formular mit Feldern:
- Projekttitel, Hauptbild, Kurzbeschreibung, Ausführliche Beschreibung
- Technologien (kommagetrennt), Screenshot-Pfade (kommagetrennt)
- GitHub-Link, Live-Link, Download-Link
- Checkbox „Featured"
- Live-Vorschau der Projektkarte

---

## Technischer Kontext

> [!info] Nur zur Einordnung — kein sichtbarer Website-Inhalt
> - **Frontend:** Angular (standalone Components), TypeScript, Routing (`/`, `/admin`, `/admin/dashboard`)
> - **Backend:** Spring Boot (Java), REST-Controller für Projects, Skills, Auth (Admin-Login), Spring Security
> - **Datenbank:** PostgreSQL, Schema-Migrationen via Flyway (`V1`–`V5`): Tabellen `admins`, `projects`, `project_technologies`, `project_files`, `project_screenshots`, `skills`, `skill_descriptions`, `skill_technologies`
> - **Datenhaltung:** Projekte und Skills werden zur Laufzeit in der DB gepflegt (kein Seed-SQL vorhanden) — Inhalte können sich seit dieser Erfassung geändert haben.
> - Mehrere Platzhalter-Links (`DEIN-BENUTZERNAME`, `DEINE-EMAIL@BEISPIEL.COM`) im Footer/Projekte sind noch nicht durch echte Werte ersetzt.

---

*Erfasst am 2026-08-09 durch vollständige Durchsicht des Repository-Codes (Frontend-Templates, Komponenten, statische Daten, Datenbank-Migrationen).*
