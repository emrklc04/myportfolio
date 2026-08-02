import {
  ChangeDetectorRef,
  Component,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';

import { ProjectCard } from '../../components/project-card/project-card';
import { Project } from '../../models/project.model';
import { Skill } from '../../models/skill.model';
import { ProjectService } from '../../services/project.service';
import { SkillService } from '../../services/skill.service';

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
export class About implements OnInit {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly projectService = inject(ProjectService);
  private readonly skillService = inject(SkillService);

  protected projects: Project[] = [];
  protected skills: Skill[] = [];
  protected loadingSkills = true;

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

  protected openEntryId: string | null = null;
  protected selectedSkill: Skill | null = null;
  protected rotatingSkillName: string | null = null;

  ngOnInit(): void {
    this.loadSkills();
    this.loadProjects();
  }

  private loadSkills(): void {
    this.loadingSkills = true;
    this.skillService.getAllSkills().subscribe({
      next: (skills) => {
        this.skills = skills;
        this.loadingSkills = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        console.error('Fehler beim Laden der Skills:', err);
        this.loadingSkills = false;
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  private loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        console.error('Fehler beim Laden der Projekte:', err);
      },
    });
  }

  protected get filteredSkillProjects(): Project[] {
    if (!this.selectedSkill || !this.selectedSkill.projectTechnologies) {
      return [];
    }

    const selectedTechnologies = this.selectedSkill.projectTechnologies.map(
      (tech) => tech.trim().toLowerCase(),
    );

    return this.projects.filter(
      (project) =>
        project.technologies &&
        project.technologies.some((tech) =>
          selectedTechnologies.includes(tech.trim().toLowerCase()),
        ),
    );
  }

  protected toggleEntry(entryId: string): void {
    this.openEntryId = this.openEntryId === entryId ? null : entryId;
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
            transform: 'translateY(0) rotateY(0deg) scale(1)',
          },
          {
            transform: 'translateY(-10px) rotateY(180deg) scale(1.06)',
            offset: 0.5,
          },
          {
            transform: 'translateY(0) rotateY(360deg) scale(1)',
          },
        ],
        {
          duration: 650,
          easing: 'cubic-bezier(0.55, 0.08, 0.25, 1)',
        },
      );

      await animation.finished;
    } catch {
      /* Animation Fallback */
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
