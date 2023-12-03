package com.mango.console.services;

import com.mango.console.controllers.ArtifactArgs;
import com.mango.console.services.dao.ArtifactRepo;
import com.mango.console.services.entity.Artifact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class ArtifactService {
    @Autowired
    private ArtifactRepo artifactRepo;

    public Artifact artifact(Long id) {
        return Optional.ofNullable(
                artifactRepo.findById(id)
        ).get().orElseGet(() -> null);
    }

    @Transactional
    public Artifact create(ArtifactArgs args) {
        Artifact artifact = new Artifact();
        artifactRepo.save(artifact);
        return artifact;
    }

    @Transactional
    public void delete(Long id) {
        artifactRepo.deleteById(id);
    }
}
