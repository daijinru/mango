package com.mango.console.controllers.schedule;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.mango.console.common.Utils;
import com.mango.console.controllers.task.TaskEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
public class ScheduleService {
    @Autowired
    private ScheduleDAO dao;

    /**
     * it's currently related Pipeline, Task Models.
     */
    @Transactional
    public ScheduleEntity createWithTasks(List<TaskEntity> tasks) throws Exception {
        /**
         * Do not affect the schedule existed while some task has changed.
         * So convert their instances into JSON char for the Schedule.
         */
        ObjectMapper mapper = new ObjectMapper();
        Map<Long, TaskEntity> idToTaskMap = new HashMap<>();
        for (TaskEntity task : tasks) {
            idToTaskMap.put(task.getId(), task);
        }
        ObjectNode tasksJson = mapper.convertValue(idToTaskMap, ObjectNode.class);
        String tasksString = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(tasksJson);

        ScheduleEntity entity = ScheduleEntity.builder()
                .currentTaskIndex(0)
                .taskCount(tasks.size())
                .tasks(tasksString)
                .createdAt(Utils.getLocalDateTime())
                .build();
        dao.save(entity);
        return entity;
    }

    @Transactional
    public TaskEntity getNextTaskById(Long id) throws Exception {
        ScheduleEntity schedule = Optional.of(dao.findById(id)).get().orElseGet(() -> null);
        if (Objects.isNull(schedule)) return null;
        String tasks = schedule.getTasks();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(tasks);
        Map<Long, TaskEntity> idToTaskMap = new HashMap<>();
        for (JsonNode entryNode : jsonNode) {
            Long taskId = entryNode.get("id").asLong();
            String name = entryNode.get("name").asText();
            String command = entryNode.get("command").asText();
            TaskEntity task = TaskEntity.builder()
                    .id(taskId)
                    .name(name)
                    .command(command)
                    .build();
            idToTaskMap.put(id, task);
        }
        Integer currentIndex = schedule.getCurrentTaskIndex();
        return idToTaskMap.get(currentIndex);
    }

    @Transactional
    public Integer getCurrentIndex(Long id) {
        ScheduleEntity entity = Optional.of(dao.findById(id)).get().orElseGet(() -> null);
        if (Objects.isNull(entity)) return null;
        return entity.getCurrentTaskIndex();
    }

    @Transactional
    public ScheduleEntity updateCurrentIndex(Long id, Integer currentIndex) {
        ScheduleEntity entity = Optional.of(dao.findById(id)).get().orElseGet(() -> null);
        if (Objects.isNull(entity)) return null;
        entity.setUpdatedAt(Utils.getLocalDateTime());
        entity.setCurrentTaskIndex(currentIndex);
        dao.save(entity);
        return entity;
    }
}
