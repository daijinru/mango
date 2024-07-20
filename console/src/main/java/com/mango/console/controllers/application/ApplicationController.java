package com.mango.console.controllers.application;

import com.mango.console.common.WrapResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/v1/application")
public class ApplicationController {
    @Autowired
    private ApplicationService service;

    @GetMapping("/all")
    public ResponseEntity getAll() throws Exception {
        List<ApplicationEntity> applications = service.getAll();
        return ResponseEntity.ok(new WrapResponse<>(applications).success());
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("id should not null");
        }
        ApplicationEntity application = service.get(id);
        WrapResponse<ApplicationEntity> wrapResponse = new WrapResponse<>(application);
        return ResponseEntity.ok(wrapResponse.success());
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody ApplicationVO vo) throws Exception {
        if (Objects.isNull(vo.getId())) {
            throw new Exception(("id should not null"));
        }
        WrapResponse<ApplicationEntity> wrapResponse = new WrapResponse<>(service.update(vo));
        return ResponseEntity.ok(wrapResponse.success());
    }

    @PostMapping("/save")
    public ResponseEntity save(@RequestBody ApplicationVO app) throws Exception {
        ApplicationEntity application = ApplicationEntity.builder()
                .name(app.getName())
                .gitRepository(app.getGitRepository())
                .gitBranchName(app.getGitBranchName())
                .agentHost(app.getAgentHost())
                .artifactRule(app.getArtifactRule())
                .user(app.getUser())
                .pwd(app.getPwd())
                .build();
        service.save(application);
        WrapResponse<ApplicationEntity> wrapResponse = new WrapResponse<>(application);
        return ResponseEntity.ok(wrapResponse.success());
    }
}
