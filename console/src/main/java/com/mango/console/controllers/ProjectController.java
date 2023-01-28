package com.mango.console.controllers;

import com.mango.console.annotations.LoggerMg;
import com.mango.console.components.GitlabCliProject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
    public ModelAndView getRepos() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("projects");
        return modelAndView;
    }

    @GetMapping("/api/v1/user/projects")
    @LoggerMg(description = "请求项目列表")
    public List<String> getReposList() {
        return gitlabCliProject.listUserProjects();
    }
}
