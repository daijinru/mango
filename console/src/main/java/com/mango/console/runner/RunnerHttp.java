package com.mango.console.runner;

import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mango.console.runner.endpoint.RunnerEndpoint;
import com.mango.console.runner.params.ParamsStrategy;
import com.mango.console.runner.params.RunnerBaseParams;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RunnerHttp {

    public static <T extends RunnerBaseParams & ParamsStrategy> RunnerReply send(RunnerEndpoint endpoint, T passingParams) {
        List<NameValuePair> params = passingParams.returnParams();
        RunnerReply reply = new RunnerReply();
        HttpClient httpClient = HttpClientBuilder.create().build();
        String url = endpoint.getEndpoint();
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
                reply.setData(null);
            }
            return reply;
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
  }
}
