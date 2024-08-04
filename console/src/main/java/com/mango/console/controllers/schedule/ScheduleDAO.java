package com.mango.console.controllers.schedule;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleDAO extends JpaRepository<ScheduleEntity, Long> {
}
