import { Component, Input } from '@angular/core';
import { TicketItemComponent } from "../ticket-item/ticket-item.component";
import { Ticket } from '../../entities/ticket';

@Component({
  selector: 'app-tickets-resolved',
  imports: [TicketItemComponent],
  templateUrl: './tickets-resolved.component.html',
})
export class TicketsResolvedComponent {
  @Input() tickets: Ticket[] = []
}
