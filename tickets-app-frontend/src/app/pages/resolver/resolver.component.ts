import { Component, signal } from '@angular/core';
import { TicketItemComponent } from "../../components/ticket-item/ticket-item.component";
import { Ticket } from '../../entities/ticket';

@Component({
  selector: 'app-resolver',
  imports: [TicketItemComponent],
  templateUrl: './resolver.component.html',
  styles: ``
})
export class ResolverComponent {
  selectedTicket = signal<Ticket | null>(null);

onTicketSelected(ticket: Ticket) {
  this.selectedTicket.set(ticket);
}


}
