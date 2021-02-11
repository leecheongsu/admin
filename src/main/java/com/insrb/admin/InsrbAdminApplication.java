package com.insrb.admin;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = "com.insrb.admin.mapper")
public class InsrbAdminApplication {

	public static void main(String[] args) {
		SpringApplication.run(InsrbAdminApplication.class, args);
	}

}
