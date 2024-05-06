package com.mango.console.controllers;

import lombok.Data;

@Data
public class ProjectArgs {
    private Long id;
    private String name;
    private String repository;
    private Long groupId;
}
