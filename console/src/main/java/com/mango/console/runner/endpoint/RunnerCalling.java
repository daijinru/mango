package com.mango.console.runner.endpoint;

public enum RunnerCalling {
  CLONE_PROJECT("/git/clone"),
  PIPELINE_CREATE("/pipeline/create"),
  PIPELINE_STDOUT("/pipeline/stdout"),
  PIPELINE_LIST("/pipeline/list"),
  SERVICE_STATUS("/service/status");

  private final String calling;

  RunnerCalling(String calling) {
      this.calling = calling;
  }

  public String getCalling() {
      return calling;
  }
}
