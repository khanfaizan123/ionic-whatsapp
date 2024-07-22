import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';


// import Swiper core and required modules
import SwiperCore from 'swiper';
import { FcmService } from './services/fcm/fcm.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
 
  constructor( private platform: Platform,
    private authService: AuthService,
    private router: Router,
  private fcmService:FcmService) {

  this.initializeApp();
  }

  ngOnInit(){
    this.fcmService.requestPermission();
    this.fcmService.listenForMessages();
    this.fcmService.checkPermissions();
    console.log(this.fcmService.listenForMessages());
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.authService.isLoggedIn().subscribe(user => {
        if (user) {
          this.router.navigate(['/homepage']);
        } else {
          this.router.navigate(['/login']);
        }
      });
    });
  }
}
