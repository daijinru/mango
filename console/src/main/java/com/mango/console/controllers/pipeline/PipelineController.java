package com.mango.console.controllers.pipeline;

import com.mango.console.common.Utils;
import com.mango.console.common.WrapResponse;
import com.mango.console.controllers.task.TaskEntity;
import com.mango.console.controllers.task.TaskVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/v1/pipeline")
public class PipelineController {
    @Autowired
    private PipelineService service;

    @GetMapping("{id}")
    public ResponseEntity getById(Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("id should not null");
        }
        PipelineEntity pipeline = service.get(id);
        WrapResponse<PipelineEntity> wrapResponse = new WrapResponse<>(pipeline);
        return ResponseEntity.ok(wrapResponse.success());
    }

    @GetMapping("/application/{id}/all")
    public ResponseEntity getAll(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("id should not null");
        }
        List<PipelineEntity> pipelines = service.getAll(id);
        return ResponseEntity.ok(new WrapResponse<>(pipelines).success());
    }

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody PipelineVO args) throws Exception {
        if (args.getTasks() == null) return ResponseEntity.ok(new WrapResponse<>(null).error("tasks should not null"));
        List<TaskEntity> tasks = new ArrayList<>();
        for (TaskVO taskVO : args.getTasks()) {
            TaskEntity task = new TaskEntity();
            Utils.copyNonNullProperties(task, taskVO);
            tasks.add(task);
        }
        PipelineEntity pipeline = service.create(args.getApplicationId(), tasks);
        return ResponseEntity.ok(new WrapResponse<>(pipeline).success());
    }

    @GetMapping("/{id}/stdout")
    public ResponseEntity getStdout(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("id should not null");
        }
        PipelineEntity pipeline = service.getStdout(id);
        return ResponseEntity.ok(new WrapResponse<>(pipeline).success());
    }

    @GetMapping("/callback/{id}")
    public ResponseEntity callback(@PathVariable Long id, @RequestParam Map<String, String> args) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception(("No empty callback args: pipeId"));
        }
        PipelineEntity pipeline = service.callback(id, args);
        return ResponseEntity.ok(new WrapResponse<>(pipeline).success());
    }
}
