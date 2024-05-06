package com.mango.console.services.dao;

import com.mango.console.services.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepo extends JpaRepository<Project, Long>, JpaSpecificationExecutor<Project> {
    List<Project> findByGroupId(Long groupId);
}
