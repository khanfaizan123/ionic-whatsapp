import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth/auth.service';


// import Swiper core and required modules
import SwiperCore from 'swiper';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
 
  constructor( private platform: Platform,
    private authService: AuthService,
    private router: Router) {

  this.initializeApp();
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
