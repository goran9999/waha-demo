import { Injectable } from '@angular/core';
import { env } from '../config/env';
import { io, Socket } from 'socket.io-client';
@Injectable({ providedIn: 'root' })
export class WsService {
  public socket: Socket;

  constructor() {}

  connect() {
    this.socket = io(env.ws_url);
    const jwt = localStorage.getItem('user.jwt');
    this.socket.emit('auth', jwt);
    this.socket.on('connection', () => {
      console.log('Socket connected');
    });
  }

  sendMessage(message: string): void {
    this.socket.send(message);
  }

  closeConnection(): void {
    this.socket.close();
  }
}
