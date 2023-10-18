package com.mango.console.runner;

public class RunnerParamsBuilder {
    private String method;
    private String tag;
    private String path;

    public RunnerParamsBuilder() {
    }

    public RunnerParamsBuilder method(String method) {
        this.method = method;
        return this;
    }

    public RunnerParamsBuilder tag(String tag) {
        this.tag = tag;
        return this;
    }

    public RunnerParamsBuilder path(String path) {
        this.path = path;
        return this;
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
}
