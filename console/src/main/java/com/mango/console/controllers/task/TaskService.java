package com.mango.console.controllers.task;

import com.mango.console.common.Utils;
import org.springframework.beans.BeanUtils;
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
        return taskDAO.save(task);
    }

    public TaskEntity update(TaskVO task) throws Exception {
        TaskEntity entity = taskDAO
                .findById(task.getId())
                .orElseThrow(() -> new RuntimeException("task service: task not found"));
        Utils.copyNonNullProperties(entity, task);
        System.out.println(entity);
        entity.setUpdatedAt(Utils.getLocalDateTime());
        return taskDAO.save(entity);
    }

    public void delete(Long id) {
        taskDAO.deleteById(id);
    }
}
