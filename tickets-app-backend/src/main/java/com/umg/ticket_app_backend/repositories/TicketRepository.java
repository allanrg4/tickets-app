package com.umg.ticket_app_backend.repositories;

import com.umg.ticket_app_backend.entities.tickets.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
