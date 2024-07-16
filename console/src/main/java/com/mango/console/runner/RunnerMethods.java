package com.mango.console.runner;

public enum RunnerMethods {
  CLONE_PROJECT("/git/clone"),
  PIPELINE_CREATE("/pipeline/create"),
  PIPELINE_STDOUT("/pipeline/stdout"),
  PIPELINE_LIST("/pipeline/list"),
  SERVICE_STATUS("/service/status");

  private final String endpoint;

  RunnerMethods(String endpoint) {
      this.endpoint = endpoint;
  }

  public String getEndpoint() {
      return endpoint;
  }
}
