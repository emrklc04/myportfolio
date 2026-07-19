import { Component, HostListener, Input, OnDestroy } from '@angular/core';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard implements OnDestroy {
  @Input({ required: true })
  project!: Project;

  protected isDetailsOpen = false;

  protected openDetails(): void {
    this.isDetailsOpen = true;
    document.body.style.overflow = 'hidden';
  }

  protected closeDetails(): void {
    this.isDetailsOpen = false;
    document.body.style.overflow = '';
  }

  protected handleCardKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openDetails();
    }
  }

  protected stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  @HostListener('document:keydown.escape')
  protected closeDetailsWithEscape(): void {
    if (this.isDetailsOpen) {
      this.closeDetails();
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}
