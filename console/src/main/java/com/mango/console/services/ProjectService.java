package com.mango.console.services;

import com.mango.console.services.dao.ProjectRepo;
import com.mango.console.services.entity.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepo projectRepo;

    @Transactional
    public void insertProject(Project project) {
        projectRepo.save(project);
    }

    @Transactional
    public void deleteProject(Long id) {
        projectRepo.deleteById(id);
    }

    public List<Project> listProjects() {
        return projectRepo.findAll();
    }

    public Project project(Long id) {
        return Optional.ofNullable(
                projectRepo.findById(id)
        ).get().orElseGet(() -> null);
    }
}
