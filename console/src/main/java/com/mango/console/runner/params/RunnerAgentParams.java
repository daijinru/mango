package com.mango.console.runner.params;

import lombok.Builder;
import lombok.Data;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class RunnerAgentParams extends RunnerBaseParams implements ParamsStrategy {
    private String wait;
    public List returnParams() {
        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("wait", wait));
        return params;
    }
}
