import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { WsService } from '../../services/ws.service';

@Component({
  templateUrl: './link-whatsapp.component.html',
  selector: 'app-link-whatsapp',
  styleUrls: ['./link-whatsapp.component.scss'],
})
export class LinkWhatsappComponent implements OnInit, OnDestroy {
  qrCode: string | undefined;
  loadingQr: boolean;
  pollingInterval: any;

  constructor(
    private whatsappService: WhatsappService,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
  }
  ngOnInit(): void {
    this.pollingInterval = setInterval(() => {
      this.pollQrCode();
    }, 3000);
  }

  whatsappAuth() {
    this.loadingQr = true;
    this.qrCode = undefined;
    this.whatsappService.linkWhatsapp().subscribe(
      (res: any) => {
        this.qrCode = res.qrCode;
        this.loadingQr = false;
      },
      (err: any) => {
        this.loadingQr = false;
      }
    );
  }

  pollQrCode() {
    const userId = localStorage.getItem('user.googleID');
    this.whatsappService.pollSessionStatus().subscribe(
      (res: any) => {
        if (
          res.sessions.find(
            (s: any) => s.status === 'WORKING' && s.name === userId
          )
        ) {
          this.router.navigate([`home/${userId}`]);
        }
      },
      (err) => {}
    );
  }
}
