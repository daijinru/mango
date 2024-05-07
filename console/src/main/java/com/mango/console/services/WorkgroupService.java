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

    public Workgroup get(Long id) {
        return Optional.ofNullable(
                repo.findById(id)
        ).get().orElseGet(() -> null);
    }

    public Workgroup create(WorkgroupArgs args) {
        Workgroup group = new Workgroup();
        group.setName(args.getName());
        group.setHost(args.getHost());
        group.setAgentId(args.getAgentId());
        repo.save(group);
        return group;
    }

    public Workgroup update(WorkgroupArgs args) {
        Workgroup group = repo.findById(args.getId())
                .orElseThrow(() -> new IllegalArgumentException("group not found"));
        Optional.ofNullable(args.getName()).ifPresent(group::setName);
        Optional.ofNullable(args.getHost()).ifPresent(group::setHost);
        Optional.ofNullable(args.getAgentId()).ifPresent(group::setAgentId);
        return repo.save(group);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<Workgroup> listGroups() {
        return repo.findAll();
    }
}
