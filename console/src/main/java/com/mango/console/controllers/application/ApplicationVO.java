package com.mango.console.controllers.application;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ApplicationVO {
    private Long id;
    private String name;
    private String gitRepository;
    private String gitBranchName;
    private String agentHost;
    private String artifactRule;
}
