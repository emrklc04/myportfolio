import { Component } from '@angular/core';

interface Skill {
  name: string;
  level: number;
}

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly skills: Skill[] = [
    {
      name: 'Angular',
      level: 80,
    },
    {
      name: 'TypeScript',
      level: 75,
    },
    {
      name: 'JavaScript',
      level: 70,
    },
    {
      name: 'Java',
      level: 82,
    },
    {
      name: 'Spring Boot',
      level: 75,
    },
    {
      name: 'Python',
      level: 65,
    },
    {
      name: 'PostgreSQL',
      level: 70,
    },
    {
      name: 'Git',
      level: 72,
    },
    {
      name: 'HTML',
      level: 88,
    },
    {
      name: 'CSS',
      level: 80,
    },
  ];
}
