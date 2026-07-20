import {
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
} from '@angular/core';

import { ProjectCard } from '../../components/project-card/project-card';
import { PROJECTS } from '../../data/projects';

interface Skill {
  name: string;
  description: string[];
  projectTechnologies: string[];
}

interface TimelineEntry {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ProjectCard],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  protected readonly projects = PROJECTS;

  protected readonly workExperience: TimelineEntry[] = [
    {
      id: 'waiter',
      title: 'Kellner',
      organization: 'ProStaff',
      location: 'Wien',
      period: '04/2022 – 10/2022',
      description: [
        'Bestellungen aufnehmen und Speisen sowie Getränke servieren.',
        'Freundlicher und professioneller Umgang mit Gästen.',
        'Zuverlässiges Arbeiten auch in einem dynamischen Arbeitsumfeld.',
      ],
    },
    {
      id: 'internship',
      title: 'Ferialpraktikant',
      organization: 'MA 31',
      location: 'Wien',
      period: '07/2022 – 08/2022',
      description: [
        'Schnelles und genaues Erledigen der übertragenen Aufgaben.',
        'Vorausschauendes und präzises Planen für kommende Tage und Wochen.',
        'Sorgfältiges Ausfüllen der vorgegebenen Dokumente.',
      ],
    },
    {
      id: 'sales-advisor',
      title: 'Verkaufsberater',
      organization: 'MediaMarkt',
      location: 'Wien Stadlau',
      period: '10/2022 – 07/2024',
      description: [
        'Erstellen von Rechnungen sowie Bearbeiten von Rückgaben und Umtausch.',
        'Beratung und Empfehlung passender Produkte anhand der Kundenbedürfnisse und -wünsche.',
        'Unterstützung bei Fragen zu Produkten, Zubehör und Kaufabwicklung.',
      ],
    },
    {
      id: 'civil-service',
      title: 'Zivildienst',
      organization: 'Lebenshilfe',
      location: 'Niederösterreich',
      period: '01/2024 – 09/2024',
      description: [
        'Betreuung und Unterstützung von Menschen mit Behinderung.',
        'Begleitung im Alltag sowie bei Ausflügen und gemeinsamen Aktivitäten.',
        'Verantwortungsbewusster und respektvoller Umgang mit betreuten Personen.',
      ],
    },
    {
      id: 'sales-employee',
      title: 'Verkaufsmitarbeiter',
      organization: 'Hofer KG',
      location: 'Gänserndorf',
      period: '05/2025 – 04/2026',
      description: [
        'Einsatz an der Kassa sowie Mitarbeit im Warenmanagement.',
        'Verantwortung für Einsortierung und ansprechende Präsentation der Ware.',
        'Unterstützung bei der Warenkontrolle und bei täglichen Abläufen in der Filiale.',
      ],
    },
  ];

  protected readonly education: TimelineEntry[] = [
    {
      id: 'secondary-school',
      title: 'BRG – Erich Fried Realgymnasium',
      organization: 'Allgemeinbildende höhere Schule',
      location: 'Wien',
      period: '2014 – 2018',
      description: [
        'Besuch des Realgymnasiums mit allgemeinbildendem Schwerpunkt.',
        'Grundlegende schulische Ausbildung vor dem Wechsel an eine technische Schule.',
      ],
    },
    {
      id: 'technical-school',
      title: 'HTL – TGM Technisches Gewerbemuseum',
      organization: 'Technische Ausbildung',
      location: 'Wien',
      period: '2018 – 2023',
      description: [
        'Technische und praxisorientierte Ausbildung mit Schwerpunkt auf Informatik und Softwareentwicklung.',
        'Erste umfangreiche Erfahrungen mit Programmierung, Projektarbeit und technischen Grundlagen.',
      ],
    },
    {
      id: 'university',
      title: 'FH Technikum Wien',
      organization: 'Bachelorstudium Informatik',
      location: 'Wien',
      period: '2024 – laufend',
      description: [
        'Bachelorstudium Informatik mit Fokus auf Softwareentwicklung und moderne Webtechnologien.',
        'Arbeit mit Angular, Java, Spring Boot, Python, PostgreSQL und weiteren Technologien.',
        'Umsetzung von Teamprojekten von der Planung bis zur Präsentation.',
      ],
    },
  ];

  protected readonly skills: Skill[] = [
    {
      name: 'Angular',
      description: [
        'Entwicklung komponentenbasierter Single-Page Applications.',
        'Verwendung von Standalone Components und Angular Routing.',
        'Datenaustausch zwischen Komponenten mit Inputs und Services.',
        'Anbindung von REST-APIs über den Angular HttpClient.',
        'Umsetzung von Formularen, Filtern und dynamischen Benutzeroberflächen.',
      ],
      projectTechnologies: ['Angular'],
    },
    {
      name: 'TypeScript',
      description: [
        'Typisierte Entwicklung von Angular-Anwendungen.',
        'Erstellung eigener Interfaces und Datenmodelle.',
        'Verwendung von Klassen, Funktionen und modernen Sprachfunktionen.',
        'Asynchrone Verarbeitung von API-Anfragen.',
        'Strukturierung größerer Frontend-Projekte.',
      ],
      projectTechnologies: ['TypeScript'],
    },
    {
      name: 'JavaScript',
      description: [
        'Arbeit mit Funktionen, Arrays, Objekten und Events.',
        'Dynamische Verarbeitung und Darstellung von Daten.',
        'Verwendung moderner JavaScript-Syntax.',
        'Grundlegender Umgang mit asynchronen Abläufen.',
      ],
      projectTechnologies: ['JavaScript'],
    },
    {
      name: 'Java',
      description: [
        'Objektorientierte Entwicklung mit Klassen und Interfaces.',
        'Entwicklung von Backend-Anwendungen mit Spring Boot.',
        'Aufbau von Controller-, Service- und Repository-Schichten.',
        'Verarbeitung von DTOs und Datenbankentitäten.',
        'Erstellung und Ausführung von Unit-Tests.',
      ],
      projectTechnologies: ['Java'],
    },
    {
      name: 'Spring Boot',
      description: [
        'Entwicklung von REST-Schnittstellen.',
        'Umsetzung einer mehrschichtigen Backend-Architektur.',
        'Absicherung von Endpunkten mit JWT und Spring Security.',
        'Datenbankzugriff mit Spring Data JPA.',
        'Validierung und Fehlerbehandlung im Backend.',
      ],
      projectTechnologies: ['Spring Boot'],
    },
    {
      name: 'Python',
      description: [
        'Entwicklung von Anwendungen mit Python und Flet.',
        'Verarbeitung und Speicherung von Anwendungsdaten.',
        'Erzeugung und Verwaltung von QR-Codes.',
        'Arbeit mit Funktionen, Klassen und Modulen.',
        'Anbindung externer KI-Schnittstellen.',
      ],
      projectTechnologies: ['Python'],
    },
    {
      name: 'PostgreSQL',
      description: [
        'Entwurf relationaler Datenbankstrukturen.',
        'Speicherung von Benutzern, Projekten, Touren und Logs.',
        'Verknüpfung von Tabellen durch Primär- und Fremdschlüssel.',
        'Datenbankzugriff über Spring Data JPA und Hibernate.',
        'Verwendung von Flyway für Datenbankmigrationen.',
      ],
      projectTechnologies: ['PostgreSQL'],
    },
    {
      name: 'Git',
      description: [
        'Versionsverwaltung von Einzel- und Gruppenprojekten.',
        'Arbeit mit Branches, Commits und Merge-Vorgängen.',
        'Veröffentlichung von Projekten auf GitHub.',
        'Zusammenarbeit in Softwareprojekten.',
        'Nachvollziehbare Dokumentation von Änderungen.',
      ],
      projectTechnologies: ['Git', 'GitHub'],
    },
    {
      name: 'HTML',
      description: [
        'Erstellung semantisch strukturierter Webseiten.',
        'Aufbau responsiver Seiten und Komponenten.',
        'Verwendung barrierearmer HTML-Elemente.',
        'Erstellung von Formularen und interaktiven Bereichen.',
        'Verwendung moderner Angular-Templates.',
      ],
      projectTechnologies: ['HTML'],
    },
    {
      name: 'CSS',
      description: [
        'Umsetzung responsiver Layouts mit Grid und Flexbox.',
        'Erstellung von Animationen und Übergängen.',
        'Verwendung von CSS-Variablen und Farbkonzepten.',
        'Gestaltung von Karten, Modals und Skill-Anzeigen.',
        'Anpassung der Benutzeroberfläche für mobile Geräte.',
      ],
      projectTechnologies: ['CSS'],
    },
  ];

  protected openEntryId: string | null = null;
  protected selectedSkill: Skill | null = null;
  protected rotatingSkillName: string | null = null;

  protected get filteredSkillProjects() {
    if (!this.selectedSkill) {
      return [];
    }

    const selectedTechnologies =
      this.selectedSkill.projectTechnologies.map((technology) =>
        technology.trim().toLowerCase(),
      );

    return this.projects.filter((project) =>
      project.technologies.some((technology) =>
        selectedTechnologies.includes(
          technology.trim().toLowerCase(),
        ),
      ),
    );
  }

  protected toggleEntry(entryId: string): void {
    this.openEntryId =
      this.openEntryId === entryId ? null : entryId;
  }

  protected isEntryOpen(entryId: string): boolean {
    return this.openEntryId === entryId;
  }

  protected async openSkillDetails(
    skill: Skill,
    skillCircle: HTMLElement,
  ): Promise<void> {
    if (this.rotatingSkillName !== null) {
      return;
    }

    this.rotatingSkillName = skill.name;
    this.changeDetectorRef.detectChanges();

    try {
      const animation = skillCircle.animate(
        [
          {
            transform:
              'translateY(0) rotateY(0deg) scale(1)',
          },
          {
            transform:
              'translateY(-10px) rotateY(180deg) scale(1.06)',
            offset: 0.5,
          },
          {
            transform:
              'translateY(0) rotateY(360deg) scale(1)',
          },
        ],
        {
          duration: 650,
          easing: 'cubic-bezier(0.55, 0.08, 0.25, 1)',
        },
      );

      await animation.finished;
    } catch {
      /*
       * Falls die Animation vom Browser abgebrochen wird,
       * soll das Popup trotzdem geöffnet werden.
       */
    }

    this.selectedSkill = skill;
    this.rotatingSkillName = null;
    document.body.style.overflow = 'hidden';

    this.changeDetectorRef.detectChanges();
  }

  protected closeSkillDetails(): void {
    this.selectedSkill = null;
    this.rotatingSkillName = null;
    document.body.style.overflow = '';

    this.changeDetectorRef.detectChanges();
  }

  protected stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  @HostListener('document:keydown.escape')
  protected closePopupWithEscape(): void {
    if (this.selectedSkill) {
      this.closeSkillDetails();
    }
  }
}
