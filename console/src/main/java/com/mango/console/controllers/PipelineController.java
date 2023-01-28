package com.mango.console.controllers;

import com.mango.console.components.GitlabCliPipeline;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.thymeleaf.util.StringUtils;

import javax.annotation.Resource;
import java.util.List;
import java.util.Objects;

@Controller
@RestController
public class PipelineController {
    @Resource
    GitlabCliPipeline gitlabCliPipeline;

    @RequestMapping("/pipelines")
    public ModelAndView getPipeline() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("pipeline");
        return modelAndView;
    }

    @GetMapping("/api/v1/user/{pid}/pipelines")
    public List<String> getPipelines(@PathVariable("pid") String repoId) throws Exception  {
        if (Objects.isNull(repoId) || StringUtils.equals(repoId, "undefined")) {
            throw new Exception("No empty pid");
        }
        return gitlabCliPipeline.listUserPipelinesByProjectId(repoId);
    }

    @PostMapping("/api/v1/user/pipeline")
    public List<String> createPipeline(@RequestBody CreatePipelineOption option) throws Exception {
        if (Objects.isNull(option.getRef()) || Objects.isNull(option.getPid())) {
            throw new Exception("No empty ref or pid");
        }
        return gitlabCliPipeline.createUserPipeline(option.getPid(), option.getRef());
    }
 }
