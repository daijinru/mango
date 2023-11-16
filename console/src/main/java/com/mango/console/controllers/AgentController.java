package com.mango.console.controllers;

import com.mango.console.common.WrapResponsesData;
import com.mango.console.services.AgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/v1/agent")
public class AgentController {
    @Autowired
    private AgentService agentService;

    @GetMapping("{id}")
    public Object agent(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("No empty id");
        }
        return new WrapResponsesData(agentService.agent(id)).success();
    }

    @PostMapping("{id}/status")
    public Object status(@PathVariable String id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("No empty id");
        }
        return new WrapResponsesData(agentService.status(Long.parseLong(id))).success();
    }

    @GetMapping("/all")
    public Object agents() throws Exception {
        return new WrapResponsesData(agentService.listAgents()).success();
    }

    @PostMapping("/create")
    public Object create(@RequestBody AgentArgs args) throws Exception {
        if (Objects.isNull(args.getBaseUrl())) {
            throw new Exception("No empty baseUrl");
        }
        return new WrapResponsesData(agentService.create(args)).success();
    }
}
