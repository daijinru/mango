package com.mango.console.controllers;

import com.mango.console.services.ArtifactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/artifact")
public class ArtifactController {
    @Autowired
    private ArtifactService artifactService;

    @PostMapping("/create")
    public Object create(@RequestBody ArtifactArgs args) throws Exception {
        return null;
    }
}
