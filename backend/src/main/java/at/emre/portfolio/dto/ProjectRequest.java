package at.emre.portfolio.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ProjectRequest(
        @NotBlank
        @Size(max = 200)
        String title,

        @Size(max = 500)
        String shortDescription,

        String fullDescription,

        @Size(max = 500)
        String imageUrl,

        List<String> screenshots,

        @Size(max = 500)
        String githubUrl,

        @Size(max = 500)
        String liveUrl,

        @Size(max = 500)
        String downloadUrl,

        @Size(max = 500)
        String videoUrl,

        boolean featured,

        List<String> technologies
) {
}
