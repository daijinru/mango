package com.mango.console.runner;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mango.console.runner.params.ParamsStrategy;
import com.mango.console.runner.params.RunnerBaseParams;
import com.mango.console.runner.params.RunnerGitParams;
import com.mango.console.services.AgentService;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class RunnerHttp {
    private static Environment environment;
    private static AgentService agentService;

    @Autowired
    public void setEnvironment(Environment environment) {
        RunnerHttp.environment = environment;
    }
    @Autowired
    public void setAgentService(AgentService agentService) {
        RunnerHttp.agentService = agentService;
    }

    public static <T extends RunnerBaseParams & ParamsStrategy> RunnerReply send(RunnerMethods endpoint, T passingParams) {
        List<NameValuePair> params = passingParams.returnParams();
        RunnerReply reply = new RunnerReply();
        HttpClient httpClient = HttpClientBuilder.create().build();
        // TODO get (dynamic) agent url as BaseUrl here
        String url = "http://localhost:1234" + endpoint.getEndpoint();
        HttpPost httpPost = new HttpPost(url);

        try {
            httpPost.setEntity(new UrlEncodedFormEntity(params));

            HttpResponse response = httpClient.execute(httpPost);

            int statusCode = response.getStatusLine().getStatusCode();
            HttpEntity entity = response.getEntity();
            String content = EntityUtils.toString(entity);
            if (statusCode == HttpStatus.SC_OK) {
                ObjectMapper objectMapper = new ObjectMapper();
                reply = objectMapper.readValue(content, RunnerReply.class);
            } else {
                /**
                 * if returned incorrect, return the status code and message from runner.
                 */
                reply.setStatus(Integer.toString(statusCode));
                reply.setMessage(content);
            }
            return reply;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
  }
}
