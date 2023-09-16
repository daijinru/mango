package com.mango.console.controllers;

import com.mango.console.annotations.LoggerMg;
import com.mango.console.components.GitlabCliPipeline;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Objects;

@Controller
@RestController
public class PipelineController {
    @Resource
    GitlabCliPipeline gitlabCliPipeline;

    @GetMapping("/api/v1/user/{pid}/pipelines")
    @LoggerMg(description = "请求指定项目的流水线列表")
    public List<String> getPipelines(@PathVariable("pid") String repoId) throws Exception  {
        if (Objects.isNull(repoId) || StringUtils.equals(repoId, "undefined")) {
            throw new Exception("No empty pid");
        }
        return gitlabCliPipeline.listUserPipelinesByProjectId(repoId);
    }

    @PostMapping("/api/v1/user/pipeline")
    @LoggerMg(description = "创建指定项目的流水线")
    public List<String> createPipeline(@RequestBody CreatePipelineOption option) throws Exception {
        if (Objects.isNull(option.getRef()) || Objects.isNull(option.getPid())) {
            throw new Exception("No empty ref or pid");
        }
        return gitlabCliPipeline.createUserPipeline(option.getPid(), option.getRef());
    }

    @GetMapping("/api/v1/user/{pid}/pipeline/{id}")
    @LoggerMg(description = "查询指定流水线")
    public List<String> getPipeline(@PathVariable String pid, @PathVariable String id) throws Exception {
        if (Objects.isNull(pid) || Objects.isNull(id)) {
            throw new Exception("No empty pid or id");
        }
        return gitlabCliPipeline.getUserProjectPipeline(pid, id);
    }
 }
