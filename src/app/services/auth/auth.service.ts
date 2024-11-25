import { Injectable } from '@angular/core';
import {Auth,signInWithPhoneNumber,RecaptchaVerifier, sendSignInLinkToEmail} from '@angular/fire/auth';

import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

appVerifier: any;
  confirmationResult: any;
  constructor(
    private _fireAuth:Auth,
    private alertctrl:AlertController,
  
  ) { }
  recaptcha(){
   
    
    this.appVerifier = new RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response: any) => {
        
       
      },
      'expired-callback': () => {
        // Handle expired reCAPTCHA
      }
    }, this._fireAuth); // Assuming _fireAuth is your AngularFireAuth instance
    console.log(this.appVerifier,"appveriifr");
  }


  async signInWithPhoneNumber(phoneNumber: string) {
    try {
      if (!this.appVerifier) this.recaptcha();
      
      
          const confirmationResult = await signInWithPhoneNumber(this._fireAuth, phoneNumber, this.appVerifier);
          this.confirmationResult = confirmationResult;
       
        } catch (e:any) {
          let errorMessage = 'Too many requests for OTP. Please wait for some time.';

          if (e.code === 'auth/quota-exceeded') {
            errorMessage = 'Quota exceeded. Please try again later.';
          } else if (e.code === 'auth/invalid-app-credential') {
            errorMessage = 'Invalid API key. Please check your API key and try again.';
          } else if (e.message.includes('API key not valid')) {
            errorMessage = 'Invalid API key. Please check your API key and try again.';
          }
      
          const alert = await this.alertctrl.create({
            header: 'Alert',
            message: errorMessage,
            buttons: ['OK']
          });
          await alert.present();
          console.error('Error during sign-in:', e);
    }
  
}


  async verifyOtp(otp:any) {
    try {
      if(!this.appVerifier) this.recaptcha();
      const result = await this.confirmationResult.confirm(otp);
      console.log(result);
     
        localStorage.setItem('currentuser',result?.user.uid);
       console.log(result,JSON.parse(result?.user.uid));
   
   
    } catch(e) {
      throw(e);
    }
  }

async  logout() {
    return await this._fireAuth.signOut();
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