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
  Skill,
  SkillRequest,
} from '../../models/skill.model';

import {
  getSkillIconUrl,
} from '../../data/skill-icons';

import {
  AuthService,
} from '../../services/auth.service';

import {
  ProjectService,
} from '../../services/project.service';

import {
  SkillService,
} from '../../services/skill.service';

interface SkillForm {
  name: string;
  iconUrl: string;
  description: string;
  technologies: string;
}

interface ProjectForm {
  title: string;
  imageUrl: string;
  description: string;
  screenshots: string;
  downloadUrl: string;
  videoUrl: string;
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
  private readonly authService = inject(AuthService);
  private readonly projectService = inject(ProjectService);
  private readonly skillService = inject(SkillService);

  protected activeSection: AdminSection = 'overview';
  protected projects: Project[] = [];
  protected skills: Skill[] = [];

  protected skillForm: SkillForm = this.createEmptySkillForm();
  protected projectForm: ProjectForm = this.createEmptyProjectForm();

  protected editingProjectId: number | null = null;
  protected editingSkillId: number | null = null;

  protected loadingProjects = true;
  protected loadingSkills = true;
  protected saving = false;
  protected message = '';
  protected errorMessage = '';

  protected readonly username = this.authService.getUsername();

  ngOnInit(): void {
    this.loadProjects();
    this.loadSkills();
  }

  protected showSection(section: AdminSection): void {
    this.activeSection = section;
    this.message = '';
    this.errorMessage = '';
    if (section !== 'project') {
      this.cancelEditProject();
    }
    if (section !== 'skill') {
      this.cancelEditSkill();
    }
  }

  /* --- SKILL-VERWALTUNG --- */

  protected saveSkill(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.skillForm.name.trim()) {
      this.errorMessage = 'Bitte gib einen Namen für den Skill ein.';
      return;
    }

    this.saving = true;
    const request: SkillRequest = {
      name: this.skillForm.name.trim(),
      iconUrl: this.skillForm.iconUrl.trim() || undefined,
      description: this.splitValues(this.skillForm.description),
      projectTechnologies: this.splitValues(this.skillForm.technologies),
    };

