package com.mango.console.controllers.artifact;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArtifactDAO extends JpaRepository<ArtifactEntity, Long> {
    List<ArtifactEntity> findByApplicationId(Long id);
    List<ArtifactEntity> findByPipelineId(Long id);
}
