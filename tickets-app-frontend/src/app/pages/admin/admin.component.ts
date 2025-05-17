import { Component } from '@angular/core';
import { TicketsQueueComponent } from "../../components/tickets-queue/tickets-queue.component";
import { TicketsResolvedComponent } from "../../components/tickets-resolved/tickets-resolved.component";
import { TicketsProcessComponent } from "../../components/tickets-process/tickets-process.component";
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Component({
  selector: 'app-admin',
  imports: [TicketsQueueComponent, TicketsResolvedComponent, TicketsProcessComponent],
  templateUrl: './admin.component.html',
  styles: ``
})
export class AdminComponent {
  private stompClient!: Client;

  ngOnInit() {
    const socket = new SockJS('http://127.0.0.1:8080/ws/v1');
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      }
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/tickets', (message: IMessage) => {
        console.log('Received message: ' + message.body);
      });
    };

    this.stompClient.activate();
  }

  sendMessage() {
    this.stompClient.publish({
      destination: '/app/tickets',
      body: JSON.stringify({ message: 'Hola!' })
    });
  }
}
