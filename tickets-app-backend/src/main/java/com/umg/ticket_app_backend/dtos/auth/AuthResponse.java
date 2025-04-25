package com.umg.ticket_app_backend.dtos.auth;

public record AuthResponse(String token, String username, Long expiresAt) {
}
