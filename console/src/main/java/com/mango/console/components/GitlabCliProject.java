package com.mango.console.components;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GitlabCliProject extends GitlabCliCmder {
    public List<String> listUserProjects() {
        String[] cmd = new String[]{CLI, "projects"};
        return execCmd(cmd);
    }
}
