package com.mango.console.controllers;

import com.mango.console.common.Utils;
import com.mango.console.common.WrapResponsesData;
import com.mango.console.runner.RunnerReply;

import com.mango.console.services.PipelineService;
import com.mango.console.services.entity.Pipeline;
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
         Object pipeline = pipelineService.create(args.getPid());
         if (Objects.isNull(pipeline)) {
             return new WrapResponsesData().success().message("Failed to create pipeline: it may be in progress.");
         }
         return new WrapResponsesData(pipeline).success();
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

    @GetMapping("{id}")
    public Object pipeline(@PathVariable Long id) throws Exception {
        if (Objects.isNull(id)) {
            throw new Exception("No empty id");
        }
        Pipeline pipeline = pipelineService.pipeline(id);
        return new WrapResponsesData(pipeline).success();
    }

    @GetMapping("/callback")
    public Object callback(
            @RequestParam("pipeId") String pipeId,
            @RequestParam("status") String status,
            @RequestParam("endTime") String endTime) throws Exception {
        if (Objects.isNull(pipeId) || Objects.isNull(status) || Objects.isNull(endTime)) {
            throw new Exception("No empty callback args: pipeId, status, endTime");
        }
        Pipeline pipe = pipelineService.callback(
                Long.valueOf(pipeId),
                Short.valueOf(status),
                Utils.convertToTimestamp(endTime, "")
        );
        return new WrapResponsesData(pipe).success();
    }
 }
