package com.mango.console.runner.endpoint;

public class RunnerEndpoint {
    private String baseURL;
    private RunnerCalling calling;

    public RunnerEndpoint(String baseURL, RunnerCalling calling) {
        this.baseURL = baseURL;
        this.calling = calling;
    }

    public String getEndpoint() {
        return baseURL + calling.getCalling();
    }
}
