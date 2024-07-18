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
        List<ApplicationEntity> entities = service.getAll();
        List<ApplicationVO> out = new ArrayList<>();
        for (ApplicationEntity entity : entities) {
            ApplicationVO app = ApplicationVO.builder()
                    .id(entity.getId())
                    .name(entity.getName())
                    .gitRepository(entity.getGitRepository())
                    .gitBranchName(entity.getGitBranchName())
                    .agentHost(entity.getAgentHost())
                    .artifactRule(entity.getArtifactRule())
                    .build();
            out.add(app);
        }
        WrapResponse<List<ApplicationVO>> wrapResponse = new WrapResponse<>(out);
        return ResponseEntity.ok(wrapResponse.success());
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

    @PostMapping("/update/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody ApplicationVO app) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception(("id should not null"));
        }
        ApplicationEntity application;
        try {
            application = ApplicationEntity.builder()
                    .id(app.getId())
                    .name(app.getName())
                    .gitRepository(app.getGitRepository())
                    .gitBranchName(app.getGitBranchName())
                    .agentHost(app.getAgentHost())
                    .artifactRule(app.getArtifactRule())
                    .build();
        } catch (NullPointerException e) {
            throw new Exception("missing params", e);
        }
        service.put(id, application);
        WrapResponse<ApplicationEntity> wrapResponse = new WrapResponse<>(application);
        return ResponseEntity.ok(wrapResponse.success());
    }

    @PostMapping("/save")
    public ResponseEntity save(@RequestBody ApplicationVO app) throws Exception {
        ApplicationEntity application;
        try {
            application = ApplicationEntity.builder()
                    .name(app.getName())
                    .gitRepository(app.getGitRepository())
                    .gitBranchName(app.getGitBranchName())
                    .agentHost(app.getAgentHost())
                    .artifactRule(app.getArtifactRule())
                    .build();
        } catch (NullPointerException e) {
            throw new Exception("missing params", e);
        }
        service.save(application);
        WrapResponse<ApplicationEntity> wrapResponse = new WrapResponse<>(application);
        return ResponseEntity.ok(wrapResponse.success());
    }
}
