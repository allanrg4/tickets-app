package com.umg.ticket_app_backend.controllers;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class TicketController {
    @MessageMapping("/tickets")
    @SendTo("/topic/tickets")
    public Content getTickets(Message message) throws Exception {
        return new Content(message.message() + " - From Server :D");
    }
}

record Message(String message) {
}

record Content(String content) {
}
