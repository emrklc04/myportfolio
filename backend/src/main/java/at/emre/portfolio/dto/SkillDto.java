package at.emre.portfolio.dto;
import java.util.List;

public record SkillDto(
        Long id,
        String name,
        List<String> description,
        List<String> projectTechnologies
) {}