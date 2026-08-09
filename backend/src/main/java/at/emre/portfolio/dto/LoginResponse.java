package at.emre.portfolio.dto;

public record LoginResponse(
        String username,
        String role,
        String token
) {
}