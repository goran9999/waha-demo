import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WhatsappGuard } from '../guards/whatsapp.guard';
import { UserService } from '../services/user.service';
import { WhatsappService } from '../services/whatsapp.service';
import { ChatBoxComponent } from './chat/chat-box/chat-box.component';
import { ChatComponent } from './chat/chat.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { LinkWhatsappComponent } from './link-whatsapp/link-whatsapp.component';
import { FormsModule } from '@angular/forms';
import { Spinner } from '../components/spinner/spinner.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [CommonModule, HomePageRoutingModule, FormsModule, ToastrModule],
  declarations: [
    HomePageComponent,
    LinkWhatsappComponent,
    ChatComponent,
    ChatBoxComponent,
    Spinner,
  ],
  providers: [UserService, WhatsappGuard, WhatsappService],
})
export class HomePageModule {}
