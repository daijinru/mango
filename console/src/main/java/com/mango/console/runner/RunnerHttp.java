package com.mango.console.runner;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.databind.ObjectMapper;
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

    public static RunnerReply send(RunnerMethods endpoint, RunnerParamsBuilder paramsBuilder) {
        String method = paramsBuilder.getMethod();
        String tag = paramsBuilder.getTag();
        String path = paramsBuilder.getPath();
        String filename = paramsBuilder.getFilename();
        String agentBaseUrl = paramsBuilder.getBaseUrl();

        RunnerReply reply = new RunnerReply();
        if (Objects.isNull(agentBaseUrl)) {
            reply.setStatus("fail");
            reply.setMessage("there are no agent available");
            return reply;
        }

        String url = agentBaseUrl + endpoint.getEndpoint();

        HttpClient httpClient = HttpClientBuilder.create().build();

        if (method.equalsIgnoreCase("POST")) {
            HttpPost httpPost = new HttpPost(url);

            List<NameValuePair> params = new ArrayList<>();
            params.add(new BasicNameValuePair("tag", tag));
            params.add(new BasicNameValuePair("path", path));
            params.add(new BasicNameValuePair("filename", filename));

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
        }

        return null;
  }
}
