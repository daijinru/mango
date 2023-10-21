package com.mango.console.runner;

public enum RunnerMethods {
  PIPELINE_CREATE("/pipeline/create"),
  PIPELINE_STATUS("/pipeline/status"),
  PIPELINE_STDOUT("/pipeline/stdout"),
  PIPELINE_LIST("/pipeline/list");

  private final String endpoint;

  RunnerMethods(String endpoint) {
      this.endpoint = endpoint;
  }

  public String getEndpoint() {
      return endpoint;
  }
}
