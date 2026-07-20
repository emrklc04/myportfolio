package at.emre.portfolio.dto;

import java.time.LocalDateTime;
import java.util.List;

public record ProjectResponse(
        Long id,
        String title,
        String slug,
        String shortDescription,
        String fullDescription,
        String githubUrl,
        String liveUrl,
        boolean featured,
        List<String> technologies,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}