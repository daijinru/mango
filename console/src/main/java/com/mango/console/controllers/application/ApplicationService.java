package com.mango.console.controllers.application;

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

    public ApplicationEntity put(Long id, ApplicationEntity entity) {
        ApplicationEntity result = dao
                .findById(id)
                .orElseThrow(() -> new RuntimeException("application service: application not found"));
        result.setId(id);
        return dao.save(result);
    }

    public ApplicationEntity save(ApplicationEntity entity) {
        return dao.save(entity);
    }

    public ApplicationEntity get(Long id) {
        return Optional.of(
                dao.findById(id)
        ).get().orElseGet(() -> null);
    }
}
