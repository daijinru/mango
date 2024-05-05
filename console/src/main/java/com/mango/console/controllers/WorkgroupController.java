package com.mango.console.controllers;

import com.mango.console.common.WrapResponsesData;
import com.mango.console.services.WorkgroupService;
import com.mango.console.services.entity.Workgroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/v1/group")
public class WorkgroupController {

    @Autowired
    private WorkgroupService service;

    @GetMapping("/{id}")
    public Object group(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("no empty id");
        }
        Workgroup group = service.group(id);
        return new WrapResponsesData(group).success();
    }

    @PostMapping("/create")
    public Object create(@RequestBody WorkgroupArgs args) throws Exception {
        Object group = service.create(args);
        if (Objects.isNull(group)) {
            return new WrapResponsesData().success().message("Failed to create group");
        }
        return new WrapResponsesData(group).success();
    }


}
