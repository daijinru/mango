package com.mango.console.controllers;

import lombok.Data;

@Data
public class WorkgroupArgs {
    private Long id;
    private String name;
    private String host;
    private Long agentId;
}
