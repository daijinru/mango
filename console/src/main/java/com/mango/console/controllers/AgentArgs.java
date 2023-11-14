package com.mango.console.controllers;

import lombok.Data;

@Data
public class AgentArgs {
    private Long id;
    private String baseUrl;
    private String token;
}
