package com.umg.ticket_app_backend.controllers;

import com.umg.ticket_app_backend.dtos.tickets.CreateTicketMessage;
import com.umg.ticket_app_backend.dtos.tickets.ResolveTicketMessage;
import com.umg.ticket_app_backend.dtos.tickets.TicketResponse;
import com.umg.ticket_app_backend.dtos.tickets.TicketResponseCode;
import com.umg.ticket_app_backend.entities.auth.Role;
import com.umg.ticket_app_backend.entities.tickets.Ticket;
import com.umg.ticket_app_backend.entities.tickets.TicketStatus;
import com.umg.ticket_app_backend.repositories.TicketRepository;
import com.umg.ticket_app_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.*;


@Controller
@RequiredArgsConstructor
public class TicketController {
    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;

    private final ArrayList<Ticket> tickets = new ArrayList<>();

    @MessageMapping("/tickets")
    @SendTo("/topic/tickets")
    public TicketResponse getTickets() throws Exception {
        final var availableTickets = ticketRepository
                .findAll().stream().toList();

        this.tickets.clear();
        this.tickets.addAll(availableTickets);

        return this.getSuccessResponse("Tickets retrieved successfully");
    }

    @MessageMapping("/tickets/create")
    @SendTo("/topic/tickets")
    public TicketResponse getTickets(CreateTicketMessage message) throws Exception {
        try {
            final var newTicket = this.ticketRepository.save(Ticket.fromMessage(message));
            tickets.add(newTicket);

            this.onAssignTicket();

            return this.getSuccessResponse("Ticket created successfully");
        } catch (Exception e) {
            return this.getErrorResponse("Error creating ticket: " + e.getMessage());
        }
    }

    @MessageMapping("/tickets/resolve")
    @SendTo("/topic/tickets")
    public TicketResponse resolveTicket(ResolveTicketMessage message) throws Exception {
        try {
            final var ticket = this.ticketRepository.findById(message.ticketId())
                    .orElseThrow(() -> new NoSuchElementException("Ticket not found"));

            ticket.setStatus(TicketStatus.RESOLVED);
            this.ticketRepository.save(ticket);
            this.tickets.remove(ticket);

            this.onAssignTicket();

            return this.getSuccessResponse("Ticket resolved successfully");
        } catch (NoSuchElementException e) {
            return this.getErrorResponse("Not found ticket: " + e.getMessage());
        } catch (Exception e) {
            return this.getErrorResponse("Error resolving ticket: " + e.getMessage());
        }
    }

    private Optional<String> getAvailableResolver() {
        final var counter = new HashMap<String, Number>();
        userRepository.findByRole(Role.RESOLVER)
                .forEach(resolver -> {
                    final var assignments = this.tickets.stream()
                            .filter(ticket -> {
                                if (ticket.getStatus() == TicketStatus.RESOLVED) return false;
                                final var assignedTo = ticket.getAssignedTo();
                                if (assignedTo == null) return false;
                                return assignedTo.equals(resolver.getUsername());
                            })
                            .count();

                    counter.put(resolver.getUsername(), assignments);
                });

        try {
            return Optional.of(counter.entrySet().stream()
                    .filter(entry -> entry.getValue().intValue() < 3)
                    .sorted(Comparator.comparingInt(stringNumberEntry -> stringNumberEntry.getValue().intValue()))
                    .map(Map.Entry::getKey).sorted().toList().getFirst());
        } catch (NoSuchElementException e) {
            return Optional.empty();
        }
    }

    private void onAssignTicket() {
        final var availableResolver = this.getAvailableResolver();

        final var peekedTicket = this.getTicketQueue().stream()
                .filter(ticket -> ticket.getAssignedTo() == null)
                .filter(ticket -> ticket.getStatus() != TicketStatus.RESOLVED)
                .toList().getFirst();

        if (availableResolver.isPresent() && peekedTicket != null) {
            peekedTicket.setAssignedTo(availableResolver.get());
            peekedTicket.setStatus(TicketStatus.IN_PROGRESS);
            this.ticketRepository.save(peekedTicket);
        }
    }

    private PriorityQueue<Ticket> getTicketQueue() {
        final var queue = new PriorityQueue<Ticket>();
        queue.addAll(this.tickets);
        return queue;
    }

    private TicketResponse getSuccessResponse(String message) {
        return new TicketResponse(TicketResponseCode.SUCCESS, message, this.getTicketQueue());
    }

    private TicketResponse getErrorResponse(String message) {
        return new TicketResponse(TicketResponseCode.ERROR, message, this.getTicketQueue());
    }
}
