import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import {
  Project,
  ProjectRequest,
  ProjectResponse,
} from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly publicApiUrl =
    `${environment.apiUrl}/projects`;

  private readonly adminApiUrl =
    `${environment.apiUrl}/admin/projects`;

  constructor(
    private readonly http: HttpClient,
  ) {}

  /** Lädt alle Projekte für die öffentliche Home-Seite. */
  getProjects(): Observable<Project[]> {
    return this.http
      .get<ProjectResponse[]>(this.publicApiUrl)
      .pipe(
        map((projects) => {
          console.log(
            'Antwort von /api/projects:',
            projects,
          );

          return projects.map((project) =>
            this.mapProject(project),
          );
        }),
      );
  }

  /** Alias für das Admin-Dashboard. */
  getAllProjects(): Observable<Project[]> {
    return this.getProjects();
  }

  /** Erstellt ein Projekt über den geschützten Admin-Endpunkt. */
  createProject(
    request: ProjectRequest,
  ): Observable<Project> {
    return this.http
      .post<ProjectResponse>(
        this.adminApiUrl,
        request,
      )
      .pipe(
        map((project) =>
          this.mapProject(project),
        ),
      );
  }

  /** Aktualisiert ein vorhandenes Projekt. */
  updateProject(
    projectId: number,
    request: ProjectRequest,
  ): Observable<Project> {
    return this.http
      .put<ProjectResponse>(
        `${this.adminApiUrl}/${projectId}`,
        request,
      )
      .pipe(
        map((project) =>
          this.mapProject(project),
        ),
      );
  }

  /** Löscht ein Projekt anhand seiner ID. */
  deleteProject(
    projectId: number,
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.adminApiUrl}/${projectId}`,
    );
  }

  private mapProject(
    project: ProjectResponse,
  ): Project {
    const fullDescription =
      project.fullDescription ?? '';

    return {
      id: project.id,
      title: project.title,
      slug: project.slug,
      shortDescription:
        project.shortDescription ?? '',
      description: fullDescription,
      fullDescription,
      imageUrl:
        project.imageUrl ||
        'images/project-placeholder.jpg',
      screenshots:
        project.screenshots ?? [],
      technologies:
        project.technologies ?? [],
      githubUrl:
        project.githubUrl || undefined,
      liveUrl:
        project.liveUrl || undefined,
      downloadUrl:
        project.downloadUrl || undefined,
      featured: project.featured,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
}
