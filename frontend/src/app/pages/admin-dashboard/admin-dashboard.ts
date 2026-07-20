import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

interface SkillForm {
  name: string;
  level: number | null;
  description: string;
  technologies: string;
}

interface ProjectForm {
  title: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  screenshots: string;
  technologies: string;
  githubUrl: string;
  downloadUrl: string;
  featured: boolean;
}

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
export class AdminDashboard {
  protected activeSection: 'overview' | 'skill' | 'project' =
    'overview';

  protected skillForm: SkillForm = this.createEmptySkillForm();

  protected projectForm: ProjectForm =
    this.createEmptyProjectForm();

  constructor(private readonly router: Router) {}

  protected showSection(
    section: 'overview' | 'skill' | 'project',
  ): void {
    this.activeSection = section;
  }

  protected prepareSkill(): void {
    /*
     * Hier wird später der API-Aufruf zum Speichern
     * eines Skills eingebaut.
     */

    console.log('Skill für spätere API vorbereitet:', {
      ...this.skillForm,
      description: this.splitValues(
        this.skillForm.description,
      ),
      technologies: this.splitValues(
        this.skillForm.technologies,
      ),
    });
  }

  protected prepareProject(): void {
    /*
     * Hier wird später der API-Aufruf zum Speichern
     * eines Projekts eingebaut.
     */

    console.log('Projekt für spätere API vorbereitet:', {
      ...this.projectForm,
      screenshots: this.splitValues(
        this.projectForm.screenshots,
      ),
      technologies: this.splitValues(
        this.projectForm.technologies,
      ),
    });
  }

  protected resetSkillForm(): void {
    this.skillForm = this.createEmptySkillForm();
  }

  protected resetProjectForm(): void {
    this.projectForm = this.createEmptyProjectForm();
  }

  protected logout(): void {
    /*
     * Hier wird später der Token entfernt
     * und die Backend-Session beendet.
     */

    void this.router.navigate(['/admin']);
  }

  private splitValues(value: string): string[] {
    return value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean);
  }

  private createEmptySkillForm(): SkillForm {
    return {
      name: '',
      level: null,
      description: '',
      technologies: '',
    };
  }

  private createEmptyProjectForm(): ProjectForm {
    return {
      title: '',
      shortDescription: '',
      description: '',
      imageUrl: '',
      screenshots: '',
      technologies: '',
      githubUrl: '',
      downloadUrl: '',
      featured: false,
    };
  }
}
