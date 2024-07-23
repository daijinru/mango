package com.mango.console.controllers.agent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgentDAO extends JpaRepository<AgentEntity, Long> {
}
