package com.umg.ticket_app_backend.dtos.tickets;

public record CreateTicketMessage(
        String identification,
        String firstName,
        String lastName,
        String phoneNumber,
        String email,
        String description,
        String priority
) {
}
