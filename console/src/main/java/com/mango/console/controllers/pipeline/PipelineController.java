package com.mango.console.controllers.pipeline;

import com.mango.console.common.WrapResponse;
import com.mango.console.controllers.task.TaskVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

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

    @GetMapping("/{applicationId}/all")
    public ResponseEntity getAll(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("id should not null");
        }
        List<PipelineEntity> pipelines = service.getAll(id);
        return ResponseEntity.ok(new WrapResponse<>(pipelines).success());
    }

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody PipelineVO args) throws Exception {
        List<TaskVO> tasks = args.getTasks();
        List<String> commands = tasks.stream().map(TaskVO::getCommand).collect(Collectors.toList());
        PipelineEntity pipeline = service.create(args.getAppId(), commands);
        return ResponseEntity.ok(new WrapResponse<>(pipeline).success());
    }

    @PostMapping("/{pipelineId}/stdout")
    public ResponseEntity getStdout(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("id should not null");
        }
        PipelineEntity pipeline = service.getStdout(id);
        return ResponseEntity.ok(new WrapResponse<>(pipeline).success());
    }

    @PostMapping("/callback")
    public ResponseEntity callback(@RequestParam Map<String, String> args) throws Exception {
        if (Objects.isNull(args.get("pipeId"))) {
            throw new Exception(("No empty callback args: pipeId"));
        }
        PipelineEntity pipeline = service.callback(args);
        return ResponseEntity.ok(new WrapResponse<>(pipeline).success());
    }
}
