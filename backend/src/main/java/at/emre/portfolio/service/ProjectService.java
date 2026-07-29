package at.emre.portfolio.service;

import at.emre.portfolio.dto.ProjectRequest;
import at.emre.portfolio.dto.ProjectResponse;
import at.emre.portfolio.entity.Project;
import at.emre.portfolio.repository.ProjectRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(
            ProjectRepository projectRepository
    ) {
        this.projectRepository = projectRepository;
    }

    @Transactional(readOnly = true)
    public List<ProjectResponse> getAllProjects() {
        return projectRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProjectResponse getProjectBySlug(
            String slug
    ) {
        return toResponse(findBySlug(slug));
    }

    @Transactional
    public ProjectResponse createProject(
            ProjectRequest request
    ) {
        Project project = new Project();

        applyRequest(project, request);

        project.setSlug(
                createUniqueSlug(
                        request.title(),
                        null
                )
        );

        return toResponse(
                projectRepository.save(project)
        );
    }

    @Transactional
    public ProjectResponse updateProject(
            Long id,
            ProjectRequest request
    ) {
        Project project = findById(id);

        applyRequest(project, request);

        project.setSlug(
                createUniqueSlug(
                        request.title(),
                        id
                )
        );

        return toResponse(
                projectRepository.save(project)
        );
    }

    @Transactional
    public void deleteProject(
            Long id
    ) {
        Project project = findById(id);
        projectRepository.delete(project);
    }

    private Project findBySlug(
            String slug
    ) {
        return projectRepository
                .findBySlug(slug)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Project not found"
                        )
                );
    }

    private Project findById(
            Long id
    ) {
        return projectRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Project not found"
                        )
                );
    }

    private void applyRequest(
            Project project,
            ProjectRequest request
    ) {
        project.setTitle(
                request.title().trim()
        );

        project.setShortDescription(
                normalizeNullable(
                        request.shortDescription()
                )
        );

        project.setFullDescription(
                normalizeNullable(
                        request.fullDescription()
                )
        );

        project.setImageUrl(
                normalizeNullable(
                        request.imageUrl()
                )
        );

        project.setScreenshots(
                normalizeList(
                        request.screenshots()
                )
        );

        project.setGithubUrl(
                normalizeNullable(
                        request.githubUrl()
                )
        );

        project.setLiveUrl(
                normalizeNullable(
                        request.liveUrl()
                )
        );

        project.setDownloadUrl(
                normalizeNullable(
                        request.downloadUrl()
                )
        );

        project.setFeatured(
                request.featured()
        );

        project.setTechnologies(
                normalizeList(
                        request.technologies()
                )
        );
    }

    private String createUniqueSlug(
            String title,
            Long currentProjectId
    ) {
        String baseSlug = Normalizer
                .normalize(
                        title,
                        Normalizer.Form.NFD
                )
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-|-$", "");

        if (baseSlug.isBlank()) {
            baseSlug = "project";
        }

        String slug = baseSlug;
        int suffix = 2;

        while (
                projectRepository
                        .findBySlug(slug)
                        .filter(project ->
                                !project.getId()
                                        .equals(
                                                currentProjectId
                                        )
                        )
                        .isPresent()
        ) {
            slug = baseSlug + "-" + suffix++;
        }

        return slug;
    }

    private String normalizeNullable(
            String value
    ) {
        if (
                value == null ||
                        value.isBlank()
        ) {
            return null;
        }

        return value.trim();
    }

    private List<String> normalizeList(
            List<String> values
    ) {
        if (values == null) {
            return List.of();
        }

        return values.stream()
                .map(String::trim)
                .filter(value ->
                        !value.isBlank()
                )
                .distinct()
                .toList();
    }

    private List<String> copyList(
            List<String> values
    ) {
        if (values == null) {
            return List.of();
        }

        return new ArrayList<>(values);
    }

    private ProjectResponse toResponse(
            Project project
    ) {
        return new ProjectResponse(
                project.getId(),
                project.getTitle(),
                project.getSlug(),
                project.getShortDescription(),
                project.getFullDescription(),
                project.getImageUrl(),
                copyList(project.getScreenshots()),
                project.getGithubUrl(),
                project.getLiveUrl(),
                project.getDownloadUrl(),
                project.isFeatured(),
                copyList(project.getTechnologies()),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }
}
