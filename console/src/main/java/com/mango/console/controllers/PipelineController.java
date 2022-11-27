package com.mango.console.controllers;

import com.mango.console.components.GitlabCliCmder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.thymeleaf.util.StringUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Controller
@RestController
public class PipelineController {
    @Resource
    GitlabCliCmder gitlabCliCmder;

    @RequestMapping("/pipelines")
    public ModelAndView getPipeline() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("pipeline");
        return modelAndView;
    }
    @RequestMapping("/projects")
    public ModelAndView getRepos() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("projects");
        return modelAndView;
    }

    @GetMapping("/api/v1/user/projects")
    public List<String> getReposList() {
        return gitlabCliCmder.listUserProjects();
    }

    @GetMapping("/api/v1/user/{pid}/pipelines")
    public List<String> getPipelines(@PathVariable("pid") String repoId) throws Exception  {
        if (Objects.isNull(repoId) || StringUtils.equals(repoId, "undefined")) {
            throw new Exception("No empty pid");
        }
        return gitlabCliCmder.listUserPipelinesByProjectId(repoId);
    }
 }
