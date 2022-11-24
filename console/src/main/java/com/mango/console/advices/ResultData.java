package com.mango.console.advices;

import lombok.Data;

import java.text.SimpleDateFormat;
import java.util.Objects;

@Data
public class ResultData<T> {
    private int status;
    private String message;
    private T data;
    private String timestamp;

    public ResultData() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        this.timestamp = simpleDateFormat.format(System.currentTimeMillis());
        this.data = null;
    }

    public static <T> ResultData<T> success(T data) {
        ResultData<T> res = new ResultData<>();
        res.setStatus(ReturnCode.SUCCESS.getCode());
        res.setMessage(ReturnCode.SUCCESS.getMessage());
        if (Objects.nonNull(data)) {
            res.setData(data);
        }
        return res;
    }

    public static <T> ResultData<T> failed() {
        ResultData<T> res = new ResultData<>();
        res.setStatus(ReturnCode.FAILED.getCode());
        res.setMessage(ReturnCode.FAILED.getMessage());
        return res;
    }

    public static  <T> ResultData<T> failed(int code, String message) {
        ResultData<T> res = new ResultData<>();
        res.setStatus(code);
        res.setMessage(message);
        return res;
    }
}