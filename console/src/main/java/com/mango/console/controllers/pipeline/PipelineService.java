package com.mango.console.controllers.pipeline;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PipelineService {
    @Autowired
    private PipelineDAO dao;

    public List<PipelineEntity> getAll() {
        return dao.findAll();
    }

    public PipelineEntity create(Long appId, PipelineEntity entity) {
        return null;
    }
}
