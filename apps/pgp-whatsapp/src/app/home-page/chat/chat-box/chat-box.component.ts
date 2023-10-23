import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import dayjs from 'dayjs';
import { WhatsappChat, WhatsappMessage } from '../../../model/whatsapp.model';
import { WhatsappService } from '../../../services/whatsapp.service';
import { WsService } from '../../../services/ws.service';
import { ChatComponent } from '../chat.component';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements AfterViewInit {
  @ViewChild('content') content: ElementRef;
  inputValue: '';
  @Input() messages: WhatsappMessage[];
  @Input() selectedChat?: WhatsappChat;

  constructor(
    private chatComponent: ChatComponent,
    private wsService: WsService,
    private whatsappService: WhatsappService,
    private renderer: Renderer2
  ) {
    this.updateMessages();
  }
  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  onEnterKey() {
    this.sendMessage();
  }

  scrollToBottom() {
    try {
      this.content.nativeElement.scrollTop =
        this.content.nativeElement.scrollHeight;
      console.log(this.content.nativeElement.scrollTop, 'APLIED');
    } catch (err) {
      console.log(err);
    }
  }
  onButtonClickKey() {
    this.sendMessage();
  }

  sendMessage() {
    if (this.inputValue !== '' && this.selectedChat) {
      this.whatsappService
        .sendMessage(this.inputValue, this.selectedChat)
        .subscribe();
      this.inputValue = '';
      this.scrollToBottom();
    }
  }

  getMessageTime(message: WhatsappMessage) {
    const parsedDate = dayjs(message.sentAt);

    return `${parsedDate.get('hours')}:${parsedDate.get('minutes')}`;
  }

  updateMessages() {
    this.wsService.socket.on('message', (data) => {
      const parsedData = JSON.parse(data);
      if (parsedData.event === 'message') {
        const storedMessages = [...this.messages];
        storedMessages.push(JSON.parse(parsedData.body));
        this.messages = [...storedMessages];
        this.scrollToBottom();
      }
    });
  }
}
