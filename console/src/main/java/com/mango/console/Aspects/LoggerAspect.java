package com.mango.console.Aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
public class LoggerAspect {

    @Before("execution(* com.mango.console.controllers.*.*(..)) && @within(org.springframework.web.bind.annotation.RestController)")
    public void logRequest(JoinPoint joinPoint) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String requestPath = request.getRequestURI();
        String requestMethod = request.getMethod();
        Object[] requestParams = joinPoint.getArgs();

        System.out.println("Request Path: " + requestPath + ", method: " + requestMethod + ", params: " + requestParams);
    }
}