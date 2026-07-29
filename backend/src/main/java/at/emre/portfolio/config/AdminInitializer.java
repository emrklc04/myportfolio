package at.emre.portfolio.config;

import at.emre.portfolio.entity.Admin;
import at.emre.portfolio.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner createAdminIfMissing(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            @Value("${portfolio.admin.username:admin}")
            String username,
            @Value("${portfolio.admin.password:admin123}")
            String password
    ) {
        return args -> {
            if (adminRepository
                    .findByUsername(username)
                    .isPresent()) {
                return;
            }

            Admin admin = new Admin();
            admin.setUsername(username);
            admin.setPasswordHash(
                    passwordEncoder.encode(password)
            );
            admin.setRole("ADMIN");

            adminRepository.save(admin);
        };
    }
}