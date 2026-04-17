package com.parc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestSimpleController {
    
    @GetMapping("/test")
    public String test() {
        return "API fonctionne !";
    }
    
    @GetMapping("/vehicules")
    public String vehicules() {
        return "[]";
    }
}