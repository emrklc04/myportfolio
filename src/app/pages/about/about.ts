import { Component } from '@angular/core';

interface Skill {
  name: string;
  level: number;
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
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
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
      level: 80,
    },
    {
      name: 'TypeScript',
      level: 75,
    },
    {
      name: 'JavaScript',
      level: 70,
    },
    {
      name: 'Java',
      level: 82,
    },
    {
      name: 'Spring Boot',
      level: 75,
    },
    {
      name: 'Python',
      level: 65,
    },
    {
      name: 'PostgreSQL',
      level: 70,
    },
    {
      name: 'Git',
      level: 72,
    },
    {
      name: 'HTML',
      level: 88,
    },
    {
      name: 'CSS',
      level: 80,
    },
  ];

  protected openEntryId: string | null = null;

  protected toggleEntry(entryId: string): void {
    this.openEntryId = this.openEntryId === entryId ? null : entryId;
  }

  protected isEntryOpen(entryId: string): boolean {
    return this.openEntryId === entryId;
  }
}
