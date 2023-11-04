package com.mango.console.services;

import com.mango.console.common.Utils;
import com.mango.console.runner.RunnerHttp;
import com.mango.console.runner.RunnerMethods;
import com.mango.console.runner.RunnerParamsBuilder;
import com.mango.console.runner.RunnerReply;
import com.mango.console.services.dao.PipelineRepo;
import com.mango.console.services.dao.ProjectRepo;
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

    @Transactional
    public List<Pipeline> getPipelinesByProjectId(Long projectId) {
        Pipeline pipeline = new Pipeline();
        pipeline.setProjectId(projectId);
        return pipelineRepo.findByProjectId(projectId);
    }

    @Transactional
    public RunnerReply create(Long projectId) {
        Project project = Optional.ofNullable(
                projectRepo.findById(projectId)
        ).get().orElseGet(() -> null);

        if (Objects.nonNull(project)) {
            Long pid = project.getId();

            String name = project.getName();
            String path = project.getPath();
            RunnerParamsBuilder paramsBuilder = new RunnerParamsBuilder()
                    .method("POST")
                    .tag(name)
                    .path(path);
            RunnerReply reply = RunnerHttp.send(RunnerMethods.PIPELINE_CREATE, paramsBuilder);
            if (Objects.nonNull(reply) && reply.getStatus().equalsIgnoreCase("success")) {
                Pipeline pipeline = new Pipeline();
                pipeline.setProjectId(pid);
                pipeline.setCreatedAt(Utils.getLocalDateTime());
                pipeline.setStatus((short)0);
                pipeline.setFilename(reply.getMessage());
                pipelineRepo.save(pipeline);
            }
            return reply;
        }
        return null;
    }
}
