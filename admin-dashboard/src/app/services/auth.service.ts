import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private afa: AngularFireAuth, private toastr: ToastrService, private router: Router) {

  }

  login(loginData) {
    this.afa.signInWithEmailAndPassword(loginData.email, loginData.password).then(() => {
      // console.log('Logged in');
      this.toastr.success('Logged in successfully!');
      this.loadUser();
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }).catch(() => {
      this.toastr.error('Invalid email or password!');
    });
  }

  loadUser() {
    this.afa.authState.subscribe(user=> {
      if (user) {
        // console.log(JSON.parse(JSON.stringify(user)));
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        console.log('No user');
      }
    })
  }

  logOut() {
    this.afa.signOut().then(() => {
      this.toastr.success('Logged out successfully!');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.router.navigate(['/login']);
    }).catch(() => {
      this.toastr.error('Something went wrong!');
    });
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}
