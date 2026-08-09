package at.emre.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(name = "icon_url", length = 500)
    private String iconUrl;

    @ElementCollection
    @CollectionTable(name = "skill_descriptions", joinColumns = @JoinColumn(name = "skill_id"))
    @Column(name = "description", nullable = false)
    @OrderColumn(name = "display_order")
    private List<String> description = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "skill_technologies", joinColumns = @JoinColumn(name = "skill_id"))
    @Column(name = "technology", nullable = false)
    private List<String> projectTechnologies = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Skill() {}

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // --- Getter und Setter ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public List<String> getDescription() {
        return description;
    }

    public void setDescription(List<String> description) {
        this.description = description;
    }

    public List<String> getProjectTechnologies() {
        return projectTechnologies;
    }

    public void setProjectTechnologies(List<String> projectTechnologies) {
        this.projectTechnologies = projectTechnologies;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}