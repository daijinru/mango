package com.mango.console.controllers.artifact;

import com.mango.console.common.WrapResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/v1/artifact")
public class ArtifactController {
    @Autowired
    private ArtifactService service;

    @GetMapping("/all")
    public ResponseEntity getAll() throws Exception {
        List<ArtifactEntity> artifacts = service.getAll();
        return ResponseEntity.ok(new WrapResponse<>(artifacts).success());
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception(("id should not null"));
        }
        ArtifactEntity artifact = service.get(id);
        return ResponseEntity.ok(new WrapResponse<>(artifact).success());
    }

    @PostMapping("/application/{id}/all")
    public ResponseEntity getAllByApplication(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("id should not null");
        }
        List<ArtifactEntity> artifacts = service.findByApplicationId(id);
        return ResponseEntity.ok(new WrapResponse<>(artifacts).success());
    }

    @PostMapping("/pipeline/{id}/all")
    public ResponseEntity getAllByPipeline(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("id should not null");
        }
        List<ArtifactEntity> artifacts = service.findByPipelineId(id);
        return ResponseEntity.ok(new WrapResponse<>(artifacts).success());
    }

    @PostMapping("/update")
    public ResponseEntity update(@RequestBody ArtifactVO vo) throws Exception {
        if (Objects.isNull(vo.getId())) {
            throw new Exception("id should not null");
        }
        return ResponseEntity.ok(new WrapResponse<>(vo).success());
    }
}
