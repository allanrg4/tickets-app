package com.umg.ticket_app_backend.dtos.tickets;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TicketResponseCode {
    SUCCESS("success"), ERROR("error");

    private final String code;
}
