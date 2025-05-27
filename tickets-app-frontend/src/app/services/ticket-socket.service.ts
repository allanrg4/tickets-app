import { Injectable } from '@angular/core'
import { Client, IMessage } from '@stomp/stompjs'
import SockJS from 'sockjs-client'

const SOCKET_URL = 'http://127.0.0.1:8080/ws/v1'

type Topic = [string, (message: IMessage) => void]

@Injectable({ providedIn: 'root' })
export class TicketSocketService {
  private stompClient = new Client({
    webSocketFactory: () => new SockJS(SOCKET_URL),
    reconnectDelay: 5000,
  })

  public onConnect(params: { topics: Topic[]; onConnected?: () => void }) {
    this.stompClient.onConnect = () => {
      params.topics.forEach(([topic, callback]) => {
        this.stompClient.subscribe(topic, callback)
      })

      params.onConnected?.()
    }

    this.stompClient.activate()
  }

  public sendMessage(destination: string, message: unknown) {
    if (!this.stompClient.connected) return

    this.stompClient.publish({
      destination: destination,
      body: JSON.stringify(message),
    })
  }
}
