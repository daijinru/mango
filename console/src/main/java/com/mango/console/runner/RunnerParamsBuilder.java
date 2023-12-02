package com.mango.console.runner;

import lombok.Data;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

@Data
public class RunnerParamsBuilder {
    private String method;
    private String tag;
    private String path;
    private String filename;
    private String baseUrl;
    private String callback;

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

    public RunnerParamsBuilder callback(String callbackUrl) throws UnsupportedEncodingException {
        try {
            this.callback = URLEncoder.encode(callbackUrl, "UTF-8");
        } catch (Exception e) {
            throw e;
        }
        return this;
    }
}
