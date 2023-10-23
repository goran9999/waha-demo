import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  templateUrl: './auth.component.html',
  selector: 'app-auth',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private userService: UserService) {}
}
