import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../entities/ticket';

@Component({
  selector: 'app-ticket-item',
  imports: [CommonModule],
  templateUrl: './ticket-item.component.html',
})
export class TicketItemComponent {
  @Input() ticket: Ticket | null = null;

  get priorityColor(): string {
    if (!this.ticket) {
      return 'bg-gray-400';
    }
    switch (this.ticket.priority) {
      case 'LOW':
        return 'bg-green-400';
      case 'MEDIUM':
        return 'bg-yellow-400';
      case  'HIGH':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  }
}
