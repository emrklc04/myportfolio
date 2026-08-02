package at.emre.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import java.util.List;

public record SkillRequestDto(
        @NotBlank(message = "Der Name darf nicht leer sein")
        String name,

        List<String> description,
        List<String> projectTechnologies
) {}