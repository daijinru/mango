package com.mango.console.runner.endpoint;

public enum RunnerCalling {
  GIT_CLONE("/git/clone"),
  PIPELINE_CREATE("/pipeline/create"),
  PIPELINE_STDOUT("/pipeline/stdout"),
  PIPELINE_LIST("/pipeline/list"),
  SERVICE_STATUS("/service/status"),
  SERVICE_MONITOR("/service/monitor");

  private final String calling;

  RunnerCalling(String calling) {
      this.calling = calling;
  }

  public String getCalling() {
      return calling;
  }
}
