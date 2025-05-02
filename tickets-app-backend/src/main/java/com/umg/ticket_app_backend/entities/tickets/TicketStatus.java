package com.umg.ticket_app_backend.entities.tickets;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum TicketStatus {
    PENDING("pending"),
    IN_PROGRESS("in_progress"),
    RESOLVED("resolved");

    private final String code;
}

@Converter(autoApply = true)
class TicketStatusConverter implements AttributeConverter<TicketStatus, String> {
    @Override
    public String convertToDatabaseColumn(TicketStatus status) {
        if (status == null) return null;
        return status.getCode();
    }

    @Override
    public TicketStatus convertToEntityAttribute(String code) {
        if (code == null) return null;
        return Stream.of(TicketStatus.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
