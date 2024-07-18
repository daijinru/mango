package com.mango.console.aspects;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mango.console.common.WrapResponse;
import org.springframework.core.annotation.Order;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
@Order(1)
public class WrapResponseExceptionHandler {
    private final ObjectMapper objectMapper;

    public WrapResponseExceptionHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @ExceptionHandler(Exception.class)
    @ResponseBody
    public WrapResponse handleException(Exception ex) {
        WrapResponse wrappedResponse = new WrapResponse(null).fail(ex);
        System.out.println(wrappedResponse.getMessage());
        return wrappedResponse;
    }
}

