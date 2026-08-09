package at.emre.portfolio.service;

import at.emre.portfolio.dto.SkillDto;
import at.emre.portfolio.dto.SkillRequestDto;
import at.emre.portfolio.entity.Skill;
import at.emre.portfolio.repository.SkillRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class SkillService {

    private final SkillRepository skillRepository;

    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @Transactional(readOnly = true)
    public List<SkillDto> getAllSkills() {
        return skillRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public SkillDto getSkillById(Long id) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Skill nicht gefunden"));
        return toDto(skill);
    }

    public SkillDto createSkill(SkillRequestDto request) {
        if (skillRepository.existsByNameIgnoreCase(request.name())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ein Skill mit diesem Namen existiert bereits");
        }

        Skill skill = new Skill();
        skill.setName(request.name());
        skill.setIconUrl(request.iconUrl());
        skill.setDescription(request.description() != null ? request.description() : List.of());
        skill.setProjectTechnologies(request.projectTechnologies() != null ? request.projectTechnologies() : List.of());

        Skill savedSkill = skillRepository.save(skill);
        return toDto(savedSkill);
    }

    public SkillDto updateSkill(Long id, SkillRequestDto request) {
        Skill skill = skillRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Skill nicht gefunden"));

        skill.setName(request.name());
        skill.setIconUrl(request.iconUrl());
        skill.setDescription(request.description() != null ? request.description() : List.of());
        skill.setProjectTechnologies(request.projectTechnologies() != null ? request.projectTechnologies() : List.of());

        Skill updatedSkill = skillRepository.save(skill);
        return toDto(updatedSkill);
    }

    public void deleteSkill(Long id) {
        if (!skillRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Skill nicht gefunden");
        }
        skillRepository.deleteById(id);
    }

    private SkillDto toDto(Skill skill) {
        return new SkillDto(
                skill.getId(),
                skill.getName(),
                skill.getIconUrl(),
                List.copyOf(skill.getDescription()),
                List.copyOf(skill.getProjectTechnologies())
        );
    }
}