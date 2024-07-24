package com.mango.console.controllers.artifact;

import com.mango.console.common.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArtifactService {
    @Autowired
    private ArtifactDAO dao;

    public ArtifactEntity get(Long id) {
        return Optional.of(
                dao.findById(id)
        ).get().orElseGet(() -> null);
    }

    public List<ArtifactEntity> findByApplicationId(Long id) {
        return dao.findByApplicationId(id);
    }

    public List<ArtifactEntity> findByPipelineId(Long id) {
        return dao.findByPipelineId(id);
    }

    public List<ArtifactEntity> getAll() {
        return dao.findAll();
    }

    public ArtifactEntity create(ArtifactEntity entity) {
        entity.setCreatedAt(Utils.getLocalDateTime());
        return dao.save(entity);
    }

    public ArtifactEntity update(ArtifactVO vo) throws Exception {
        ArtifactEntity entity = dao
                .findById(vo.getId())
                .orElseThrow(() -> new RuntimeException("artifact service: artifact not found"));
        Utils.copyNonNullProperties(entity, vo);
        entity.setUpdatedAt(Utils.getLocalDateTime());
        return dao.save(entity);
    }
}
