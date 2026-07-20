package at.emre.portfolio.service;

import at.emre.portfolio.dto.ProjectResponse;
import at.emre.portfolio.entity.Project;
import at.emre.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public ProjectResponse getProjectBySlug(String slug) {
        Project project = projectRepository.findBySlug(slug)
                .orElseThrow(() ->
                        new IllegalArgumentException("Project not found")
                );

        return toResponse(project);
    }

    private ProjectResponse toResponse(Project project) {
        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getSlug(),
                project.getShortDescription(),
                project.getFullDescription(),
                project.getGithubUrl(),
                project.getLiveUrl(),
                project.isFeatured(),
                project.getTechnologies(),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }
}