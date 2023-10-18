package com.mango.console.runner;

public enum RunnerEndpointEnum {
  CREATE_PIPELINE("/pipeline/create");

  private final String endpoint;

  RunnerEndpointEnum(String endpoint) {
      this.endpoint = endpoint;
  }

  public String getEndpoint() {
      return endpoint;
  }
}
