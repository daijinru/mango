package com.mango.console.controllers.pipeline;

import com.mango.console.common.Utils;
import com.mango.console.controllers.application.ApplicationDAO;
import com.mango.console.controllers.application.ApplicationEntity;
import com.mango.console.runner.RunnerHttp;
import com.mango.console.runner.RunnerReply;
import com.mango.console.runner.endpoint.RunnerCalling;
import com.mango.console.runner.endpoint.RunnerEndpoint;
import com.mango.console.runner.params.RunnerGitParams;
import com.mango.console.runner.params.RunnerPipelineParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class PipelineService {
    @Autowired
    private PipelineDAO pipelineDAO;
    @Autowired
    private ApplicationDAO applicationDAO;

    @Value("${config.agent.callback}")
    private String callbackBaseURL;

    public List<PipelineEntity> getAll(Long appId) {
        return pipelineDAO.findByApplicationId(appId);
    }

    public Boolean gitClone(ApplicationEntity application) {
        RunnerEndpoint endpoint = new RunnerEndpoint(application.getAgentHost(), RunnerCalling.GIT_CLONE);
        RunnerGitParams params = RunnerGitParams.builder()
                .name(application.getName())
                .repo(application.getGitRepository())
                .branch(application.getGitBranchName())
                .user(application.getUser())
                .pwd(application.getPwd())
                .build();
        RunnerReply reply = RunnerHttp.send(endpoint, params);
        System.out.println("reply: " + reply);
        return true;
    }

    public PipelineEntity executeCommands(ApplicationEntity application, String commands) {
        /**
         * at 1st for create the Pipeline belong to Application.
         * And Now add the WAIT state for it.
         * so it allows we to observe the state of the Pipeline after its creation.
         */
        PipelineEntity pipeline = new PipelineEntity();
        pipeline.setStatus((short)0);
        pipeline.setApplicationId(appId);
        pipeline.setCommands(commands);
        /**
         * the callbackUrl is used to callback after the execution of the pipeline.
         */
        String callbackUrl = Utils.encodeURL(
                callbackBaseURL,
                "pipeId=" + pipeline.getId()
        );
        RunnerEndpoint endpoint = new RunnerEndpoint(application.getAgentHost(), RunnerCalling.PIPELINE_CREATE);
        RunnerPipelineParams rpParams = RunnerPipelineParams
                .builder()
                .name(application.getName())
                .command(commands)
                .callbackUrl(callbackUrl)
                .build();
        RunnerReply reply = RunnerHttp.send(endpoint, rpParams);
        System.out.println("reply: " + reply);
        /**
         * Agent will return filename as message if created successfully,
         * if not return as usual. Error message can still be written to stdout,
         * but will not be persisted.
         */
        if (Objects.nonNull(reply) && reply.getStatus().equalsIgnoreCase("success")) {
            pipeline.setFilename(reply.getMessage());
            pipeline.setCreatedAt(Utils.getLocalDateTime());
            pipelineDAO.save(pipeline);
        }
        pipeline.setStdout(reply.getMessage());
        return pipeline;
    }

    public PipelineEntity create(Long appId, List<String> commands) {
        ApplicationEntity application = Optional.of(
                applicationDAO.findById(appId)
        ).get().orElseGet(() -> null);
        if (Objects.isNull(application)) return null;

        boolean shouldRunGitClone = false;

        StringBuilder sb = new StringBuilder();
        for (String cmd : commands) {
            if (cmd.equals(PipelineTaskFlag.GIT_CLONE.getFlag())) {
                shouldRunGitClone = true;
                continue;
            }
            if (sb.length() > 0 && !cmd.equals(PipelineTaskFlag.GIT_CLONE.getFlag())) {
                sb.append(" && ");
            }
            sb.append(cmd);
        }

        if (shouldRunGitClone) {
            gitClone(application);
        }

        return executeCommands(application, sb.toString());
    }

    public PipelineEntity getStdout(Long id) {
        PipelineEntity pipeline = Optional.of(
                pipelineDAO.findById(id)
        ).get().orElseGet(() -> null);
        if (Objects.isNull(pipeline)) return null;
        ApplicationEntity application = Optional.of(
                applicationDAO.findById(pipeline.getApplicationId())
        ).get().orElseGet(() -> null);
        if (Objects.isNull(application)) return null;
        RunnerEndpoint endpoint = new RunnerEndpoint(application.getAgentHost(), RunnerCalling.PIPELINE_STDOUT);
        RunnerPipelineParams rpParams = RunnerPipelineParams
                .builder()
                .name(application.getName())
                .filename(pipeline.getFilename())
                .build();
        RunnerReply reply = RunnerHttp.send(endpoint, rpParams);
        System.out.println("reply: " + reply);
        pipeline.setStdout(reply.getMessage());
        return pipeline;
    }

    public PipelineEntity get(Long id) {
        return Optional.of(
                pipelineDAO.findById(id)
        ).get().orElseGet(() -> null);
    }

    public PipelineEntity callback(Map<String, String> args) throws Exception {
        PipelineEntity pipeline = Optional.of(
                pipelineDAO.findById(Long.valueOf(args.get("pipeId")))
        ).get().orElseGet(() -> null);
        if (Objects.nonNull(pipeline)) {
            if (args.get("startTime") != null) {
                pipeline.setStartTime(Utils.convertToTimestamp(args.get("startTime"), ""));
            }
            if (args.get("endTime") != null) {
                pipeline.setEndTime(Utils.convertToTimestamp(args.get("endTime"), ""));
            }
            if (args.get("status") != null) {
                pipeline.setStatus(Short.valueOf(args.get("status")));
            }
            pipelineDAO.save(pipeline);
        }
        return pipeline;
    }
}
