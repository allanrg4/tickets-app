import { Component, inject, OnInit } from '@angular/core';
import { TicketsQueueComponent } from "../../components/tickets-queue/tickets-queue.component";
import { TicketsResolvedComponent } from "../../components/tickets-resolved/tickets-resolved.component";
import { TicketsProcessComponent } from "../../components/tickets-process/tickets-process.component";
import { IMessage } from '@stomp/stompjs';
import { TicketSocketService } from '../../services/ticket-socket.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [TicketsQueueComponent, TicketsResolvedComponent, TicketsProcessComponent],
  templateUrl: './admin.component.html',
  styles: ``
})
export class AdminComponent implements OnInit {

  readonly socket = inject(TicketSocketService)

  ngOnInit(): void {
    this.socket.connect((message: IMessage) => {
      console.log('Received message: ' + message.body);
    });
  }

  sendMessage(): void {
    this.socket.sendMessage({ message: 'Hola!' });
  }
}
