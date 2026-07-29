import {
  Component,
  inject,
  OnInit,
} from '@angular/core';

import {
  FormsModule,
} from '@angular/forms';

import {
  RouterLink,
} from '@angular/router';

import {
  finalize,
} from 'rxjs';

import {
  Project,
  ProjectRequest,
} from '../../models/project.model';

import {
  AuthService,
} from '../../services/auth.service';

import {
  ProjectService,
} from '../../services/project.service';

interface SkillForm {
  name: string;
  level: number;
  description: string;
  technologies: string;
}

interface ProjectForm {
  title: string;

  /*
   * Diese Felder werden vom vorhandenen HTML verwendet.
   */
  imageUrl: string;
  description: string;
  screenshots: string;
  downloadUrl: string;

  /*
   * Diese Felder werden für das Backend benötigt.
   */
  shortDescription: string;
  fullDescription: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

type AdminSection =
  | 'overview'
  | 'skill'
  | 'project';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  private readonly authService =
    inject(AuthService);

  private readonly projectService =
    inject(ProjectService);

  protected activeSection:
    AdminSection = 'overview';

  protected projects: Project[] = [];

  protected skillForm:
    SkillForm =
    this.createEmptySkillForm();

  protected projectForm:
    ProjectForm =
    this.createEmptyProjectForm();

  protected loadingProjects = true;
  protected saving = false;

  protected message = '';
  protected errorMessage = '';

  protected readonly username =
    this.authService.getUsername();

  ngOnInit(): void {
    this.loadProjects();
  }

  protected showSection(
    section: AdminSection,
  ): void {
    this.activeSection = section;
    this.message = '';
    this.errorMessage = '';
  }

  /**
   * Wird vom bestehenden Skill-Formular im HTML aufgerufen.
   *
   * Die Skill-Verwaltung ist derzeit noch nicht mit einem
   * Backend-Endpunkt verbunden. Diese Methode validiert daher
   * zunächst nur das Formular.
   */
  protected prepareSkill(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.skillForm.name.trim()) {
      this.errorMessage =
        'Bitte gib einen Namen für den Skill ein.';

      return;
    }

    if (
      this.skillForm.level < 0 ||
      this.skillForm.level > 100
    ) {
      this.errorMessage =
        'Der Skill-Level muss zwischen 0 und 100 liegen.';

      return;
    }

    this.message =
      `Der Skill „${this.skillForm.name.trim()}“ wurde vorbereitet. ` +
      'Für das Speichern wird noch ein Skill-Endpunkt im Backend benötigt.';
  }

  protected resetSkillForm(): void {
    this.skillForm =
      this.createEmptySkillForm();

    this.message = '';
    this.errorMessage = '';
  }

  /**
   * Diese Methode wird von deinem vorhandenen HTML aufgerufen.
   * Sie leitet das Formular an createProject() weiter.
   */
  protected prepareProject(): void {
    this.createProject();
  }

  protected createProject(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.projectForm.title.trim()) {
      this.errorMessage =
        'Bitte gib einen Projekttitel ein.';

      return;
    }

    this.saving = true;

    this.projectService
      .createProject(
        this.toRequest(),
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        }),
      )
      .subscribe({
        next: (project) => {
          this.projects = [
            ...this.projects,
            project,
          ];

          this.projectForm =
            this.createEmptyProjectForm();

          this.message =
            'Das Projekt wurde erfolgreich gespeichert.';
        },
        error: (error: unknown) => {
          console.error(
            'Fehler beim Speichern des Projekts:',
            error,
          );

          this.errorMessage =
            'Das Projekt konnte nicht gespeichert werden.';
        },
      });
  }

  protected deleteProject(
    project: Project,
  ): void {
    const confirmed =
      window.confirm(
        `Soll „${project.title}“ wirklich gelöscht werden?`,
      );

    if (!confirmed) {
      return;
    }

    this.message = '';
    this.errorMessage = '';

    this.projectService
      .deleteProject(project.id)
      .subscribe({
        next: () => {
          this.projects =
            this.projects.filter(
              (entry) =>
                entry.id !== project.id,
            );

          this.message =
            'Das Projekt wurde gelöscht.';
        },
        error: (error: unknown) => {
          console.error(
            'Fehler beim Löschen des Projekts:',
            error,
          );

          this.errorMessage =
            'Das Projekt konnte nicht gelöscht werden.';
        },
      });
  }

  protected resetProjectForm(): void {
    this.projectForm =
      this.createEmptyProjectForm();

    this.message = '';
    this.errorMessage = '';
  }

  protected logout(): void {
    this.authService.logout();
  }

  private loadProjects(): void {
    this.loadingProjects = true;
    this.errorMessage = '';

    this.projectService
      .getAllProjects()
      .pipe(
        finalize(() => {
          this.loadingProjects = false;
        }),
      )
      .subscribe({
        next: (projects) => {
          this.projects = projects;
        },
        error: (error: unknown) => {
          console.error(
            'Fehler beim Laden der Projekte:',
            error,
          );

          this.errorMessage =
            'Die Projekte konnten nicht geladen werden.';
        },
      });
  }

  private toRequest(): ProjectRequest {
    return {
      title:
        this.projectForm.title.trim(),

      shortDescription:
        this.getShortDescription(),

      fullDescription:
        this.getFullDescription(),

      imageUrl:
        this.projectForm
          .imageUrl
          .trim() || null,

      screenshots:
        this.splitValues(
          this.projectForm.screenshots,
        ),

      githubUrl:
        this.projectForm
          .githubUrl
          .trim() || null,

      liveUrl:
        this.projectForm
          .liveUrl
          .trim() || null,

      downloadUrl:
        this.projectForm
          .downloadUrl
          .trim() || null,

      featured:
        this.projectForm.featured,

      technologies:
        this.splitValues(
          this.projectForm.technologies,
        ),
    };
  }

  /**
   * Dein bisheriges HTML verwendet projectForm.description.
   * Falls shortDescription ausgefüllt ist, wird dieses Feld
   * bevorzugt. Ansonsten verwenden wir description.
   */
  private getShortDescription(): string {
    const shortDescription =
      this.projectForm
        .shortDescription
        .trim();

    if (shortDescription) {
      return shortDescription;
    }

    return this.projectForm
      .description
      .trim();
  }

  /**
   * Für die ausführliche Beschreibung wird zuerst
   * fullDescription verwendet. Falls dieses Feld leer ist,
   * wird das bestehende description-Feld genommen.
   */
  private getFullDescription(): string {
    const fullDescription =
      this.projectForm
        .fullDescription
        .trim();

    if (fullDescription) {
      return fullDescription;
    }

    return this.projectForm
      .description
      .trim();
  }

  private splitValues(
    value: string,
  ): string[] {
    return value
      .split(',')
      .map((entry) =>
        entry.trim(),
      )
      .filter(
        (entry) =>
          entry.length > 0,
      );
  }

  private createEmptySkillForm():
    SkillForm {
    return {
      name: '',
      level: 0,
      description: '',
      technologies: '',
    };
  }

  private createEmptyProjectForm():
    ProjectForm {
    return {
      title: '',
      imageUrl: '',
      description: '',
      screenshots: '',
      downloadUrl: '',
      shortDescription: '',
      fullDescription: '',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      featured: false,
    };
  }
}
