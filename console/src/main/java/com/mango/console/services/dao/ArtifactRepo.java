package com.mango.console.services.dao;

import com.mango.console.services.entity.Artifact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtifactRepo extends JpaRepository<Artifact, Long> {
}
