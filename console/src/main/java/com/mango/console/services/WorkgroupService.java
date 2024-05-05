package com.mango.console.services;

import com.mango.console.controllers.WorkgroupArgs;
import com.mango.console.services.dao.WorkgroupRepo;
import com.mango.console.services.entity.Workgroup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkgroupService {
    @Autowired
    private WorkgroupRepo repo;

    public Workgroup group(Long id) {
        return Optional.ofNullable(
                repo.findById(id)
        ).get().orElseGet(() -> null);
    }

    public Workgroup create(WorkgroupArgs args) {
        Workgroup group = new Workgroup();
        group.setName(args.getName());
        group.setHost(args.getHost());
        group.setAgentHost(args.getAgentHost());
        repo.save(group);
        return group;
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Workgroup> listGroups() {
        return repo.findAll();
    }
}
