package com.mango.console.controllers.application;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "applications")
@Data
@Builder
public class ApplicationEntity {
    @NonNull
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    @NonNull
    private String name;
    @Column(name = "git_repository")
    private String gitRepository;
    @Column(name = "git_branch_name")
    private String gitBranchName;
    @Column(name = "agent_host")
    private String agentHost;
    @Column(name = "artifact_rule")
    private String artifactRule;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createdAt;
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Date updatedAt;

    public ApplicationEntity() {
    }
}
