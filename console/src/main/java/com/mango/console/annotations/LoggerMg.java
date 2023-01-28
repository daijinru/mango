package com.mango.console.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface LoggerMg {
    public static final int INFO = 1;
    public static final int WARN = 2;
    public static final int ERROR = 3;
    int logLevel() default LoggerMg.INFO;

    String description() default "" ;
}
