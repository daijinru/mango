package com.mango.console.services;

import com.mango.console.common.Utils;
import com.mango.console.controllers.AgentArgs;
import com.mango.console.runner.RunnerHttp;
import com.mango.console.runner.RunnerMethods;
import com.mango.console.runner.RunnerParamsBuilder;
import com.mango.console.runner.RunnerReply;
import com.mango.console.services.dao.AgentRepo;
import com.mango.console.services.entity.Agent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class AgentService {
    @Autowired
    private AgentRepo agentRepo;

    public Agent agent(Long id) {
        Agent agent = Optional.ofNullable(
                agentRepo.findById(id)
        ).get().orElseGet(() -> null);
        return agent;
    }

    @Transactional
    public Agent create(AgentArgs args) {
        Agent agent = new Agent();
        agent.setBaseUrl(args.getBaseUrl());
        agent.setCreatedAt(Utils.getLocalDateTime());
        agentRepo.save(agent);
        return agent;
    }

    @Transactional
    public void delete(Long id) {
        agentRepo.deleteById(id);
    }

    public boolean status(Long id) {
        Agent agent = Optional.ofNullable(
                agentRepo.findById(id)
        ).get().orElseGet(() -> null);
        if ( Objects.isNull(agent) || Objects.isNull(agent.getBaseUrl())) {
            return false;
        }
        System.out.println(agent);
        RunnerParamsBuilder paramsBuilder = new RunnerParamsBuilder()
                .method("POST")
                .baseUrl(agent.getBaseUrl());
        RunnerReply reply = RunnerHttp.send(RunnerMethods.SERVICE_STATUS, paramsBuilder);
        return Objects.nonNull(reply) && reply.getStatus().equalsIgnoreCase("success");
    }

    public List<Agent> listAgents() {
        return agentRepo.findAll();
    }
}
