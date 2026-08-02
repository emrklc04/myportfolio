package at.emre.portfolio.controller;

import at.emre.portfolio.dto.SkillDto;
import at.emre.portfolio.dto.SkillRequestDto;
import at.emre.portfolio.service.SkillService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/skills")
public class AdminSkillController {

    private final SkillService skillService;

    public AdminSkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public SkillDto createSkill(@Valid @RequestBody SkillRequestDto request) {
        return skillService.createSkill(request);
    }

    @PutMapping("/{id}")
    public SkillDto updateSkill(
            @PathVariable Long id,
            @Valid @RequestBody SkillRequestDto request
    ) {
        return skillService.updateSkill(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSkill(@PathVariable Long id) {
        skillService.deleteSkill(id);
    }
}
