package com.mango.console;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

import java.util.logging.Logger;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class ConsoleApplication {
	public static void main(String[] args) {
		SpringApplication.run(ConsoleApplication.class, args);
	}

}
