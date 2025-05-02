package com.umg.ticket_app_backend.dtos.auth;

import com.umg.ticket_app_backend.entities.auth.Role;

public record AuthRegister(
        String username,
        String password,
        String firstName,
        String lastName,
        String role
) {
}
