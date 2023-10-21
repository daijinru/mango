package com.mango.console.common;

import org.springframework.http.HttpStatus;

public class WrapResponsesData {
    private int status;
    private String message;
    private Object data;

    public WrapResponsesData(Object data) {
        this.data = data;
    }

    public WrapResponsesData success() {
        this.status = HttpStatus.OK.value();
        this.message = "success";
        return this;
    }

    public WrapResponsesData fail(Exception ex) {
        this.status = HttpStatus.INTERNAL_SERVER_ERROR.value();
        this.message = ex.getMessage();
        return this;
    }

    public WrapResponsesData error(String msg) {
        this.status = HttpStatus.BAD_REQUEST.value();
        this.message = msg;
        return this;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
