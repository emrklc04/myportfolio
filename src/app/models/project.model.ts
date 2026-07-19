export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  downloadUrl?: string;
  featured?: boolean;
}
