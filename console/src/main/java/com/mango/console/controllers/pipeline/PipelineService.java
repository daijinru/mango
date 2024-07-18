package com.mango.console.controllers.pipeline;

import com.mango.console.common.Utils;
import com.mango.console.controllers.application.ApplicationDAO;
import com.mango.console.controllers.application.ApplicationEntity;
import com.mango.console.runner.RunnerHttp;
import com.mango.console.runner.RunnerReply;
import com.mango.console.runner.endpoint.RunnerCalling;
import com.mango.console.runner.endpoint.RunnerEndpoint;
import com.mango.console.runner.params.RunnerPipelineParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public List<PipelineEntity> getAll() {
        return pipelineDAO.findAll();
    }

    public PipelineEntity create(Long appId, String commands) {
        ApplicationEntity application = Optional.of(
                applicationDAO.findById(appId)
        ).get().orElseGet(() -> null);
        if (Objects.isNull(application)) return null;
        /**
         * at 1st for create the Pipeline belong to Application.
         * And Now add the WAIT state for it.
         * so it allows we to observe the state of the Pipeline after its creation.
         */
        PipelineEntity pipeline = new PipelineEntity();
        pipeline.setStatus((short)0);
        pipeline.setApplicationId(appId);
        pipeline.setCommands(commands);
        pipeline.setCreatedAt(Utils.getLocalDateTime());
        pipelineDAO.save(pipeline);
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
        if (Objects.nonNull(reply) && reply.getStatus().equalsIgnoreCase("success")) {
            pipeline.setFilename(reply.getMessage());
            pipelineDAO.save(pipeline);
        }
        return pipeline;
    }
}
