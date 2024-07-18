package com.mango.console.common;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class WrapResponse<T> {
    private int status;
    private String message;
    private T data;

    public WrapResponse(T data) {
        this.data = data;
    }

    public WrapResponse success() {
        this.status = HttpStatus.OK.value();
        this.message = "success";
        return this;
    }

    public WrapResponse fail(Exception ex) {
        this.status = HttpStatus.INTERNAL_SERVER_ERROR.value();
        this.message = ex.getMessage();
        return this;
    }

    public WrapResponse error(String msg) {
        this.status = HttpStatus.BAD_REQUEST.value();
        this.message = msg;
        return this;
    }

    public WrapResponse message(String msg) {
        this.message = msg;
        return this;
    }
}
