package com.mango.console.controllers.artifact;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ArtifactVO {
    private Long id;
    private String name;
    private String version;
    private String artifactPath;
    private Long applicationId;
    private Long pipelineId;
}
