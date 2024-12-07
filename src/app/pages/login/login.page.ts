import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  otparr: any[] = [];

  @ViewChildren('otpinput') otpInputs?: QueryList<ElementRef>;

  constructor(
    private modal: ModalController,
    private auth: AuthService,
    private http: HttpClient,
    private route: Router,
    private alertController: AlertController,
    private loadingcontroller: LoadingController,
    private navCtrl: NavController
  ) {
    this.checkotp = false;
    this.otparr = new Array(6).fill('');
  }
  ngAfterViewInit(): void {
    if (this.otpInputs?.first) {
      this.otpInputs.first.nativeElement.focus();
    }
  }

  arr: any[] = [];

  ngOnInit() {
    this.http.get('./assets/userdatabase.json').subscribe(async(res: any) => {
      this.arr = await res.usernumber;
    });
  }
  otp: string = '';

  mobilenumber: string = '';
  checkotp: boolean = false;
  enterotp() {
    this.checkotp = true;
    console.log(this.mobilenumber);
    const res = this.auth.signInWithPhoneNumber('+91' + this.mobilenumber);
    console.log(res);
  }

  async gotohomepage() {
    if (this.flag == true) {
      this.navCtrl.navigateRoot(['homepage'], {
        animated: true,
        animationDirection: 'forward',
      });
   }
  }

  handleback(i: any, e: any) {
    if (
      e.key === 'Backspace' &&
      !this.otparr[i] &&
      i > 0 &&
      this.otpInputs?.toArray()[i - 1].nativeElement &&
      i < this.otparr.length
    ) {
      this.otpInputs?.toArray()[i - 1].nativeElement.focus();
    }
  }

  flag: boolean = false;
  async verifyOtp(a: any) {
    const loading = await this.loadingcontroller.create({
      message: 'Please wait...',
      duration: 500,
      translucent: true,
    });
  
    await loading.present();
  
    try {
      this.otp = a;
  
      // Verify OTP
      const res= await this.auth.verifyOtp(this.otp);
     if(res){
        this.flag = true;
  
        // Check if mobile number exists in user list
        for (const user of this.arr) {
          if (user.phonenumber === this.mobilenumber) {
             this.gotohomepage();
            return; // Exit after navigating to the homepage
          // }else{
          //   const alert = await this.alertController.create({
          //     header: 'Alert',
          //     message: 'Phone number not found. Please register first.',
          //     buttons: ['OK'],
          //   });
          //    alert.present();
           }
        
  
      
      } 
    }
    } catch (e) {
      console.error('Error verifying OTP:', e);
      await loading.dismiss();
  
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Please Enter Correct OTP',
        buttons: ['OK'],
      });
  
      await alert.present();
    } finally {
      await loading.dismiss(); // Ensure loading is dismissed
    }
  }
  
  moveFocus(i: any, event: any) {
    const inputelement = event.target;
    let value = inputelement.value;
    const otp = [...this.otparr];
    console.log(i);
    otp[i] = value.substring(value.length - 1);
    //this.otparr=[];
    this.otparr = otp;
    const combinedotp = this.otparr.join('');
    if (this.otparr.length == 6 && !this.otparr.includes('')) {
      this.verifyOtp(combinedotp);
    } else if (value !== '' && i < 6) {
      this.otpInputs?.toArray()[i + 1].nativeElement.focus();
    }
  }

  trackByFn(index: number) {
    return index;
  }
}
interface faizan {
  phonenumber: string;
}
