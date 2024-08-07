package com.mango.console.controllers.agent;

import com.mango.console.common.Utils;
import com.mango.console.runner.RunnerHttp;
import com.mango.console.runner.RunnerReply;
import com.mango.console.runner.endpoint.RunnerCalling;
import com.mango.console.runner.endpoint.RunnerEndpoint;
import com.mango.console.runner.params.RunnerAgentParams;
import com.mango.console.runner.params.RunnerServiceParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
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

    public void delete(Long id) {
        agentDAO.deleteById(id);
    }

    public String getMonitor(Long id, String wait) {
        AgentEntity agent = agentDAO.findById(id).orElseGet(() -> null);
        if (Objects.isNull(agent)) return null;
        String agentHost = agent.getAgentHost();
        RunnerEndpoint endpoint = new RunnerEndpoint(agentHost, RunnerCalling.SERVICE_MONITOR);
        RunnerAgentParams params = RunnerAgentParams.builder()
                .wait(wait)
                .build();
        RunnerReply reply = RunnerHttp.send(endpoint, params);
        return reply.getData().toString();
    }

    public Boolean getStatus(Long id) {
        AgentEntity agent = agentDAO.findById(id).orElseGet(() -> null);
        if (Objects.isNull(agent)) return false;
        String agentHost = agent.getAgentHost();
        RunnerEndpoint endpoint = new RunnerEndpoint(agentHost, RunnerCalling.SERVICE_STATUS);
        RunnerServiceParams params = new RunnerServiceParams();
        RunnerReply reply = RunnerHttp.send(endpoint, params);
        return reply.getMessage().equals("success");
    }
}
