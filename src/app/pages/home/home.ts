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
}
