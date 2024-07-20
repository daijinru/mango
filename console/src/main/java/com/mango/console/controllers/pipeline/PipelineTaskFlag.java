package com.mango.console.controllers.pipeline;

public enum PipelineTaskFlag {
  GIT_CLONE("${GIT_CLONE}");

  private final String flag;

  PipelineTaskFlag(String flag) {
      this.flag = flag;
  }

  public String getFlag() {
      return flag;
  }
}
