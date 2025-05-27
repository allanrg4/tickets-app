import { Component, inject, signal } from '@angular/core';
import { TicketItemComponent } from "../../components/ticket-item/ticket-item.component";
import { Ticket } from '../../entities/ticket';
import { TicketResource } from '../../resources/TicketResource';

@Component({
  selector: 'app-resolver',
  imports: [TicketItemComponent],
  templateUrl: './resolver.component.html',
  styles: ``
})
export class ResolverComponent {
  selectedTicket = signal<Ticket | null>(null);
  readonly resource = inject(TicketResource)

  onTicketSelected(ticket: Ticket) {
    this.selectedTicket.set(ticket);
  }


  onResolve() {
    this.resource.resolveTicket({
      ticketId: 1,
    })
  }
}
