import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectCard } from '../../components/project-card/project-card';
import { PROJECTS } from '../../data/projects';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ProjectCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly projects = PROJECTS;
  protected readonly technologies = this.getTechnologies();

  protected searchTerm = '';
  protected selectedTechnology = 'All';

  protected get filteredProjects() {
    const normalizedSearchTerm = this.searchTerm.trim().toLowerCase();

    return this.projects.filter((project) => {
      const matchesName = project.title
        .toLowerCase()
        .includes(normalizedSearchTerm);

      const matchesTechnology =
        this.selectedTechnology === 'All' ||
        project.technologies.some(
          (technology) => technology === this.selectedTechnology,
        );

      return matchesName && matchesTechnology;
    });
  }

  protected updateSearchTerm(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }

  protected selectTechnology(technology: string): void {
    this.selectedTechnology = technology;
  }

  protected resetFilters(): void {
    this.searchTerm = '';
    this.selectedTechnology = 'All';
  }

  private getTechnologies(): string[] {
    const technologies = this.projects.flatMap(
      (project) => project.technologies,
    );

    return [...new Set(technologies)].sort((first, second) =>
      first.localeCompare(second),
    );
  }
}
