import { Component, inject } from '@angular/core'
import { TicketsQueueComponent } from '../../components/tickets-queue/tickets-queue.component'
import { TicketsResolvedComponent } from '../../components/tickets-resolved/tickets-resolved.component'
import { TicketsProcessComponent } from '../../components/tickets-process/tickets-process.component'
import { TicketResource } from '../../resources/TicketResource'
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [JsonPipe, TicketsQueueComponent, TicketsResolvedComponent, TicketsProcessComponent],
  templateUrl: './admin.component.html',
  styles: ``,
})
export class AdminComponent {
  readonly resource = inject(TicketResource)

  onCreate() {
    this.resource.createTicket({
      identification: 'Angel',
      firstName: 'Allan',
      lastName: 'Rodriguez',
      phoneNumber: '31109364',
      email: '0x.allan@gmail.com',
      description: 'Test message',
      priority: 'high',
    })
  }

  onResolve() {
    this.resource.resolveTicket({
      ticketId: 1,
    })
  }
}
