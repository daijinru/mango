package com.mango.console.services.dao;

import com.mango.console.services.entity.Deploy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeployRepo extends JpaRepository<Deploy, Long> {
}
