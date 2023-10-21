package com.mango.console.controllers;

import com.mango.console.runner.RunnerHttp;
import com.mango.console.runner.RunnerEndpointEnum;
import com.mango.console.runner.RunnerParamsBuilder;
import com.mango.console.runner.RunnerReply;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Controller
@RestController
public class PipelineController {

    @PostMapping("/api/v1/pipeline/create")
    public String createPipeline(@RequestBody PipelineRequest request) throws Exception {
        if (Objects.isNull(request.getTag()) || Objects.isNull(request.getPath())) {
            throw new Exception("No empty tag or path");
        }
        RunnerParamsBuilder paramsBuilder = new RunnerParamsBuilder()
            .method("POST")
            .tag(request.getTag())
            .path(request.getPath());
        RunnerReply response = RunnerHttp.send(RunnerEndpointEnum.CREATE_PIPELINE, paramsBuilder);
        return response.getContent();
    }
 }
