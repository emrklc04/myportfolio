export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  screenshots: string[];
  technologies: string[];
  githubUrl?: string;
  downloadUrl?: string;
  featured?: boolean;
}
