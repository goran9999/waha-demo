import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User } from '../../model/user.model';
import { WhatsappChat, WhatsappMessage } from '../../model/whatsapp.model';
import { UserService } from '../../services/user.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { WsService } from '../../services/ws.service';
import dayjs from 'dayjs';

@Component({
  templateUrl: './chat.component.html',
  selector: 'app-chat',
  styleUrls: ['./chat.scss'],
})
export class ChatComponent implements OnInit {
  user: User;
  chats: WhatsappChat[];
  selectedChat?: WhatsappChat;
  chatMessages: WhatsappMessage[];
  constructor(
    private wsService: WsService,
    private userService: UserService,
    private whatsappService: WhatsappService
  ) {
    this.selectedChat = undefined;
  }

  ngOnInit(): void {
    console.log('connecting to ws');
    this.wsService.connect();
    this.getData();
  }

  getData() {
    this.userService.getUser()?.subscribe((res: any) => {
      this.user = res.user as User;
    });
    this.getChats();
  }

  getChats() {
    this.whatsappService.getChats().subscribe((res: any) => {
      this.chats = res.chats;
    });
  }

  onSelectedChat(chat: WhatsappChat) {
    this.selectedChat = chat;
    this.whatsappService.getChatMessages(chat).subscribe((res: any) => {
      this.chatMessages = res.messages;
    });
  }

  getFormatedDate(date: Date) {
    const parsedDate = dayjs(date);
    const diff = dayjs().diff(date, 'day');
    switch (diff) {
      case 0: {
        return `${parsedDate.get('hour')}:${parsedDate.get('minutes')}`;
      }
      case 1: {
        return 'Yesterday';
      }
      default: {
        return `${parsedDate.get('day') + 1}/${
          parsedDate.get('month') + 1
        }/${parsedDate.get('year')}`;
      }
    }
  }
}
