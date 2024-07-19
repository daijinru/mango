package com.mango.console.controllers.pipeline;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class PipelineVO {
    private Long id;
    /**
     * ID of its owner: Application
     */
    private Long appId;
    private String commands;
}
