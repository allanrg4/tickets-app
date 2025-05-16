package com.umg.ticket_app_backend.dtos.auth;

import com.umg.ticket_app_backend.entities.auth.Role;

public record AuthResponse(
        String token,
        Long expiresAt,
        String username,
        Role role
) {
}
