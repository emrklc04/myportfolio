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

  protected useFallbackImage(event: Event): void {
    const image = event.target as HTMLImageElement;
    image.onerror = null;
    image.src = 'data:image/svg+xml;charset=UTF-8,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700"><rect width="1200" height="700" fill="#172033"/><text x="600" y="360" text-anchor="middle" fill="#aeb8cc" font-family="Arial" font-size="48">Project Preview</text></svg>',
      );
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
