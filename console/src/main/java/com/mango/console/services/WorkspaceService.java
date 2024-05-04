package com.mango.console.services;

import com.mango.console.controllers.WorkspaceArgs;
import com.mango.console.services.dao.WorkspaceRepo;
import com.mango.console.services.entity.Workspace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WorkspaceService {
    @Autowired
    private WorkspaceRepo repo;

    public Workspace group(Long id) {
        return Optional.ofNullable(
                repo.findById(id)
        ).get().orElseGet(() -> null);
    }

    public Workspace create(WorkspaceArgs args) {
        Workspace group = new Workspace();
        group.setName(args.getName());
        group.setHost(args.getHost());
        group.setAgentHost(args.getAgentHost());
        repo.save(group);
        return group;
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
