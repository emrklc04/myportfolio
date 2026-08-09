package at.emre.portfolio.dto;
import java.util.List;

public record SkillDto(
        Long id,
        String name,
        String iconUrl,
        List<String> description,
        List<String> projectTechnologies
) {}