package com.mango.console.services.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "pipelines")
@Data
public class Pipeline {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "project_id")
    private Long projectId;
    @Column(name = "filename")
    private String filename;
    @Column(name = "callback_url")
    private String callbackUrl;
    @Column(name = "status")
    private Short status;
    /**
     * if nonNull it means the pipe related to an artifact published
     */
    @Column(name = "artifact_id")
    private Long artifactId;
    @Column(name = "start_time")
    private Timestamp startTime;
    @Column(name = "end_time")
    private Timestamp endTime;
    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;
}