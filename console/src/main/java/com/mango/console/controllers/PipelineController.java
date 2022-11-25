package com.mango.console.controllers;

import com.mango.console.components.GitlabCliCmder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RestController
public class PipelineController {
    @Resource
    GitlabCliCmder gitlabCliCmder;

    @RequestMapping("/pipeline")
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
    public List<String> getPipelines(@PathVariable("pid") String repoId) {
        return gitlabCliCmder.listUserPipelinesByProjectId(repoId);
    }
 }
