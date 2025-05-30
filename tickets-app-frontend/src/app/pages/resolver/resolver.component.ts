import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../entities/ticket';
import { TicketResource } from '../../resources/TicketResource';
import { AuthService } from '../../services/auth.service';
import { TicketStatus } from '../../entities/ticketStatus';
import { TicketsResolvedComponent } from "../../components/tickets-resolved/tickets-resolved.component";

@Component({
  selector: 'app-resolver',
  imports: [TicketsResolvedComponent, CommonModule],
  templateUrl: './resolver.component.html',
  styles: ``
})
export class ResolverComponent {
  selectedTicket = signal<Ticket | null>(null);
  readonly resource = inject(TicketResource)
  private authService = inject(AuthService);
  
  user = this.authService.currentUser;

  readonly processTickets = computed(() => {
    const currentUser = this.user();
    if (!currentUser) return [];
    return this.resource.tickets().filter(
      (t) => t.status === TicketStatus.IN_PROGRESS && t.assignedTo === currentUser.username
    );
  });

  autoSelectFirstTicket = effect(() => {
    const tickets = this.processTickets();
    if (tickets.length > 0 && !this.selectedTicket()) {
      this.selectedTicket.set(tickets[0]);
    }
  });

  onTicketSelected(ticket: Ticket) {
    this.selectedTicket.set(ticket);
  }


onResolve(ticketId: number) {
  this.resource.resolveTicket({ ticketId });

  this.selectedTicket.set(null);

  setTimeout(() => {
    const tickets = this.processTickets();
    if (tickets.length > 0) {
      this.selectedTicket.set(tickets[0]);
    } else {
      this.selectedTicket.set(null);
    }
  }, 200);
}

}
