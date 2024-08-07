package com.mango.console.controllers.agent;

import com.mango.console.common.WrapResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/v1/agent")
public class AgentController {
    @Autowired
    private AgentService service;

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("id should not null");
        }
        AgentEntity agent = service.get(id);
        WrapResponse<AgentEntity> wrapResponse = new WrapResponse<>(agent);
        return ResponseEntity.ok(wrapResponse.success());
    }

    @GetMapping("/all")
    public ResponseEntity getAll() throws Exception {
        List<AgentEntity> agents = service.getAll();
        return ResponseEntity.ok(new WrapResponse<>(agents).success());
    }

    @PostMapping("/save")
    public ResponseEntity save(@RequestBody AgentVO vo) throws Exception {
        AgentEntity agent = AgentEntity.builder()
                .agentHost(vo.getAgentHost())
                .name(vo.getName())
                .build();
        return ResponseEntity.ok(new WrapResponse<>(service.save(agent)).success());
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody AgentVO vo) throws Exception {
        if (Objects.isNull(vo.getId())) {
            throw new Exception("id should not null");
        }
        AgentEntity entity = service.update(vo);
        return ResponseEntity.ok(new WrapResponse<>(entity).success());
    }

    @GetMapping("/{id}/monitor")
    public ResponseEntity monitorById(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Error("id should not null");
        }
        String reply = service.getMonitor(id, "5");
        return ResponseEntity.ok(new WrapResponse<>(reply).success());
    }

    @GetMapping("/{id}/delete")
    public ResponseEntity deleteById(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Error("id should not null");
        }
        service.delete(id);
        return ResponseEntity.ok(new WrapResponse<>(id).success());
    }
}
