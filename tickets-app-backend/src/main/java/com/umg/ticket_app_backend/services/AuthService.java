package com.umg.ticket_app_backend.services;

import com.umg.ticket_app_backend.dtos.auth.AuthRegister;
import com.umg.ticket_app_backend.entities.auth.User;
import com.umg.ticket_app_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.umg.ticket_app_backend.dtos.auth.AuthRequest;
import com.umg.ticket_app_backend.dtos.auth.AuthResponse;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    public AuthResponse authenticate(AuthRequest authRequest) {
        final var token = new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password());
        final var authentication = authenticationManager.authenticate(token);
        final var jwtToken = jwtService.generateToken(authentication);
        final var expiresAt = jwtService.extractExpirationTime(jwtToken);
        return new AuthResponse(jwtToken, authentication.getName(), expiresAt);
    }

    public User register(AuthRegister request) {
        try {
            final var newUser = User.fromRequest(
                    request,
                    passwordEncoder.encode(request.password())
            );
            return userRepository.save(newUser);
        } catch (Exception e) {
            throw new RuntimeException("Error registering user: " + e.getMessage(), e);
        }
    }
}
