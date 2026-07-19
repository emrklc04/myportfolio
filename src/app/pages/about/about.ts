import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly skills = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'Java',
    'Spring Boot',
    'Python',
    'PostgreSQL',
    'Git',
    'HTML',
    'CSS',
  ];
}
