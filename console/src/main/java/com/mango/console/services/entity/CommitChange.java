package com.mango.console.services.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "commit_change")
@Data
public class CommitChange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "project_id")
    private Long projectId;
    @Column(name = "pipeline_id")
    private Long pipelineId;
    @Column(name = "branch_id")
    private Long branchId;
    @Column(name = "commit_id")
    private String commitId;
    @Column(name = "msg_text")
    private String msgText;
    @Column(name = "author")
    private String author;
    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createdAt;
}
