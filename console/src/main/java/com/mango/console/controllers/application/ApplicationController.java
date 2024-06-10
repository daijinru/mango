package com.mango.console.controllers.application;

import com.mango.console.common.WrapResponsesData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/v1/application")
public class ApplicationController {
    @Autowired
    private ApplicationService service;

    @GetMapping("/all")
    public Object getAll() throws Exception {
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

        return new WrapResponsesData(out).success();
    }

    @PostMapping("/put/{id}")
    public Object put(@PathVariable Long id, @RequestBody ApplicationVO app) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception(("id should not null"));
        }
        ApplicationEntity entity;
        try {
            entity = ApplicationEntity.builder()
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
        return new WrapResponsesData(service.put(id, entity)).success();
    }

    @PostMapping("/save")
    public Object save(@RequestBody ApplicationVO app) throws Exception {
        ApplicationEntity entity;
        try {
            entity = ApplicationEntity.builder()
                    .name(app.getName())
                    .gitRepository(app.getGitRepository())
                    .gitBranchName(app.getGitBranchName())
                    .agentHost(app.getAgentHost())
                    .artifactRule(app.getArtifactRule())
                    .build();
        } catch (NullPointerException e) {
            throw new Exception("missing params", e);
        }
        return new WrapResponsesData(service.save(entity)).success();
    }
}
