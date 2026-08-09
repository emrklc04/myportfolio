package at.emre.portfolio.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Begrenzt POST /api/auth/login pro Client-IP, um Brute-Force-Versuche
 * auf das Admin-Login zu erschweren. Bewusst einfach gehalten (In-Memory,
 * kein externer Store), da die App nur auf einer einzelnen Instanz läuft.
 */
@Component
public class LoginRateLimitFilter extends OncePerRequestFilter {

    private static final String LOGIN_PATH = "/api/auth/login";
    private static final int MAX_ATTEMPTS_PER_WINDOW = 8;
    private static final long WINDOW_MILLIS = Duration.ofMinutes(5).toMillis();

    private final Map<String, AttemptWindow> attemptsByIp = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        boolean isLoginRequest =
                "POST".equalsIgnoreCase(request.getMethod()) &&
                        LOGIN_PATH.equals(request.getRequestURI());

        if (!isLoginRequest || !isRateLimited(request.getRemoteAddr())) {
            filterChain.doFilter(request, response);
            return;
        }

        response.setStatus(429);
        response.setContentType("application/json");
        response.getWriter().write(
                "{\"error\":\"Zu viele Login-Versuche. Bitte in ein paar Minuten erneut versuchen.\"}"
        );
    }

    private boolean isRateLimited(String clientIp) {
        long now = System.currentTimeMillis();

        AttemptWindow window = attemptsByIp.compute(
                clientIp,
                (ip, existing) -> {
                    if (existing == null || now - existing.windowStart > WINDOW_MILLIS) {
                        return new AttemptWindow(now);
                    }
                    existing.count.incrementAndGet();
                    return existing;
                }
        );

        return window.count.get() > MAX_ATTEMPTS_PER_WINDOW;
    }

    private static final class AttemptWindow {
        private final long windowStart;
        private final AtomicInteger count;

        private AttemptWindow(long windowStart) {
            this.windowStart = windowStart;
            this.count = new AtomicInteger(1);
        }
    }
}
