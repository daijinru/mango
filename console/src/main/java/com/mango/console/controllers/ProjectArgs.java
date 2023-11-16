package com.mango.console.controllers;

import lombok.Data;

@Data
public class ProjectArgs {
    private String name;
    private String path;
    private Long agentId;
}