    if (this.editingSkillId) {
      this.skillService
        .updateSkill(this.editingSkillId, request)
        .pipe(finalize(() => (this.saving = false)))
        .subscribe({
          next: (updatedSkill) => {
            this.skills = this.skills.map((s) =>
              s.id === updatedSkill.id ? updatedSkill : s,
            );
            this.resetSkillForm();
            this.message = 'Der Skill wurde erfolgreich aktualisiert.';
          },
          error: (err) => {
            console.error('Fehler beim Aktualisieren des Skills:', err);
            this.errorMessage = 'Der Skill konnte nicht aktualisiert werden.';
          },
        });
    } else {
      this.skillService
        .createSkill(request)
        .pipe(finalize(() => (this.saving = false)))
        .subscribe({
          next: (createdSkill) => {
            this.skills = [...this.skills, createdSkill];
            this.resetSkillForm();
            this.message = 'Der Skill wurde erfolgreich gespeichert.';
          },
          error: (err) => {
            console.error('Fehler beim Speichern des Skills:', err);
            this.errorMessage = 'Der Skill konnte nicht gespeichert werden.';
          },
        });
    }
  }

  protected editSkill(skill: Skill): void {
    this.editingSkillId = skill.id || null;
    this.skillForm = {
      name: skill.name || '',
      iconUrl: skill.iconUrl || '',
      description: skill.description ? skill.description.join(', ') : '',
      technologies: skill.projectTechnologies
        ? skill.projectTechnologies.join(', ')
        : '',
    };
    this.showSection('skill');
  }

  protected cancelEditSkill(): void {
    this.editingSkillId = null;
    this.resetSkillForm();
  }

  protected deleteSkill(skill: Skill): void {
    if (!skill.id) return;

    const confirmed = window.confirm(
      `Soll der Skill „${skill.name}“ wirklich gelöscht werden?`,
    );

    if (!confirmed) return;

    this.message = '';
    this.errorMessage = '';

    this.skillService.deleteSkill(skill.id).subscribe({
      next: () => {
        this.skills = this.skills.filter((s) => s.id !== skill.id);
        this.message = 'Der Skill wurde gelöscht.';
        if (this.editingSkillId === skill.id) {
          this.cancelEditSkill();
        }
      },
      error: (err) => {
        console.error('Fehler beim Löschen des Skills:', err);
        this.errorMessage = 'Der Skill konnte nicht gelöscht werden.';
      },
    });
  }

  protected resetSkillForm(): void {
    this.editingSkillId = null;
    this.skillForm = this.createEmptySkillForm();
    this.message = '';
    this.errorMessage = '';
  }

  /* --- PROJEKT-VERWALTUNG --- */

  protected prepareProject(): void {
    this.saveProject();
  }

  protected saveProject(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.projectForm.title.trim()) {
      this.errorMessage = 'Bitte gib einen Projekttitel ein.';
      return;
    }

    this.saving = true;
    const request = this.toProjectRequest();

    if (this.editingProjectId) {
      this.projectService
        .updateProject(this.editingProjectId, request)
        .pipe(finalize(() => (this.saving = false)))
        .subscribe({
          next: (updatedProject) => {
            this.projects = this.projects.map((p) =>
              p.id === updatedProject.id ? updatedProject : p,
            );
            this.resetProjectForm();
            this.message = 'Das Projekt wurde erfolgreich aktualisiert.';
          },
          error: (error: unknown) => {
            console.error('Fehler beim Aktualisieren des Projekts:', error);
            this.errorMessage = 'Das Projekt konnte nicht aktualisiert werden.';
          },
        });
    } else {
      this.projectService
        .createProject(request)
        .pipe(finalize(() => (this.saving = false)))
        .subscribe({
          next: (project) => {
            this.projects = [...this.projects, project];
            this.resetProjectForm();
            this.message = 'Das Projekt wurde erfolgreich gespeichert.';
          },
          error: (error: unknown) => {
            console.error('Fehler beim Speichern des Projekts:', error);
            this.errorMessage = 'Das Projekt konnte nicht gespeichert werden.';
          },
        });
    }
  }

  protected editProject(project: Project): void {
    this.editingProjectId = project.id;
    this.projectForm = {
      title: project.title || '',
      imageUrl: project.imageUrl || '',
      description:
        project.shortDescription || project.fullDescription || '',
      shortDescription: project.shortDescription || '',
      fullDescription: project.fullDescription || '',
      screenshots: project.screenshots ? project.screenshots.join(', ') : '',
      downloadUrl: project.downloadUrl || '',
      videoUrl: project.videoUrl || '',
      technologies: project.technologies ? project.technologies.join(', ') : '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      featured: project.featured || false,
    };
    this.showSection('project');
  }

  protected cancelEditProject(): void {
    this.editingProjectId = null;
    this.resetProjectForm();
  }

  protected deleteProject(project: Project): void {
    const confirmed = window.confirm(
      `Soll „${project.title}“ wirklich gelöscht werden?`,
    );

    if (!confirmed) return;

    this.message = '';
    this.errorMessage = '';

    this.projectService.deleteProject(project.id).subscribe({
      next: () => {
        this.projects = this.projects.filter((entry) => entry.id !== project.id);
        this.message = 'Das Projekt wurde gelöscht.';
        if (this.editingProjectId === project.id) {
          this.cancelEditProject();
        }
      },
      error: (error: unknown) => {
        console.error('Fehler beim Löschen des Projekts:', error);
        this.errorMessage = 'Das Projekt konnte nicht gelöscht werden.';
      },
    });
  }

  protected resetProjectForm(): void {
    this.editingProjectId = null;
    this.projectForm = this.createEmptyProjectForm();
    this.message = '';
    this.errorMessage = '';
  }

  protected logout(): void {
    this.authService.logout();
  }

  private loadSkills(): void {
    this.loadingSkills = true;
    this.skillService
      .getAllSkills()
      .pipe(finalize(() => (this.loadingSkills = false)))
      .subscribe({
        next: (skills) => (this.skills = skills),
        error: (err) => console.error('Fehler beim Laden der Skills:', err),
      });
  }

  private loadProjects(): void {
    this.loadingProjects = true;
    this.projectService
      .getAllProjects()
      .pipe(finalize(() => (this.loadingProjects = false)))
      .subscribe({
        next: (projects) => (this.projects = projects),
        error: (err) => console.error('Fehler beim Laden der Projekte:', err),
      });
  }

  private toProjectRequest(): ProjectRequest {
    return {
      title: this.projectForm.title.trim(),
      shortDescription: this.getShortDescription(),
      fullDescription: this.getFullDescription(),
      imageUrl: this.projectForm.imageUrl.trim() || null,
      screenshots: this.splitValues(this.projectForm.screenshots),
      githubUrl: this.projectForm.githubUrl.trim() || null,
      liveUrl: this.projectForm.liveUrl.trim() || null,
      downloadUrl: this.projectForm.downloadUrl.trim() || null,
      videoUrl: this.projectForm.videoUrl.trim() || null,
      featured: this.projectForm.featured,
      technologies: this.splitValues(this.projectForm.technologies),
    };
  }

  private getShortDescription(): string {
    const shortDescription = this.projectForm.shortDescription.trim();
    return shortDescription ? shortDescription : this.projectForm.description.trim();
  }

  private getFullDescription(): string {
    const fullDescription = this.projectForm.fullDescription.trim();
    return fullDescription ? fullDescription : this.projectForm.description.trim();
  }

  private splitValues(value: string): string[] {
    if (!value) return [];
    return value
      .split(',')
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0);
  }

  private createEmptySkillForm(): SkillForm {
    return {
      name: '',
      iconUrl: '',
      description: '',
      technologies: '',
    };
  }

  protected get skillIconPreviewUrl(): string {
    return getSkillIconUrl(this.skillForm.name || '', this.skillForm.iconUrl);
  }

  private createEmptyProjectForm(): ProjectForm {
    return {
      title: '',
      imageUrl: '',
      description: '',
      screenshots: '',
      downloadUrl: '',
      videoUrl: '',
      shortDescription: '',
      fullDescription: '',
      technologies: '',
      githubUrl: '',
      liveUrl: '',
      featured: false,
    };
  }
}
