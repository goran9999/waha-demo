import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class WhatsappGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const hasLinked = this.userService.hasUserLikedWhatsapp();

    if (!hasLinked) {
      this.router.navigate(['/auth']);
      return false;
    } else {
      return hasLinked;
    }
  }
}
