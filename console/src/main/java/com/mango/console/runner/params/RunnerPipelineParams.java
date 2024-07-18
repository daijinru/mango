package com.mango.console.runner.params;

import lombok.Builder;
import lombok.Data;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class RunnerPipelineParams extends RunnerBaseParams implements ParamsStrategy {
    private String name;
    /**
     * the passing command text remotely, running in linux bash
     */
    private String command;
    /**
     * a text to store console print, which creating after pipeline executed by each application
     */
    private String filename;
    private String callbackUrl;
    public List returnParams() {
        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("name", name));
        params.add(new BasicNameValuePair("command", command));
        params.add(new BasicNameValuePair("filename", filename));
        return params;
    }
}
