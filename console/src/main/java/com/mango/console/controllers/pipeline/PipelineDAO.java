package com.mango.console.controllers.pipeline;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PipelineDAO extends JpaRepository<PipelineEntity, Long> {
    List<PipelineEntity> findByApplicationId(Long applicationId);
}
