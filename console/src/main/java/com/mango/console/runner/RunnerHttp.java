package com.mango.console.runner;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
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

    @Autowired
    public void setEnvironment(Environment environment) {
        RunnerHttp.environment = environment;
    }

    public static RunnerReply send(RunnerMethods endpoint, RunnerParamsBuilder paramsBuilder) {
        String method = paramsBuilder.getMethod();
        String tag = paramsBuilder.getTag();
        String path = paramsBuilder.getPath();
        String filename = paramsBuilder.getFilename();

        String baseURL = environment.getProperty("mango.runner.baseURL");
        String url = baseURL + endpoint.getEndpoint();

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
                RunnerReply reply = new RunnerReply();
                if (statusCode == HttpStatus.SC_OK) {
                    ObjectMapper objectMapper = new ObjectMapper();
                    reply = objectMapper.readValue(content, RunnerReply.class);
                } else {
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
