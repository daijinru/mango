package com.mango.console.controllers.pipeline;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PipelineDAO extends JpaRepository<PipelineEntity, Long> {
}
