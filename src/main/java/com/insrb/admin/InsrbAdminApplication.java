package com.insrb.admin;

import com.insrb.admin.util.StorageService;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(StorageProperties.class)
@MapperScan(basePackages = "com.insrb.admin.mapper")
public class InsrbAdminApplication {

	@Autowired
	StorageService storageService;

	public static void main(String[] args) {
		SpringApplication.run(InsrbAdminApplication.class, args);
	}

}
