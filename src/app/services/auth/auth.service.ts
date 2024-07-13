import { Injectable } from '@angular/core';
import {Auth,signInWithPhoneNumber,RecaptchaVerifier} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

appVerifier: any;
  confirmationResult: any;
  constructor(
    private _fireAuth:Auth
  ) { }
  recaptcha(){
   
    
    this.appVerifier = new RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response: any) => {
        console.log(response);
      },
      'expired-callback': () => {
        // Handle expired reCAPTCHA
      }
    }, this._fireAuth); // Assuming _fireAuth is your AngularFireAuth instance
  
  }


async  signInWithPhoneNumber(phonenumber:any){
    try {
      if(!this.appVerifier) this.recaptcha();
      const confirmationResult =await  signInWithPhoneNumber(this._fireAuth, phonenumber, this.appVerifier);
      this.confirmationResult = confirmationResult;
      return confirmationResult;
    } catch(e) {
      throw(e);
    }
  }

  async verifyOtp(otp:any) {
    try {
      if(!this.appVerifier) this.recaptcha();
      const result = await this.confirmationResult.confirm(otp);
      console.log(result);
      const user = result?.user;
      console.log(user);
    } catch(e) {
      throw(e);
    }
  }

  logout() {
    return this._fireAuth.signOut();
  }

  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this._fireAuth.onAuthStateChanged(user => {
        observer.next(!!user);
        observer.complete();
      }, err => {
        observer.error(err);
      });

    });

    
  }
  

}
