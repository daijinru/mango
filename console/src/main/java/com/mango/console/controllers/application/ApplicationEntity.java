package com.mango.console.controllers.application;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "applications")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationEntity {
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
    @Column(name = "user")
    private String user;
    @Column(name = "pwd")
    private String pwd;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createdAt;
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Date updatedAt;
}
