package com.mango.console.runner;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class HttpMangoRunner {

  public static RunnerResponse send(RunnerEndpointEnum endpoint, RunnerParamsBuilder paramsBuilder) {
    String method = paramsBuilder.getMethod();
    String tag = paramsBuilder.getTag();
    String path = paramsBuilder.getPath();

    String url = "http://localhost:1234" + endpoint.getEndpoint();

    HttpClient httpClient = HttpClientBuilder.create().build();

    if (method.equalsIgnoreCase("POST")) {
        HttpPost httpPost = new HttpPost(url);

        List<NameValuePair> params = new ArrayList<>();
        params.add(new BasicNameValuePair("tag", tag));
        params.add(new BasicNameValuePair("path", path));

        try {
            httpPost.setEntity(new UrlEncodedFormEntity(params));

            HttpResponse response = httpClient.execute(httpPost);
            HttpEntity entity = response.getEntity();
            String content = EntityUtils.toString(entity);
            return new RunnerResponse(content);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    return null;
  }
}
