import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import googleCredentials from '../../config/google-client.json';
import { UserService } from '../../services/user.service';

declare const google: any;
@Component({
  templateUrl: './signin.component.html',
  selector: 'app-signin',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements AfterViewInit {
  reloadsCount = 0;
  constructor(private userService: UserService, private router: Router) {}
  ngAfterViewInit(): void {
    this.showLogInButton();
  }

  async ngOnInit() {
    this.showLogInButton();
  }
  showLogInButton() {
    try {
      google.accounts.id.initialize({
        client_id: googleCredentials['google-client'],
        callback: this.handleResponse.bind(this),
        prompt: 'none',
      });
      google.accounts.id.renderButton(document.getElementById('googleButton'), {
        theme: 'filled_blue',
        size: 'large',
        width: '100%',
        type: 'standard',
        logo_alignment: 'left',
        text: 'Log in with Google',
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleResponse(response: any) {
    this.userService.register(response.credential).subscribe(
      (res: any) => {
        localStorage.setItem('user.email', res.user.email);
        localStorage.setItem('user.whatsapp', res.user.phoneNumbers);
        localStorage.setItem('user.jwt', response.credential);
        localStorage.setItem('user.id', res.user._id);
        localStorage.setItem('user.googleID', res.user.googleID);
        this.router.navigate(['home']);
      },
      (err: any) => {}
    );
  }
}
