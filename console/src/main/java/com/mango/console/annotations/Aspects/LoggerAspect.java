package com.mango.console.annotations.Aspects;

import com.mango.console.annotations.LoggerMg;

import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Aspect
@Component
public class LoggerAspect {
    private Logger logger = Logger.getLogger("MANGO_CONSOLE");

    @Pointcut("@annotation(com.mango.console.annotations.LoggerMg)")
    public void pointcut() {
    }

    @Before(value = "pointcut() && @annotation(mg)", argNames = "jp, mg")
    public void before(JoinPoint jp, LoggerMg mg) {
        switch (mg.logLevel()) {
            case LoggerMg.INFO:
                String msg = "called: " + jp.toString() + " args: " + jp.getArgs().toString();
                if (StringUtils.isEmpty(mg.description())) {
                    logger.info(msg);
                } else {
                    logger.info("With: " + mg.description() + " " + msg);
                }
        }
    }
}
