import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  
  private socket$: WebSocketSubject<any> = webSocket('ws://localhost:8080/ws');

  readonly service = this.socket$;

  sendMessage(message: any): void {
    this.socket$.next(message);
  }

  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  closeConnection(): void {
    this.socket$.complete();
  }
}
