import { Component, Input } from '@angular/core';
import { TicketItemComponent } from "../ticket-item/ticket-item.component";
import { Ticket } from '../../entities/ticket';

@Component({
  selector: 'app-tickets-queue',
  imports: [TicketItemComponent],
  templateUrl: './tickets-queue.component.html',
})
export class TicketsQueueComponent {
  @Input() tickets: Ticket[] = []

}
