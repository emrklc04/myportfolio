export interface Skill {
  id?: number;
  name: string;
  description: string[];
  projectTechnologies: string[];
}

export interface SkillRequest {
  name: string;
  description: string[];
  projectTechnologies: string[];
}
