export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  description?: string;
  fullDescription?: string;
  imageUrl?: string;
  screenshots?: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  downloadUrl?: string;
  featured?: boolean;
  slug?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectRequest {
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl?: string | null;
  screenshots: string[];
  technologies: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  downloadUrl?: string | null;
  featured: boolean;
}

export interface ProjectResponse {
  id: number;
  title: string;
  slug: string;
  shortDescription: string | null;
  fullDescription: string | null;
  imageUrl: string | null;
  screenshots: string[] | null;
  githubUrl: string | null;
  liveUrl: string | null;
  downloadUrl: string | null;
  featured: boolean;
  technologies: string[] | null;
  createdAt: string;
  updatedAt: string;
}
