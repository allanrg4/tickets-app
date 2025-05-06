import { Component } from '@angular/core';
import { TicketItemComponent } from "../ticket-item/ticket-item.component";

@Component({
  selector: 'app-tickets-queue',
  imports: [TicketItemComponent],
  templateUrl: './tickets-queue.component.html',
})
export class TicketsQueueComponent {

}
