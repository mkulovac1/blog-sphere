import { Injectable } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard {

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.authService.isLoggedInGuard) {
      // console.log(this.authService.isLoggedInGuard);
      return true;
    }
    else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // console.log(this.authService.isLoggedInGuard);
      this.toastr.warning('You must be logged in to access this page!');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
