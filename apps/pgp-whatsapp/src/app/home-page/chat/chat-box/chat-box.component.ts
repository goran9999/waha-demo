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
  image: string | undefined;
  @Input() messages: WhatsappMessage[];
  @Input() selectedChat?: WhatsappChat;
  @ViewChild('fileInput') fileInput: ElementRef;

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

  onImageUpload(event: any) {
    this.convertToBase64(event.target.files[0]);
  }

  private convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Data = reader.result as string;
      this.image = base64Data;
    };
  }

  onUploadFileClick() {
    this.fileInput.nativeElement.click();
  }

  onRemoveImage() {
    this.image = undefined;
  }

  sendMessage() {
    if (this.inputValue !== '' && this.selectedChat) {
      this.whatsappService
        .sendMessage(this.inputValue, this.selectedChat, this.image)
        .subscribe();
      this.inputValue = '';
      this.image = undefined;
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
