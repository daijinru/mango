package com.mango.console.runner.params;

import lombok.Builder;
import lombok.Data;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class RunnerGitParams extends RunnerBaseParams implements ParamsStrategy {
    private String repo;
    private String name;
    private String branch;
    private String user;
    private String pwd;
    private String callbackUrl;
    public List returnParams() {
        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("repo", repo));
        params.add(new BasicNameValuePair("name", name));
        params.add(new BasicNameValuePair("branch", branch));
        params.add(new BasicNameValuePair("user", user));
        params.add(new BasicNameValuePair("pwd", pwd));
        params.add(new BasicNameValuePair("callbackUrl", callbackUrl));
        return params;
    }
}
