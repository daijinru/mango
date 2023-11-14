package com.mango.console.runner;

public class RunnerParamsBuilder {
    private String method;
    private String tag;
    private String path;
    private String filename;
    private String baseUrl;

    public RunnerParamsBuilder() {
    }

    public RunnerParamsBuilder baseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
        return this;
    }

    public RunnerParamsBuilder method(String method) {
        this.method = method;
        return this;
    }

    public RunnerParamsBuilder tag(String tag) {
        this.tag = tag;
        return this;
    }

    public RunnerParamsBuilder filename(String filename) {
        this.filename = filename;
        return this;
    }

    public RunnerParamsBuilder path(String path) {
        this.path = path;
        return this;
    }

    public String getBaseUrl() {
        return baseUrl;
    }
    public String getMethod() {
        return method;
    }

    public String getTag() {
        return tag;
    }

    public String getPath() {
        return path;
    }

    public String getFilename() {
        return filename;
    }
}
