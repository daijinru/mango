package com.mango.console.controllers.agent;

import com.mango.console.common.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AgentService {
    @Autowired
    private AgentDAO agentDAO;

    public AgentEntity get(Long id) {
        return Optional.of(
                agentDAO.findById(id)
        ).get().orElseGet(() -> null);
    }

    public List<AgentEntity> getAll() {
        return agentDAO.findAll();
    }

    public AgentEntity save(AgentEntity entity) {
        entity.setCreatedAt(Utils.getLocalDateTime());
        return agentDAO.save(entity);
    }

    public AgentEntity update(AgentVO vo) throws Exception {
        AgentEntity entity = agentDAO
                .findById(vo.getId())
                .orElseThrow(() -> new RuntimeException("agent service: agent not found"));
        Utils.copyNonNullProperties(entity, vo);
        entity.setUpdatedAt(Utils.getLocalDateTime());
        return agentDAO.save(entity);
    }
}
