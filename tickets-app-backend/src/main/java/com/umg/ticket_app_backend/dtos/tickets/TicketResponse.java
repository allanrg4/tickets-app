package com.umg.ticket_app_backend.dtos.tickets;

import com.umg.ticket_app_backend.entities.tickets.Ticket;

import java.util.PriorityQueue;

public record TicketResponse(
        TicketResponseCode code,
        String message,
        PriorityQueue<Ticket> data
) {
}
