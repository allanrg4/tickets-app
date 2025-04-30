package com.umg.ticket_app_backend.controllers;

import com.umg.ticket_app_backend.dtos.auth.AuthRegister;
import com.umg.ticket_app_backend.dtos.auth.AuthRequest;
import com.umg.ticket_app_backend.dtos.auth.AuthResponse;
import com.umg.ticket_app_backend.services.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;

    AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/token")
    public AuthResponse health(@RequestBody AuthRequest body) {
        final var response = authService.authenticate(body);
        System.out.println("AuthController: " + response);
        return response;
    }

    @PostMapping("/register")
    public Boolean register(@RequestBody AuthRegister body) {
        final var response = authService.register(body);
        System.out.println("AuthController: " + response);
        return response;
    }
}
