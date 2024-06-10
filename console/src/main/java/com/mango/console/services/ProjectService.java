package com.mango.console.services;

import com.mango.console.common.Utils;
import com.mango.console.controllers.ProjectArgs;
import com.mango.console.services.dao.ProjectRepo;
import com.mango.console.services.entity.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepo repo;

    public Project get(Long id) {
        return Optional.ofNullable(
                repo.findById(id)
        ).get().orElseGet(() -> null);
    }

    public Project create(ProjectArgs args) {
        Project project = new Project();
        project.setName(args.getName());
        project.setRepository(args.getRepository());
        project.setGroupId(args.getGroupId());
        return repo.save(project);
    }

    public Project update(ProjectArgs args) {
        Project project = repo.findById(args.getId())
                .orElseThrow(() -> new IllegalArgumentException("project not found"));
        Optional.ofNullable(args.getName()).ifPresent(project::setName);
        Optional.ofNullable(args.getRepository()).ifPresent(project::setRepository);
        Optional.ofNullable(args.getGroupId()).ifPresent(project::setGroupId);
        return repo.save(project);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Project> listProjectByGroupId(Long id) {
        return repo.findByGroupId(id);
    }
}
