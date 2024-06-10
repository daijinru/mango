package com.mango.console.controllers.application;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationDAO extends JpaRepository<ApplicationEntity, Long> {
}
