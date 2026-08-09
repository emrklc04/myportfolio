import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Subscription, filter } from 'rxjs';

type NavSection = 'projects' | 'about';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, OnDestroy {
  protected isHomeRoute = true;
  protected activeSection: NavSection = 'projects';

  private readonly routerSubscription: Subscription;

  constructor(private readonly router: Router) {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateHomeRouteFlag();
        this.updateActiveSection();
      });
  }

  ngOnInit(): void {
    this.updateHomeRouteFlag();
    this.updateActiveSection();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  @HostListener('window:scroll')
  protected updateActiveSection(): void {
    if (!this.isHomeRoute) {
      this.activeSection = 'projects';
      return;
    }

    const aboutSection = document.getElementById('about');
    if (!aboutSection) {
      this.activeSection = 'projects';
      return;
    }

    const triggerPoint = window.innerHeight * 0.35;
    this.activeSection =
      aboutSection.getBoundingClientRect().top <= triggerPoint
        ? 'about'
        : 'projects';
  }

  protected goToProjects(event: Event): void {
    if (!this.isHomeRoute) {
      return;
    }

    event.preventDefault();
    document
      .getElementById('projects')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  protected get isProjectsActive(): boolean {
    return this.isHomeRoute && this.activeSection === 'projects';
  }

  protected get isAboutActive(): boolean {
    return this.isHomeRoute && this.activeSection === 'about';
  }

  private updateHomeRouteFlag(): void {
    const path = this.router.url.split('#')[0].split('?')[0];
    this.isHomeRoute = path === '/';
  }
}
