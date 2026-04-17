package com.parc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.parc"})  
public class GestionParcApplication {

    public static void main(String[] args) {
        SpringApplication.run(GestionParcApplication.class, args);
    }
}