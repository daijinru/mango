package com.mango.console.services.dao;

import com.mango.console.services.entity.Pipeline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PipelineRepo extends JpaRepository<Pipeline, Long>, JpaSpecificationExecutor<Pipeline> {
    List<Pipeline> findByProjectId(Long projectId);
}
