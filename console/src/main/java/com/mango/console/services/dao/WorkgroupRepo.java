package com.mango.console.services.dao;

import com.mango.console.services.entity.Workgroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkgroupRepo extends JpaRepository<Workgroup, Long> {
}
