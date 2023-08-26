import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth, private toastr: ToastrService) {

  }

  login(loginData) {
    this.afa.signInWithEmailAndPassword(loginData.email, loginData.password).then(() => {
      console.log('Logged in');
      this.toastr.success('Logged in successfully!');
    }).catch(() => {
      this.toastr.error('Invalid email or password!');
    });
  }
}
