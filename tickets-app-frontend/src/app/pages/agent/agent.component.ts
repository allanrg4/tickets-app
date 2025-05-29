import { Component, computed, inject } from '@angular/core';
import { TicketsFormComponent } from "../../components/tickets-form/tickets-form.component";
import { TicketsQueueComponent } from "../../components/tickets-queue/tickets-queue.component";
import { TicketResource } from '../../resources/TicketResource';
import { TicketStatus } from '../../entities/ticketStatus';

@Component({
  selector: 'app-agent',
  imports: [TicketsFormComponent, TicketsQueueComponent],
  templateUrl: './agent.component.html',
  styles: ``
})
export class AgentComponent {
  readonly resource = inject(TicketResource);

  readonly queueTickets = computed(() =>
    this.resource.tickets().filter((t) => t.status === TicketStatus.PENDING))

}
