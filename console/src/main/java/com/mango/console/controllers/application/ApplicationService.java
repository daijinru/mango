package com.mango.console.controllers.application;

import com.mango.console.common.Utils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationDAO dao;

    public List<ApplicationEntity> getAll() {
        return dao.findAll();
    }

    public ApplicationEntity update(ApplicationVO vo) throws Exception {
        ApplicationEntity entity = dao
                .findById(vo.getId())
                .orElseThrow(() -> new RuntimeException("application service: application not found"));
        System.out.println(vo);
        Utils.copyNonNullProperties(entity, vo);
        entity.setUpdatedAt(Utils.getLocalDateTime());
        System.out.println(entity);
        return dao.save(entity);
    }

    public ApplicationEntity save(ApplicationEntity entity) {
        entity.setCreatedAt(Utils.getLocalDateTime());
        return dao.save(entity);
    }

    public ApplicationEntity get(Long id) {
        return Optional.of(
                dao.findById(id)
        ).get().orElseGet(() -> null);
    }
}
