package com.umg.ticket_app_backend.controllers;

import com.umg.ticket_app_backend.dtos.auth.AuthRegister;
import com.umg.ticket_app_backend.dtos.auth.AuthRequest;
import com.umg.ticket_app_backend.dtos.auth.AuthResponse;
import com.umg.ticket_app_backend.entities.auth.User;
import com.umg.ticket_app_backend.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/token")
    public AuthResponse health(@RequestBody AuthRequest body) {
        return authService.authenticate(body);
    }

    @PostMapping("/register")
    public User register(@RequestBody AuthRegister body) {
        return authService.register(body);
    }
}
