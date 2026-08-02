package at.emre.portfolio.controller;

import at.emre.portfolio.dto.SkillDto;
import at.emre.portfolio.service.SkillService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping
    public List<SkillDto> getAllSkills() {
        return skillService.getAllSkills();
    }

    @GetMapping("/{id}")
    public SkillDto getSkillById(@PathVariable Long id) {
        return skillService.getSkillById(id);
    }
}
