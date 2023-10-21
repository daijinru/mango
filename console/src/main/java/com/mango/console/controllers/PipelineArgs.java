package com.mango.console.controllers;

import lombok.Data;

@Data
public class PipelineArgs {
    private String tag;
    private String path;
    private String filename;
}
