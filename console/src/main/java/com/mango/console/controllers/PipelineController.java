package com.mango.console.controllers;

import com.mango.console.common.WrapResponsesData;
import com.mango.console.runner.RunnerHttp;
import com.mango.console.runner.RunnerMethods;
import com.mango.console.runner.RunnerParamsBuilder;
import com.mango.console.runner.RunnerReply;

import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/v1/pipeline")
public class PipelineController {

    @PostMapping("/create")
    public Object create(@RequestBody PipelineArgs args) throws Exception {
        if (Objects.isNull(args.getTag()) || Objects.isNull(args.getPath())) {
            throw new Exception("No empty tag or path");
        }
        RunnerParamsBuilder paramsBuilder = new RunnerParamsBuilder()
                .method("POST")
                .tag(args.getTag())
                .path(args.getPath());
        RunnerReply reply = RunnerHttp.send(RunnerMethods.PIPELINE_CREATE, paramsBuilder);
        return new WrapResponsesData(reply.getContent()).success();
    }

    @PostMapping("status")
    public Object status(@RequestBody PipelineArgs args) throws Exception {
        if (Objects.isNull(args.getTag()) || Objects.isNull(args.getPath())) {
            throw new Exception("No empty tag or path");
        }
        RunnerParamsBuilder paramsBuilder = new RunnerParamsBuilder()
                .method("POST")
                .path(args.getPath())
                .tag(args.getTag());
        RunnerReply reply = RunnerHttp.send(RunnerMethods.PIPELINE_STATUS, paramsBuilder);
        return new WrapResponsesData(reply.getContent()).success();
    }

    @PostMapping("stdout")
    public Object stdout(@RequestBody PipelineArgs args) throws Exception {
        if (Objects.isNull(args.getFilename()) || Objects.isNull(args.getPath())) {
            throw new Exception("No empty filename or path");
        }
        RunnerParamsBuilder paramsBuilder = new RunnerParamsBuilder()
                .method("POST")
                .path(args.getPath())
                .filename(args.getFilename());
        RunnerReply reply = RunnerHttp.send(RunnerMethods.PIPELINE_STDOUT, paramsBuilder);
        return new WrapResponsesData(reply.getContent()).success();
    }

    @PostMapping("list")
    public WrapResponsesData list(@RequestBody PipelineArgs args) throws Exception {
        if (Objects.isNull(args.getTag()) || Objects.isNull(args.getPath())) {
            throw new Exception("No empty tag or path");
        }
        RunnerParamsBuilder paramsBuilder = new RunnerParamsBuilder()
                .method("POST")
                .path(args.getPath())
                .tag(args.getTag());
        RunnerReply reply = RunnerHttp.send(RunnerMethods.PIPELINE_LIST, paramsBuilder);
        return new WrapResponsesData(reply.getContent()).success();
    }
 }
