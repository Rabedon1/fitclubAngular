import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private client: Client;
  private cuposSubject = new Subject<any>();

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-eventos'),
      reconnectDelay: 5000,
      debug: (str) => { console.log(str); }
    });

    this.client.onConnect = () => {
      console.log('Conectado a WebSocket');
      this.client.subscribe('/topic/cupos', (message: Message) => {
        console.log('Mensaje recibido:', message.body);
        this.cuposSubject.next(JSON.parse(message.body));
      });
    };

    this.client.onStompError = (frame) => {
      console.error('Error STOMP:', frame);
    };

    this.client.onWebSocketError = (evt) => {
      console.error('Error WebSocket:', evt);
    };

    this.client.onDisconnect = (frame) => {
      console.warn('Desconectado', frame);
    };

    this.client.activate();
  }

  getCuposUpdates(): Observable<any> {
    return this.cuposSubject.asObservable();
  }
}
