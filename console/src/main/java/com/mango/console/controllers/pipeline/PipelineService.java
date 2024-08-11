package com.mango.console.controllers.pipeline;

import com.mango.console.common.Utils;
import com.mango.console.controllers.agent.AgentService;
import com.mango.console.controllers.application.ApplicationDAO;
import com.mango.console.controllers.application.ApplicationEntity;
import com.mango.console.controllers.schedule.ScheduleEntity;
import com.mango.console.controllers.schedule.ScheduleService;
import com.mango.console.controllers.task.TaskEntity;
import com.mango.console.runner.RunnerHttp;
import com.mango.console.runner.RunnerReply;
import com.mango.console.runner.endpoint.RunnerCalling;
import com.mango.console.runner.endpoint.RunnerEndpoint;
import com.mango.console.runner.params.RunnerGitParams;
import com.mango.console.runner.params.RunnerPipelineParams;
import org.apache.http.HttpStatus;
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
    @Autowired
    private AgentService agentService;
    @Autowired
    private ScheduleService scheduleService;

    @Value("${config.agent.callback}")
    private String callbackBaseURL;

    public List<PipelineEntity> getAll(Long appId) {
        return pipelineDAO.findByApplicationId(appId);
    }

    private Boolean TASK_INTERNAL_git_clone(Integer taskIndex, ApplicationEntity application, PipelineEntity pipeline) {
        String callbackUrl = Utils.encodeURL(
                callbackBaseURL + "/" + pipeline.getId(),
                "status=" + taskIndex
        );
        RunnerEndpoint endpoint = new RunnerEndpoint(application.getAgentHost(), RunnerCalling.GIT_CLONE);
        RunnerGitParams params = RunnerGitParams.builder()
                .name(application.getName())
                .repo(application.getGitRepository())
                .branch(application.getGitBranchName())
                .user(application.getUser())
                .pwd(application.getPwd())
                .callbackUrl(callbackUrl)
                .build();
        RunnerReply reply = RunnerHttp.send(endpoint, params);
        System.out.println("reply: " + reply);
        return true;
    }

    public PipelineEntity TASK_send_to_agent(Integer taskIndex, ApplicationEntity application, PipelineEntity savedPipeline, TaskEntity task) {
        String callbackUrl = Utils.encodeURL(
                callbackBaseURL + "/" + savedPipeline.getId(),
                "status=" + taskIndex
        );
        /**
         * ID of Stdout File by combination of Application_Name-Pipeline_ID-Task_ID
         */
        String STDOUT_NAME = application.getName() + "-" + savedPipeline.getId() + "-" + taskIndex;
        RunnerEndpoint endpoint = new RunnerEndpoint(application.getAgentHost(), RunnerCalling.PIPELINE_CREATE);
        RunnerPipelineParams rpParams = RunnerPipelineParams
                .builder()
                .name(STDOUT_NAME)
                .command(task.getCommand())
                .callbackUrl(callbackUrl)
                .build();
        RunnerReply reply = RunnerHttp.send(endpoint, rpParams);
        System.out.println("reply: " + reply);
        /**
         * Agent will return filename as message if created successfully,
         * if not return as usual. Error message can still be written to stdout,
         */
        if (Integer.parseInt(reply.getStatus()) != HttpStatus.SC_OK) {
            savedPipeline.setStdout(reply.getMessage());
        }
        return savedPipeline;
    }

    public PipelineEntity dispatchNextTaskToService( ApplicationEntity application, PipelineEntity pipeline) throws Exception {
        Long scheduleId = pipeline.getScheduleId();
        TaskEntity task = scheduleService.getNextTaskById(scheduleId);
        Integer currentTaskIndex = scheduleService.getCurrentIndex(scheduleId);
        if (Objects.isNull(task)) return null;
        String command = task.getCommand();
        if (command.equals(PipelineTaskFlag.GIT_CLONE.getFlag())) {
            TASK_INTERNAL_git_clone(currentTaskIndex, application, pipeline);
        } else {
            TASK_send_to_agent(currentTaskIndex, application, pipeline, task);
        }
        currentTaskIndex++;
        scheduleService.updateCurrentIndex(scheduleId, currentTaskIndex);
        return pipeline;
    }

    public PipelineEntity create(Long appId, List<TaskEntity> tasks) throws Exception {
        ApplicationEntity application = Optional.of(
                applicationDAO.findById(appId)
        ).get().orElseGet(() -> null);
        if (Objects.isNull(application)) return null;

        boolean isAgentServiceRunning = agentService.getStatus(appId);
        if (!isAgentServiceRunning) {
            return PipelineEntity.builder().stdout("agent service not running with the application").build();
        }

        /**
         * at 1st for creating the Pipeline belong to Application.
         * And Now add the WAIT state for it.
         * so it allows we to observe the state of the Pipeline after its creation.
         * it will be persisted, however.
         */
        ScheduleEntity schedule = scheduleService.createWithTasks(tasks);
        PipelineEntity pipeline = PipelineEntity.builder()
                .status((short)0)
                .applicationId(application.getId())
                .createdAt(Utils.getLocalDateTime())
                .scheduleId(schedule.getId())
                .build();
        PipelineEntity saved = pipelineDAO.save(pipeline);

        dispatchNextTaskToService(application, saved);

        pipeline.setStdout("Tasks created successfully for the pipeline");
        pipeline.setStatus((short)1);
        pipeline.setUpdatedAt(Utils.getLocalDateTime());
        pipelineDAO.save(pipeline);
        return pipeline;
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
        PipelineEntity pipeline = Optional.of(
                pipelineDAO.findById(id)
        ).get().orElseGet(() -> null);
        if (Objects.isNull(pipeline)) return null;
        /**
         * startTime comes of the execution after the first send to agent,
         * so record it once enough.
         */
        if (Objects.isNull(pipeline.getStartTime())) {
            pipeline.setStartTime(Utils.convertToTimestamp(args.get("startTime"), ""));
        }
        pipeline.setEndTime(Utils.convertToTimestamp(args.get("endTime"), ""));
        /**
         * status comes from the callback params.
         */
        pipeline.setStatus(Short.parseShort(args.get("status")));
        pipeline.setUpdatedAt(Utils.getLocalDateTime());
        /**
         * checking if task next by each callback
         */
        ApplicationEntity application = Optional.of(
                applicationDAO.findById(pipeline.getApplicationId())
        ).get().orElseGet(() -> null);
        if (Objects.nonNull(application)) {
            dispatchNextTaskToService(application, pipeline);
        }

        return pipelineDAO.save(pipeline);
    }
}
