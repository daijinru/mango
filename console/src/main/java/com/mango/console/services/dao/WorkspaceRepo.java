package com.mango.console.services.dao;

import com.mango.console.services.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspaceRepo extends JpaRepository<Workspace, Long> {
}
