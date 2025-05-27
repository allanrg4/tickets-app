import { Component, Input } from '@angular/core';
import { TicketItemComponent } from "../ticket-item/ticket-item.component";
import { Ticket } from '../../entities/ticket';

@Component({
  selector: 'app-tickets-process',
  imports: [TicketItemComponent],
  templateUrl: './tickets-process.component.html',
})
export class TicketsProcessComponent {
  @Input() tickets: Ticket[] = []

}
