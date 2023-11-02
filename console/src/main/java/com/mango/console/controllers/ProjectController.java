package com.mango.console.controllers;

import com.mango.console.common.Utils;
import com.mango.console.common.WrapResponsesData;
import com.mango.console.entities.Project;
import com.mango.console.sqls.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Objects;

@RestController
@RequestMapping("/v1/project")
public class ProjectController {
    @Autowired
    ProjectService projectService;
    @PostMapping("/create")
    public Object create(@RequestBody ProjectArgs args) throws Exception {
        if (Objects.isNull(args.getName()) || Objects.isNull(args.getPath())) {
            throw new Exception("No empty name or path");
        }
        Project project = new Project();
        project.setName(args.getName());
        project.setPath(args.getPath());
        project.setCreatedAt(java.sql.Timestamp.valueOf(Utils.getLocalDateTime()));
        projectService.insertProject(project);
        return new WrapResponsesData(project).success();
    }
}
