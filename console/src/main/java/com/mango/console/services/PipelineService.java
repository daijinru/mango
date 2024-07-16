package com.mango.console.services;

import com.mango.console.common.Utils;
import com.mango.console.runner.RunnerHttp;
import com.mango.console.runner.RunnerMethods;
import com.mango.console.runner.RunnerReply;
import com.mango.console.services.dao.AgentRepo;
import com.mango.console.services.dao.PipelineRepo;
import com.mango.console.services.dao.ProjectRepo;
import com.mango.console.services.dao.WorkgroupRepo;
import com.mango.console.services.entity.Agent;
import com.mango.console.services.entity.Pipeline;
import com.mango.console.services.entity.Project;
import com.mango.console.services.entity.Workgroup;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class PipelineService {
    @Resource
    private PipelineRepo pipelineRepo;
    @Resource
    private ProjectRepo projectRepo;
    @Resource
    private AgentRepo agentRepo;
    @Resource
    private WorkgroupRepo workgroupRepo;

    @Value("${config.services.address}")
    private String baseURL;

    public List<Pipeline> getPipelinesByProjectId(Long id) {
        return pipelineRepo.findByProjectId(id);
    }

    @Transactional
    public Object create(Long projectId) {
        Project project = Optional.of(
                projectRepo.findById(projectId)
        ).get().orElseGet(() -> null);
        if (Objects.isNull(project)) return null;
        // common configuration of the workgroup
        Workgroup workgroup = Optional.ofNullable(
            workgroupRepo.findById(project.getId())
        ).get().orElseGet(() -> null);
        if (Objects.isNull(workgroup)) return null;

        Long pid = project.getId();
        Pipeline pipe = new Pipeline();
        // pipelines should be belonged to a project
        pipe.setProjectId(pid);
        pipe.setCreatedAt(Utils.getLocalDateTime());
        pipe.setStatus((short)0);
        pipe.setAgentId(workgroup.getAgentId());
        pipelineRepo.save(pipe);

        Agent agent = Optional.of(
                agentRepo.findById(workgroup.getAgentId())
        ).get().orElseGet(() -> null);
        if (Objects.isNull(agent)) return null;

        // after the task completed, executor will tell here a callback
        String callbackURL = Utils.encodeURL(
                baseURL,
                "pipeId=" + pipe.getId()
        );
        RunnerPipelineParams paramsBuilder = new RunnerPipelineParams()
                .method("POST")
                .baseUrl(agent.getBaseUrl())
                .tag(project.getName())
                .path(project.getRepository())
                .callbackUrl(callbackURL);
        RunnerReply reply = RunnerHttp.send(RunnerMethods.PIPELINE_CREATE, paramsBuilder);
        System.out.println("reply: " + reply);

        if (Objects.nonNull(reply) && reply.getStatus().equalsIgnoreCase("success")) {
            pipe.setFilename(reply.getMessage());
            pipe.setCallbackUrl(callbackURL);
            pipelineRepo.save(pipe);
            return pipe;
        } else {
            return reply;
        }
    }

    public RunnerReply stdout(Long pipelineId, Number start) {
        Pipeline pipe = Optional.ofNullable(
                pipelineRepo.findById(pipelineId)
        ).get().orElseGet(() -> null);
        if (Objects.isNull(pipe)) return null;
        Agent agent = Optional.ofNullable(
                agentRepo.findById(pipe.getAgentId())
        ).get().orElseGet(() -> null);
        if (Objects.isNull(agent)) return null;
        RunnerPipelineParams paramsBuilder = new RunnerPipelineParams()
                .method("POST")
                .filename(pipe.getFilename())
                .baseUrl(agent.getBaseUrl());
        RunnerReply reply = RunnerHttp.send(RunnerMethods.PIPELINE_STDOUT, paramsBuilder);
        if (Objects.nonNull(reply)) return reply;
        return null;
    }

    public Pipeline pipeline(Long id) {
        return Optional.ofNullable(
                pipelineRepo.findById(id)
        ).get().orElseGet(() -> null);
    }

    public Pipeline callback(Map<String, String> args) throws Exception {
        Pipeline pipe = Optional.of(
                pipelineRepo.findById(Long.valueOf(args.get("pipeId")))
        ).get().orElseGet(() -> null);
        if (Objects.nonNull(pipe)) {
            if (args.get("startTime") != null) {
                pipe.setStartTime(Utils.convertToTimestamp(args.get("startTime"), ""));
            }
            if (args.get("endTime") != null) {
                pipe.setEndTime(Utils.convertToTimestamp(args.get("endTime"), ""));
            }
            if (args.get("status") != null) {
                pipe.setStatus(Short.valueOf(args.get("status")));
            }
            pipelineRepo.save(pipe);
        }
        return pipe;
    }
}


