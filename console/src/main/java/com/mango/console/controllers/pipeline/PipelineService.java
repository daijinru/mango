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
         * it will be persisted, however.
         */
        PipelineEntity pipeline = new PipelineEntity();
        pipeline.setStatus((short)0);
        pipeline.setApplicationId(application.getId());
        pipeline.setCommands(commands);
        pipeline.setCreatedAt(Utils.getLocalDateTime());
        PipelineEntity saving = pipelineDAO.save(pipeline);
        /**
         * the callbackUrl is used to callback after the execution of the pipeline.
         */
        String callbackUrl = Utils.encodeURL(
                callbackBaseURL + "/" + saving.getId(),
                ""
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
         */
        saving.setStdout(reply.getData().toString());
        return saving;
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
            } else {
                if (sb.length() > 0) {
                    sb.append(" && ");
                }
                sb.append(cmd);
            }
        }
        /**
         * A build-in identifier, will trigger a Git Clone in the Tasks,
         * for permissions, its data required comes from the Application.
         */
        if (shouldRunGitClone) {
            gitClone(application);
        }

        String commandStr = sb.toString();
        if (commandStr.isEmpty()) {
            return PipelineEntity.builder().stdout("no next Task, because no extra commands").build();
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
        pipeline.setStdout(reply.getData().toString());
        return pipeline;
    }

    public PipelineEntity get(Long id) {
        return Optional.of(
                pipelineDAO.findById(id)
        ).get().orElseGet(() -> null);
    }

    public PipelineEntity callback(Long id, Map<String, String> args) throws Exception {
        PipelineEntity entity = Optional.of(
                pipelineDAO.findById(id)
        ).get().orElseGet(() -> null);
        if (Objects.isNull(entity)) return null;
        if (args.get("startTime") != null) {
            entity.setStartTime(Utils.convertToTimestamp(args.get("startTime"), ""));
        }
        if (args.get("filename") != null) {
            entity.setFilename(args.get("filename"));
        }
        if (args.get("endTime") != null) {
            entity.setEndTime(Utils.convertToTimestamp(args.get("endTime"), ""));
        }
        entity.setStatus(Short.valueOf("2"));
        entity.setUpdatedAt(Utils.getLocalDateTime());
        System.out.println(entity);
        return pipelineDAO.save(entity);
    }
}
