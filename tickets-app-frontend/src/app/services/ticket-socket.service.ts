import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class TicketSocketService {
  private stompClient!: Client;

  connect(onMessage: (msg: IMessage) => void) {
    const socket = new SockJS('http://127.0.0.1:8080/ws/v1');
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log(str)
    });

    this.stompClient.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/tickets', onMessage);
    };

    this.stompClient.activate();
  }

  sendMessage(message: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/tickets',
        body: JSON.stringify(message)
      });
    } else {
      console.warn('STOMP client is not connected.');
    }
  }
}
