package com.mango.console.controllers;

import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.Map;

@Builder
@AllArgsConstructor
public class PipelineCallbackArgs {
    private String agtId;
    private String pipeId;
    /**
     * completed or not of the pipeline
     */
    private String status;
    private String endTime;

    private static PipelineCallbackArgs mapArgsToCallbackArgs(Map<String, String> args) {
        return PipelineCallbackArgs.builder()
                .agtId(args.get("agtId"))
                .pipeId(args.get("pipeId"))
                .status(args.get("status"))
                .endTime(args.get("endTime"))
                .build();
    }
}
