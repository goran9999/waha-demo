import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../config/env';
import { WhatsappChat } from '../model/whatsapp.model';
import { UserService } from './user.service';
@Injectable()
export class WhatsappService {
  apiUrl = env.api;
  wahaUrl = env.waha_api;
  constructor(private http: HttpClient, private userService: UserService) {}

  getUserContacts(userId: string) {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  linkWhatsapp() {
    console.log(this.getParams(), 'PPS');
    return this.http.get(
      `${this.apiUrl}/whatsapp/link/${localStorage.getItem('user.googleID')}`,
      {
        headers: this.getParams(),
      }
    );
  }

  pollSessionStatus() {
    return this.http.get(`${this.apiUrl}/whatsapp/sessions`, {
      headers: this.getParams(),
    });
  }

  getChats() {
    return this.http.get(`${this.apiUrl}/whatsapp/chats`, {
      headers: this.getParams(),
    });
  }

  getChatMessages(chat: WhatsappChat) {
    return this.http.get(`${this.apiUrl}/whatsapp/chats/${chat.user}`, {
      headers: this.getParams(),
    });
  }

  sendMessage(message: string, chat: WhatsappChat, image?: string) {
    return this.http.post(
      `${this.apiUrl}/whatsapp/sendText`,
      {
        message,
        chat: this.formatWaNumber(chat),
        image,
      },
      {
        headers: this.getParams(),
      }
    );
  }

  formatWaNumber(chat: WhatsappChat) {
    return `${chat.user}@c.us`;
  }

  getParams() {
    const jwt = this.userService.extractJwt();

    if (!jwt) throw new Error('Unauthorized');

    return {
      Authorization: `Bearer ${jwt}`,
    };
  }
}
