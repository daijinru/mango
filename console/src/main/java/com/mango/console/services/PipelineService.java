package com.mango.console.services;

import com.mango.console.common.Utils;
import com.mango.console.runner.RunnerHttp;
import com.mango.console.runner.RunnerMethods;
import com.mango.console.runner.RunnerParamsBuilder;
import com.mango.console.runner.RunnerReply;
import com.mango.console.services.dao.AgentRepo;
import com.mango.console.services.dao.PipelineRepo;
import com.mango.console.services.dao.ProjectRepo;
import com.mango.console.services.entity.Agent;
import com.mango.console.services.entity.Pipeline;
import com.mango.console.services.entity.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class PipelineService {
    @Autowired
    private PipelineRepo pipelineRepo;
    @Autowired
    private ProjectRepo projectRepo;
    @Autowired
    private AgentRepo agentRepo;

    public List<Pipeline> getPipelinesByProjectId(Long projectId) {
        Pipeline pipeline = new Pipeline();
        pipeline.setProjectId(projectId);
        return pipelineRepo.findByProjectId(projectId);
    }

    @Transactional
    public Object create(Long projectId) {
        Project project = Optional.ofNullable(
                projectRepo.findById(projectId)
        ).get().orElseGet(() -> null);

        if (Objects.nonNull(project)) {
            Long pid = project.getId();
            String name = project.getName();
            String path = project.getPath();

            Agent agent = Optional.ofNullable(
                    agentRepo.findById(project.getAgentId())
            ).get().orElseGet(() -> new Agent());
            System.out.println("agent: " + agent);
            RunnerParamsBuilder paramsBuilder = new RunnerParamsBuilder()
                    .method("POST")
                    .baseUrl(agent.getBaseUrl())
                    .tag(name)
                    .path(path);
            RunnerReply reply = RunnerHttp.send(RunnerMethods.PIPELINE_CREATE, paramsBuilder);
            System.out.println("reply: " + reply);
            Pipeline pipeline = new Pipeline();
            if (Objects.nonNull(reply) && reply.getStatus().equalsIgnoreCase("success")) {
                pipeline.setProjectId(pid);
                pipeline.setCreatedAt(Utils.getLocalDateTime());
                pipeline.setStatus((short)0);
                pipeline.setFilename(reply.getMessage());
                pipelineRepo.save(pipeline);
                return pipeline;
            } else {
                return reply;
            }
        }
        return null;
    }

    public RunnerReply running(Long projectId) {
        Project project = Optional.ofNullable(
                projectRepo.findById(projectId)
        ).get().orElseGet(() -> null);
        if (Objects.nonNull(project)) {
            String name = project.getName();
            String path = project.getPath();
            Agent agent = Optional.ofNullable(
                    agentRepo.findById(project.getAgentId())
            ).get().orElseGet(() -> new Agent());
            RunnerParamsBuilder paramsBuilder = new RunnerParamsBuilder()
                    .method("POST")
                    .tag(name)
                    .baseUrl(agent.getBaseUrl())
                    .path(path);
            RunnerReply reply = RunnerHttp.send(RunnerMethods.PIPELINE_STATUS, paramsBuilder);
            return reply;
        }
        return null;
    }

    public RunnerReply stdout(Long projectId, String filename) {
        Project project = Optional.ofNullable(
                projectRepo.findById(projectId)
        ).get().orElseGet(() -> null);
        if (Objects.nonNull(project)) {
            String path = project.getPath();
            Agent agent = Optional.ofNullable(
                    agentRepo.findById(project.getAgentId())
            ).get().orElseGet(() -> new Agent());
            RunnerParamsBuilder paramsBuilder = new RunnerParamsBuilder()
                    .method("POST")
                    .path(path)
                    .baseUrl(agent.getBaseUrl())
                    .filename(filename + ".txt");
            RunnerReply reply = RunnerHttp.send(RunnerMethods.PIPELINE_STDOUT, paramsBuilder);
            return reply;
        }
        return null;
    }

    public Pipeline pipeline(Long id) {
        return Optional.ofNullable(
                pipelineRepo.findById(id)
        ).get().orElseGet(() -> null);
    }
}


