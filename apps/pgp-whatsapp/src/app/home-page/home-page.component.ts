import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { WhatsappService } from '../services/whatsapp.service';

@Component({
  templateUrl: './home-page.component.html',
  selector: 'app-home-page',
})
export class HomePageComponent implements OnInit {
  hasLinkedWhatsapp: boolean;
  sessionStatus: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private whapsappService: WhatsappService
  ) {
    this.hasLinkedWhatsapp = userService.hasUserLikedWhatsapp();
  }
  ngOnInit(): void {
    const session = this.whapsappService
      .pollSessionStatus()
      .subscribe((res: any) => {
        this.sessionStatus = res.sessions[0].status;
      });

    if (this.hasLinkedWhatsapp && this.sessionStatus === 'WORKING') {
      this.router.navigate([localStorage.getItem('user.googleID')]);
    }
  }
}
