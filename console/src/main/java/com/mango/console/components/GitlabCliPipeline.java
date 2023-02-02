package com.mango.console.components;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GitlabCliPipeline extends GitlabCliCmder{
    public List<String> listUserPipelinesByProjectId(String pid) {
        String[] cmd = new String[]{CLI, "pipelines", pid};
        return execCmd(cmd);
    }

    public List<String> createUserPipeline(String pid, String ref) {
        String[] cmd = new String[]{CLI, "pipeline", "create", pid, ref};
        return execCmd(cmd);
    }

    public List<String> getUserProjectPipeline(String pid, String id) {
        String[] cmd = new String[]{CLI, "pipeline", "get", pid, id};
        return execCmd(cmd);
    }
}
