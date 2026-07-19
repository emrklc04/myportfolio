import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Tour Planner',
    shortDescription:
      'Eine Webanwendung zum Erstellen und Verwalten von Touren.',
    description:
      'Der Tour Planner ermöglicht registrierten Benutzern, Touren und Tour Logs zu erstellen, zu bearbeiten und zu löschen. Die Anwendung besteht aus einem Angular-Frontend und einem Spring-Boot-Backend.',
    imageUrl: 'images/tour-planner.jpg',
    technologies: [
      'Angular',
      'TypeScript',
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'JWT',
    ],
    githubUrl: 'https://github.com/DEIN-BENUTZERNAME/tour-planner',
    downloadUrl: 'downloads/tour-planner.zip',
    featured: true,
  },
  {
    id: 2,
    title: 'QR Code Generator',
    shortDescription:
      'Eine Anwendung zum Erstellen und Verwalten eigener QR-Codes.',
    description:
      'Benutzer können Inhalte in QR-Codes umwandeln, Kategorien auswählen, Codes als Favoriten speichern und gespeicherte QR-Codes filtern, sortieren oder löschen.',
    imageUrl: 'images/qr-generator.jpg',
    technologies: ['Python', 'Flet', 'SQLite', 'QR Code'],
    githubUrl: 'https://github.com/DEIN-BENUTZERNAME/qr-code-generator',
    downloadUrl: 'downloads/qr-code-generator.zip',
    featured: true,
  },
  {
    id: 3,
    title: 'pAIpline Generator',
    shortDescription:
      'Ein KI-gestütztes Werkzeug zur Erstellung von Moodle-Kursen.',
    description:
      'Das Projekt unterstützt Lehrende bei der automatischen Erstellung von Kursplänen und Unterrichtseinheiten. Die Inhalte können bearbeitet und anschließend exportiert werden.',
    imageUrl: 'images/paipline.jpg',
    technologies: ['Python', 'Artificial Intelligence', 'Moodle', 'JSON'],
    githubUrl: 'https://github.com/DEIN-BENUTZERNAME/paipline-generator',
    downloadUrl: 'downloads/paipline-generator.zip',
  },
];
