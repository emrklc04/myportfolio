export interface Skill {
  id?: number;
  name: string;
  iconUrl?: string;
  description: string[];
  projectTechnologies: string[];
}

export interface SkillRequest {
  name: string;
  iconUrl?: string;
  description: string[];
  projectTechnologies: string[];
}
