package com.mango.console.controllers.task;

import com.mango.console.common.WrapResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/v1/task")
public class TaskController {
    @Autowired
    private TaskService service;

    @GetMapping("/all")
    public ResponseEntity getAll() throws Exception {
        List<TaskEntity> tasks = service.getAll();
        return ResponseEntity.ok(new WrapResponse<>(tasks).success());
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("id should not null");
        }
        TaskEntity task = service.get(id);
        return ResponseEntity.ok(new WrapResponse<>(task).success());
    }

    @PostMapping("/create")
    public ResponseEntity save(@RequestBody TaskVO task) throws Exception {
        TaskEntity entity = TaskEntity.builder()
                .name(task.getName())
                .command(task.getCommand())
                .sourceType(task.getSourceType())
                .build();
        service.save(entity);
        return ResponseEntity.ok(new WrapResponse<>(task).success());
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody TaskVO task) throws Exception {
        if (Objects.isNull(task.getId())) {
            throw new Exception("id should not null");
        }
        return ResponseEntity.ok(new WrapResponse<>(service.update(task)).success());
    }
}
