package com.umg.ticket_app_backend.entities.tickets;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.stream.Stream;

@Getter
@RequiredArgsConstructor
public enum TicketPriority {
    LOW("low"),
    MEDIUM("medium"),
    HIGH("high");

    private final String code;
}

@Converter(autoApply = true)
class TicketPriorityConverter implements AttributeConverter<TicketPriority, String> {
    @Override
    public String convertToDatabaseColumn(TicketPriority priority) {
        if (priority == null) return null;
        return priority.getCode();
    }

    @Override
    public TicketPriority convertToEntityAttribute(String code) {
        if (code == null) return null;
        return Stream.of(TicketPriority.values())
                .filter(c -> c.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
