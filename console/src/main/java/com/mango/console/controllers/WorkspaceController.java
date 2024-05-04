package com.mango.console.controllers;

import com.mango.console.common.WrapResponsesData;
import com.mango.console.services.WorkspaceService;
import com.mango.console.services.entity.Workspace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/v1/group")
public class WorkspaceController {

    @Autowired
    private WorkspaceService service;

    @GetMapping("/{id}")
    public Object group(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("no empty id");
        }
        Workspace group = service.group(id);
        return new WrapResponsesData(group).success();
    }

    @PostMapping("/create")
    public Object create(@RequestBody WorkspaceArgs args) throws Exception {
        Object group = service.create(args);
        if (Objects.isNull(group)) {
            return new WrapResponsesData().success().message("Failed to create group");
        }
        return new WrapResponsesData(group).success();
    }


}
