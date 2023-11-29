package com.mango.console.controllers;

import lombok.Data;

@Data
public class ArtifactArgs {
    private String filename;
    private Long pipelineId;
    private Long projectId;
    private Long agentId;
    private String version;
}
