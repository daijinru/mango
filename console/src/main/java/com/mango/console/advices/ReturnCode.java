package com.mango.console.advices;

public enum ReturnCode {
    COMMAND_ERROR(5001,"命令行错误"),
    SUCCESS(1000, "请求成功"),
    FAILED(5000, "请求错误");

    private final int code;

    private final String message;

    ReturnCode(int code, String message){
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
