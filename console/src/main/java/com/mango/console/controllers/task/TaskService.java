package com.mango.console.controllers.task;

import com.mango.console.common.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskDAO taskDAO;

    public List<TaskEntity> getAll() {
        return taskDAO.findAll();
    }

    public TaskEntity get(Long id) {
        return Optional.of(
                taskDAO.findById(id)
        ).get().orElseGet(() -> null);
    }

    public TaskEntity save(TaskEntity task) {
        task.setCreatedAt(Utils.getLocalDateTime());
        taskDAO.save(task);
        return task;
    }

    public TaskEntity update(Long id, TaskEntity task) {
        TaskEntity result = taskDAO
                .findById(id)
                .orElseThrow(() -> new RuntimeException("task service: task not found"));
        result.setId(id);
        result.setUpdatedAt(Utils.getLocalDateTime());
        return taskDAO.save(result);
    }

    public void delete(Long id) {
        taskDAO.deleteById(id);
    }
}
