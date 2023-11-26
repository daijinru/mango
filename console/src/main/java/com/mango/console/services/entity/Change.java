package com.mango.console.services.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "change")
@Data
public class Change {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "project_id")
    private Long projectId;
    @Column(name = "pipeline_id")
    private Long pipelineId;
    @Column(name = "branch_id")
    private Long branchId;
    @Column(name = "commit")
    private String commit;
    @Column(name = "message")
    private String message;
    @Column(name = "author")
    private String author;
    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createdAt;
}
