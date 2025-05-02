package com.umg.ticket_app_backend.entities.auth;

import jakarta.persistence.Converter;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum Role {
    ADMIN("admin"),
    AGENT("agent"),
    RESOLVER("resolver");

    private final String code;
}

@Converter(autoApply = true)
class RoleConverter implements jakarta.persistence.AttributeConverter<Role, String> {
    @Override
    public String convertToDatabaseColumn(Role role) {
        if (role == null) return null;
        return role.getCode();
    }

    @Override
    public Role convertToEntityAttribute(String code) {
        if (code == null) return null;
        return Stream.of(Role.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
