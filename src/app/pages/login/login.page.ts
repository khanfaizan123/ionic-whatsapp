import { Component, OnInit } from '@angular/core';
import {  AlertController, LoadingController, ModalController } from '@ionic/angular';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  constructor(
    private modal: ModalController,
    private auth: AuthService,
    private http:HttpClient,
    private route: Router,
    private alertController:AlertController,
    private loadingcontroller:LoadingController
  ) {
    this.checkotp = false;
  }

  
  arr:any[]=[];

  ngOnInit() {

    this.http.get('./assets/userdatabase.json').subscribe((res:any)=>{
      
      this.arr=res.usernumber;
      
    
    })
  
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
      this.route.navigate(['/homepage']);
    }
  }
  flag: boolean = false;
  async verifyOtp() {
    const loading = await this.loadingcontroller.create({
      message: 'Please wait...', 
      duration: 500, 
      translucent: true
    });
  
    await loading.present();
    try {
      const response = await this.auth.verifyOtp(this.otp);
      this.flag = true;
      this.arr.find((user)=>{
        if(user.phonenumber==this.mobilenumber){
          console.log(user.phonenumber,"yhi pe hai");
          this.gotohomepage();
        }
      })

     
    } catch (e) {
      const alert = await this.alertController.create({
        header: 'Alert',
        message: 'Please Enter Correct Otp',
        buttons: ['OK'],
      });
     
  
      await alert.present();


   
     
    }
  }
}
interface faizan{
  phonenumber:string
}


