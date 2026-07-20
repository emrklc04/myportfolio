package at.emre.portfolio.repository;

import at.emre.portfolio.entity.ProjectFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectFileRepository
        extends JpaRepository<ProjectFile, Long> {

    List<ProjectFile> findAllByProjectId(Long projectId);

    Optional<ProjectFile> findFirstByProjectIdAndFileType(
            Long projectId,
            String fileType
    );
}