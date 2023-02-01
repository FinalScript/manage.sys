package com.finalscript.storemanagementapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "*")
public class StoreManagementApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(StoreManagementApiApplication.class, args);
    }

    @GetMapping
    public String sayHello() {
        return "Hello World!";
    }

}
