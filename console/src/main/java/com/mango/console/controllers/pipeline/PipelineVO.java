package com.mango.console.controllers.pipeline;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class PipelineVO {
    private Long id;
    private Short status;
    private Long artifactId;
    private Timestamp startTime;
    private String stdout;
}
