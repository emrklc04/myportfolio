import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Skill, SkillRequest } from '../models/skill.model';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private readonly http = inject(HttpClient);
  private readonly publicApiUrl = `${environment.apiUrl}/skills`;
  private readonly adminApiUrl = `${environment.apiUrl}/admin/skills`;

  getAllSkills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.publicApiUrl);
  }

  getSkillById(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.publicApiUrl}/${id}`);
  }

  createSkill(request: SkillRequest): Observable<Skill> {
    return this.http.post<Skill>(this.adminApiUrl, request);
  }

  updateSkill(id: number, request: SkillRequest): Observable<Skill> {
    return this.http.put<Skill>(`${this.adminApiUrl}/${id}`, request);
  }

  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.adminApiUrl}/${id}`);
  }
}
