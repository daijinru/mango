package com.mango.console.controllers;

import com.mango.console.common.Utils;
import com.mango.console.common.WrapResponsesData;
import com.mango.console.services.PipelineService;
import com.mango.console.services.entity.Pipeline;
import com.mango.console.services.entity.Project;
import com.mango.console.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/v1/project")
public class ProjectController {
    @Autowired
    ProjectService projectService;
    @Autowired
    PipelineService pipelineService;
    @PostMapping("/create")
    public Object create(@RequestBody ProjectArgs args) throws Exception {
        if (Objects.isNull(args.getName()) || Objects.isNull(args.getPath())) {
            throw new Exception("No empty name or path");
        }
        Project project = projectService.insertProject(args.getName(), args.getPath());
        return new WrapResponsesData(project).success();
    }

    @GetMapping("{id}")
    public Object project(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("No empty id");
        }
        Project project = projectService.project(id);
        return new WrapResponsesData(project).success();
    }

    @GetMapping("/{projectId}/pipelines")
    public Object pipelines(@PathVariable("projectId") Long id) {
        List<Pipeline> pipelines = pipelineService.getPipelinesByProjectId(id);
        return new WrapResponsesData(pipelines).success();
    }

    @GetMapping("/all")
    public Object projects() {
        List<Project> projects = projectService.listProjects();
        return new WrapResponsesData(projects).success();
    }
}
