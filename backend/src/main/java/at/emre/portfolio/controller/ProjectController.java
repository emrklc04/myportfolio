package at.emre.portfolio.controller;

import at.emre.portfolio.dto.ProjectResponse;
import at.emre.portfolio.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public List<ProjectResponse> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{slug}")
    public ProjectResponse getProjectBySlug(
            @PathVariable String slug
    ) {
        return projectService.getProjectBySlug(slug);
    }
}