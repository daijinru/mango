package com.mango.console.controllers.task;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TaskVO {
    private Long id;
    private String name;
    private String command;
    private String sourceType;
}
