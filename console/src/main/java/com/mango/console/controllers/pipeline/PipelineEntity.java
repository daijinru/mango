package com.mango.console.controllers.pipeline;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "pipelines")
@Data
public class PipelineEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "status")
    private Short status;
    @Column(name = "artifact_id")
    private Long artifactId;
    @Column(name = "start_time")
    private Timestamp startTime;
    /**
     * Serialized print characters
     */
    @Column(name = "stdout", columnDefinition = "TEXT")
    private String stdout;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createdAt;
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Date updatedAt;
}
