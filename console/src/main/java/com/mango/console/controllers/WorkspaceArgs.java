package com.mango.console.controllers;

import lombok.Data;

@Data
public class WorkspaceArgs {
    private Long id;
    private String name;
    private String host;
    private String agentHost;
}
