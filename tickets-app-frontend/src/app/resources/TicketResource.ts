import { computed, inject, Injectable, signal } from '@angular/core'
import { TicketSocketService } from '../services/ticket-socket.service'
import { Ticket } from '../entities/ticket'
import { CreateTicketDto } from '../dtos/CreateTicketDto'

@Injectable({ providedIn: 'root' })
export class TicketResource {
  private readonly service = inject(TicketSocketService)

  readonly tickets = signal<Ticket[]>([])

  readonly ticketsByUser = computed(
    () => (username: string) =>
      this.tickets().filter((ticket) => ticket.identification === username)
  )

  constructor() {
    this.service.onConnect({
      topics: [
        [
          '/topic/tickets',
          (message) => {
            const response = JSON.parse(message.body)
            console.log(response)
            this.tickets.update(() => response['data'] || [])
          },
        ],
      ],

      onConnected: () => {
        this.service.sendMessage('/app/tickets', {})
      },
    })
  }

  createTicket(createTicketDto: CreateTicketDto) {
    this.service.sendMessage('/app/tickets/create', createTicketDto)
  }

  resolveTicket(resolveTicketDto: { ticketId: number }) {
    this.service.sendMessage('/app/tickets/resolve', resolveTicketDto)
  }
}
