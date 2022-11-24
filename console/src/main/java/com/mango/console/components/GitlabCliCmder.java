package com.mango.console.components;

import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.LineNumberReader;
import java.util.ArrayList;
import java.util.List;

@Component
public class GitlabCliCmder {
    public static String cmder;
    static {
        cmder = "gitlab-cli";
    }
    public List<String> execCmd(String[] cmd) {
        List<String> res = new ArrayList<>();
        Process process;
        int exit = 0;
        try {
            process = Runtime.getRuntime().exec(cmd);
            InputStream inputStream = process.getInputStream();
            InputStream inputErrorStream = process.getErrorStream();
            InputStreamReader ir = new InputStreamReader(inputStream);
            InputStreamReader irError = new InputStreamReader(inputErrorStream);

            LineNumberReader input = new LineNumberReader(ir);
            LineNumberReader inputError = new LineNumberReader(irError);
            String line;
            while ((line = input.readLine()) != null) {
                res.add(line);
            }
            while ((line = inputError.readLine()) != null) {
                res.add(line);
            }
            exit = process.waitFor();
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (exit != 0) {
            throw new RuntimeException("[Mango CLI] Runtime Exception: " + res);
        }
        return res;
    }

    public List<String> listUserProjects() {
        String[] cmd = new String[]{cmder, "projects"};
        return execCmd(cmd);
    }

    public List<String> listUserPipelinesByProjectId(String pid) {
        String[] cmd = new String[]{cmder, "pipelines", pid};
        return execCmd(cmd);
    }
}
