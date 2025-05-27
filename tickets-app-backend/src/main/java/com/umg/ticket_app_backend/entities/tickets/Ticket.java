package com.umg.ticket_app_backend.entities.tickets;

import com.umg.ticket_app_backend.dtos.tickets.CreateTicketMessage;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.Optional;

@Data
@Entity
@Table(name = "tickets")
@NoArgsConstructor
public class Ticket implements Comparable<Ticket> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String identification;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String description;
    private TicketPriority priority;
    private TicketStatus status;
    private String assignedTo;
    @CreatedDate
    private Instant createdAt;

    public static Ticket fromMessage(CreateTicketMessage message) {
        final var ticketPriorityConverter = new TicketPriorityConverter();

        final var ticket = new Ticket();
        ticket.setIdentification(message.identification());
        ticket.setFirstName(message.firstName());
        ticket.setLastName(message.lastName());
        ticket.setPhoneNumber(message.phoneNumber());
        ticket.setEmail(message.email());
        ticket.setDescription(message.description());
        ticket.setPriority(ticketPriorityConverter.convertToEntityAttribute(message.priority()));
        ticket.setStatus(TicketStatus.PENDING);
        ticket.setCreatedAt(Instant.now());

        return ticket;
    }

    @Override
    public int compareTo(Ticket o) {
        final var thisPriority = Optional.ofNullable(this.priority).orElse(TicketPriority.LOW);
        final var otherPriority = Optional.ofNullable(o.priority).orElse(TicketPriority.LOW);
        final var priorityComparison = thisPriority.compareTo(otherPriority);
        if (priorityComparison != 0) return priorityComparison;

        final var thisStatus = Optional.ofNullable(this.status).orElse(TicketStatus.PENDING);
        final var otherStatus = Optional.ofNullable(o.status).orElse(TicketStatus.PENDING);
        final var statusComparison = thisStatus.compareTo(otherStatus);
        if (statusComparison != 0) return statusComparison;

        final var thisCreatedAt = Optional.ofNullable(this.createdAt).orElse(Instant.EPOCH);
        final var otherCreatedAt = Optional.ofNullable(o.createdAt).orElse(Instant.EPOCH);
        return thisCreatedAt.compareTo(otherCreatedAt);
    }
}
