import { Component, computed, inject } from '@angular/core'
import { TicketsQueueComponent } from '../../components/tickets-queue/tickets-queue.component'
import { TicketsResolvedComponent } from '../../components/tickets-resolved/tickets-resolved.component'
import { TicketsProcessComponent } from '../../components/tickets-process/tickets-process.component'
import { TicketResource } from '../../resources/TicketResource'
import { TicketStatus } from '../../entities/ticketStatus'

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ TicketsQueueComponent, TicketsResolvedComponent, TicketsProcessComponent],
  templateUrl: './admin.component.html',
  styles: ``,
})
export class AdminComponent {
  readonly resource = inject(TicketResource)

  readonly queueTickets = computed(() =>
  this.resource.tickets().filter((t) => t.status === TicketStatus.PENDING))

  readonly processTickets = computed(() =>
  this.resource.tickets().filter((t) => t.status === TicketStatus.IN_PROGRESS))

  readonly resolvedTickets = computed(() =>
  this.resource.tickets().filter((t) => t.status === TicketStatus.RESOLVED))
}
