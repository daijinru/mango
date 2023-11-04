package com.mango.console.controllers;

import com.mango.console.common.WrapResponsesData;
import com.mango.console.runner.RunnerHttp;
import com.mango.console.runner.RunnerMethods;
import com.mango.console.runner.RunnerParamsBuilder;
import com.mango.console.runner.RunnerReply;

import com.mango.console.services.PipelineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/v1/pipeline")
public class PipelineController {

    @Autowired
    private PipelineService pipelineService;

    @PostMapping("/create")
    public Object create(@RequestBody PipelineArgs args) throws Exception {
         RunnerReply reply = pipelineService.create(args.getPid());
         return new WrapResponsesData(reply).success();
    }

    @PostMapping("/running")
    public Object running(@RequestBody PipelineArgs args) throws Exception {
        RunnerReply reply = pipelineService.running(args.getPid());
        return new WrapResponsesData(reply).success();
    }

    @PostMapping("/stdout")
    public Object stdout(@RequestBody PipelineArgs args) throws Exception {
        RunnerReply reply = pipelineService.stdout(args.getPid(), args.getFilename());
        return new WrapResponsesData(reply).success();
    }
 }
