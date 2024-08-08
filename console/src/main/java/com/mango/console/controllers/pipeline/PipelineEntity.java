package com.mango.console.controllers.pipeline;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "pipelines")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PipelineEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    /**
     * TODO: remove -> Schedule ID
     */
    @Column(name = "commands")
    private String commands;
    /**
     * 0 WAIT
     * 1 COMPLETED
     * 2 FAILED
     */
    @Column(name = "status")
    private Short status;
    @Column(name = "schedule_id")
    private Long scheduleId;
    @Column(name = "application_id")
    private Long applicationId;
    @Column(name = "artifact_id")
    private Long artifactId;
    @Column(name = "start_time")
    private Timestamp startTime;
    @Column(name = "end_time")
    private Timestamp endTime;
    /**
     * the serialized print characters, default to File system, rarely to here
     */
    @Column(name = "stdout", columnDefinition = "TEXT")
    private String stdout;
    @Column(name = "filename")
    private String filename;

    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createdAt;
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private Date updatedAt;
}
