package com.mango.console.controllers.pipeline;

import com.mango.console.common.WrapResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/all")
    public ResponseEntity getAll() throws Exception {
        List<PipelineEntity> pipelines = service.getAll();
        return ResponseEntity.ok(new WrapResponse<>(pipelines).success());
    }

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody PipelineVO args) throws Exception {
        PipelineEntity pipeline = service.create(args.getAppId(), args.getCommands());
        return ResponseEntity.ok(new WrapResponse<>(pipeline).success());
    }

    @PostMapping("/{pipelineId}/stdout")
    public ResponseEntity getStdout(@PathVariable Long id) throws Exception {
        return null;
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
