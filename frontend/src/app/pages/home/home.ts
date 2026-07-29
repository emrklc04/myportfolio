import {
  ChangeDetectorRef, // <-- Neu importieren
  Component,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ProjectCard } from '../../components/project-card/project-card';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProjectCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  protected projects: Project[] = [];
  protected filteredProjects: Project[] = [];
  protected isLoading = true;
  protected loadError = '';

  protected searchTerm = '';
  protected selectedTechnology = 'All';

  constructor(
    private readonly projectService: ProjectService,
    private readonly cdr: ChangeDetectorRef, // <-- Hier injizieren
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  protected get technologies(): string[] {
    const technologies = this.projects.flatMap(
      (project) => project.technologies ?? [],
    );

    return [...new Set(technologies)].sort((first, second) =>
      first.localeCompare(second),
    );
  }

  protected applyFilters(): void {
    if (!this.projects || this.projects.length === 0) {
      this.filteredProjects = [];
      return;
    }

    const normalizedSearchTerm = this.searchTerm
      .trim()
      .toLowerCase();

    this.filteredProjects = this.projects.filter((project) => {
      const matchesName =
        !normalizedSearchTerm ||
        (project.title ?? '')
          .toLowerCase()
          .includes(normalizedSearchTerm);

      const projectTechs = project.technologies ?? [];
      const matchesTechnology =
        this.selectedTechnology === 'All' ||
        projectTechs.includes(this.selectedTechnology);

      return matchesName && matchesTechnology;
    });
  }

  protected updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.applyFilters();
  }

  protected selectTechnology(technology: string): void {
    this.selectedTechnology = technology;
    this.applyFilters();
  }

  protected resetFilters(): void {
    this.searchTerm = '';
    this.selectedTechnology = 'All';
    this.applyFilters();
  }

  protected loadProjects(): void {
    this.isLoading = true;
    this.loadError = '';

    this.projectService
      .getProjects()
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.cdr.detectChanges(); // Erfasse auch den Lade-Ende-Status
        }),
      )
      .subscribe({
        next: (projects: Project[]) => {
          console.log('Geladene Projekte:', projects);
          this.projects = projects;
          this.applyFilters();

          // ZWINGT Angular sofort zum Neuzeichnen des UI!
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(
            'Projekte konnten nicht geladen werden:',
            error,
          );

          this.loadError =
            'Die Projekte konnten nicht vom Backend geladen werden.';
          this.cdr.detectChanges();
        },
      });
  }
}
