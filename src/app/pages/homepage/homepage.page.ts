import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  GestureController,
  IonSegment,
  NavController,
  Platform,
} from '@ionic/angular';
import { IonicSlides } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { SelectcontactPage } from '../selectcontact/selectcontact.page';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { UserChatPage } from '../user-chat/user-chat.page';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { AuthService } from 'src/app/services/auth/auth.service';

import Swiper, { SwiperOptions, Pagination } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

// Install Swiper modules

// Install Swiper modules
Swiper.use([Pagination]);
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements AfterViewInit {
  imageUrl: any;
 async logout() {
    localStorage.clear();
   await this.auth.logout();
   this.navCtrl.navigateRoot(['login'], {
    animated: true,
    animationDirection: 'forward'
  });
    
  }

  @ViewChild('swiper', { static: false }) swiperRef!: SwiperComponent;
  @ViewChild('segmentchild', { static: false }) segmentchild!: IonSegment;


  swiperConfig: SwiperOptions = {
    slidesPerView:1,
    on: {
      slideChange: (ev:any) => this.onSlideChange(ev)
    }
  };

  slidechange:boolean=false;
  firsttimechange:boolean=false;
  onSlideChange(ev:any) {
 
  console.log(this.swiperRef.swiperRef.activeIndex);
  this.slidechange=true;
  this.segmentChanged(this.swiperRef.swiperRef.activeIndex);

  }
  ngAfterViewInit() {
    this.onSlideChange(this.swiperRef.swiperRef.activeIndex=1); 
    if(localStorage.getItem('photo')){
       this.imageUrl=localStorage.getItem('photo');
    }else{
      this.chatservice.imageUrl$.subscribe(url => {
        this.imageUrl = url;
      }); 
    }
   
  }

  activeSegment: any = 'chats';

  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private modal: ModalController,
    private platform: Platform,
    private chatservice: ChatService,
    private route: Router,
    private auth: AuthService,
    private gestureCtrl: GestureController
  ) {
    this.callchatapi();
   
    this.platform.backButton.subscribe(() => {
      if (this.route.url === '/home') {
        //App.exitApp();
      } else {
        this.route.navigate(['/home']);
      }
    });
  }

  onclick() {
    const vid = document.getElementById('myVideo') as HTMLVideoElement;
    vid.play();
  }
  data: any[] = [];
  callchatapi() {
    let url = './assets/data.json';
    this.http.get(url).subscribe((result: any) => {
      this.data = [];
      const ans = result.chatsdata;

      for (let i = 0; i < ans.length; i++) {
        const obj: chatdata = {
          name: ans[i].name,
          time: ans[i].time,
          phonenumber:ans[i].phonenumber
        };
        this.data.push(obj);
      }
    });
    return this.data;
  }
  segmentChanged(event: any) {
    const segments = ['people', 'chats', 'status', 'calls'];
    if (this.slidechange) {
      this.activeSegment = segments[event];
      this.segmentchild.value = this.activeSegment;
      this.slidechange = false;
    } else {
      // Handle segment change triggered by IonSegment button click
      this.activeSegment = event.detail.value;
      const ind = segments.findIndex(segment => segment === this.activeSegment);
      this.callFromSegment(ind);
    }

    // Additional logic based on segment change
    Haptics.impact({style: ImpactStyle.Medium});

  }

  callFromSegment(index: number) {
    // Logic to handle slide change in Swiper based on segment change
    this.swiperRef.swiperRef.slideTo(index);
  }

  async openuserchat(ev: any,receiverphonenumber:string) {
    console.log(ev);
    localStorage.setItem('mytime', ev);
    const modal = await this.modal.create({
      component: UserChatPage,
      componentProps: {
        receiverphonenumber:receiverphonenumber
      },
    });
    modal.present();
  }

  async opencamera() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });
    var imageUrl = image.webPath;

    // Can be set to the src of an image now
    console.log(imageUrl, 'yhin h');
  }
  async openmodal() {
    const modal = await this.modal.create({
      component: SelectcontactPage,
    });
    modal.present();
  }

 

 
}

interface chatdata {
  name: string;
  time: string;
  phonenumber:string;
}
