package com.mango.console.controllers;

import com.mango.console.annotations.LoggerMg;
import com.mango.console.components.GitlabCliProject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RestController
public class ProjectController {
    @Resource
    GitlabCliProject gitlabCliProject;

    @RequestMapping("/projects")
    @LoggerMg(description = "访问项目列表页面")
    public ModelAndView getProjects() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("projects");
        return modelAndView;
    }

    @GetMapping("/api/v1/user/projects")
    @LoggerMg(description = "请求项目列表")
    public List<String> getProjectList() {
        return gitlabCliProject.listUserProjects();
    }

    @GetMapping("/api/v1/project/{pid}")
    @LoggerMg(description = "请求项目详情")
    public List<String> getProjectInfo(@PathVariable String pid) {
        return gitlabCliProject.getProject(pid);
    }
}
