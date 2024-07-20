package com.mango.console.controllers.application;

import com.mango.console.common.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationDAO dao;

    public List<ApplicationEntity> getAll() {
        return dao.findAll();
    }

    public ApplicationEntity update(Long id, ApplicationEntity entity) {
        ApplicationEntity result = dao
                .findById(id)
                .orElseThrow(() -> new RuntimeException("application service: application not found"));
        result.setId(id);
        result.setName(entity.getName());
        result.setAgentHost(entity.getAgentHost());
        result.setArtifactRule(entity.getArtifactRule());
        result.setGitRepository(entity.getGitRepository());
        result.setGitBranchName(entity.getGitBranchName());
        result.setName(entity.getName());
        result.setPwd(entity.getPwd());
        result.setUpdatedAt(Utils.getLocalDateTime());
        return dao.save(result);
    }

    public ApplicationEntity save(ApplicationEntity entity) {
        entity.setCreatedAt(Utils.getLocalDateTime());
        return dao.save(entity);
    }

    public ApplicationEntity get(Long id) {
        return Optional.of(
                dao.findById(id)
        ).get().orElseGet(() -> null);
    }
}
