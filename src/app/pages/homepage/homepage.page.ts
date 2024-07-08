import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonicSlides } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { SelectcontactPage } from '../selectcontact/selectcontact.page';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { UserChatPage } from '../user-chat/user-chat.page';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  activeSegment: string = 'chats';
  @ViewChild('slides') slides:any;
  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private modal: ModalController,
    private chatservice:ChatService,
    private route:Router
  ) {
    this.callchatapi();
    
  }

onclick(){
  const vid = document.getElementById("myVideo")as HTMLVideoElement; 
    vid.play(); 
 
}
  data: any[] = [];
  callchatapi() {
    let url = './assets/data.json';
    this.http.get(url).subscribe((result: any) => {
      this.data = [];
      const ans = result.chatsdata;
      console.log(ans);
      for (let i = 0; i < ans.length; i++) {
        const obj: chatdata = {
          name: ans[i].name,
          time: ans[i].time,
        };
        this.data.push(obj);
        
      }
    });
    return this.data;
  }

  
  


  segmentChanged(event: any) {
    this.activeSegment = event.detail.value;

    console.log(this.activeSegment);
    if (this.activeSegment == 'chats') {
      this.callchatapi();
        
    }
    
    Haptics.vibrate();
  }

 async openuserchat(ev:any) {
    console.log(ev);
    localStorage.setItem("mytime", ev);
    const modal = await this.modal.create({
      component: UserChatPage,
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

  ngOnInit() {}
}

interface chatdata {
  name: string;
  time: string;
}
