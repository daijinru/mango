package com.mango.console.controllers.pipeline;

import com.mango.console.controllers.task.TaskVO;
import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
public class PipelineVO {
    private Long id;
    /**
     * ID of its owner: Application
     */
    private Long appId;
    private List<TaskVO> tasks;
}
