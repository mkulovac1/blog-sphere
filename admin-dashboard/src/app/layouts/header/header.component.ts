import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService) { }

  emailHeader: string = '';
  isLoggedIn$: Observable<boolean>;

  ngOnInit(): void {
    this.emailHeader = JSON.parse(localStorage.getItem('user')).email;
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logOut();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


}
