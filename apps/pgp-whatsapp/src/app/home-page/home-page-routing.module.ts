import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { WhatsappGuard } from '../guards/whatsapp.guard';
import { ChatBoxComponent } from './chat/chat-box/chat-box.component';
import { ChatComponent } from './chat/chat.component';
import { HomePageComponent } from './home-page.component';
import { LinkWhatsappComponent } from './link-whatsapp/link-whatsapp.component';

const routes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: '', component: LinkWhatsappComponent },
      {
        path: ':userId',
        component: ChatComponent,

        // canActivate: [WhatsappGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
