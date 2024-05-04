package com.mango.console.services.entity;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "workspaces")
@Data
public class Workspace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "ws_name")
    private String name;
    /**
     * 本分组的服务器地址
     */
    @Column(name = "server_host")
    private String host;
    /**
     * 每个分组对应一个代理执行器，
     * 这里是执行器所在的服务器地址
     */
    @Column(name = "agent_host")
    private String agentHost;
    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp createdAt;
}
