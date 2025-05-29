import { TicketPriority } from './ticketPriority'
import { TicketStatus } from './ticketStatus'
import { User } from './user'

export interface Ticket {
  id: number
  identification: string
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  status: TicketStatus
  priority: TicketPriority
  assignedTo?: string
  description: string
  createdAt: Date
  updatedAt: Date
  createdBy: User
  
}
