import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ActionSheetController, ModalController } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ImageModalComponent } from 'src/app/image-modal/image-modal.component';

// declare var cordova: any;

// Start screen recording

declare var window: any;
@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.page.html',
  styleUrls: ['./user-chat.page.scss'],
})
export class UserChatPage implements OnInit {
  messageSubscription: any;
  @ViewChild('messageContainer', { static: false }) messageContainer!: ElementRef;
  messages: { text: string, sender: 'me' | 'other' }[] = [];

  

  constructor(private modalController: ModalController, private http: HttpClient,private chatservice:ChatService,private actionSheetController:ActionSheetController) {}

  name: any = '';
  itemList: any[] = [];
  ionViewWillEnter() {
    this.name = localStorage.getItem('mytime');
    this.callchatapi();
    
   
   
  }
  backpage() {
    this.modalController.dismiss();
   
  }

  ngOnInit() {
    console.log("ngoninit");
    
    if(localStorage.getItem('photo')){
      this.imageUrl=localStorage.getItem('photo');
   }else{
     this.chatservice.imageUrl$.subscribe(url => {
       this.imageUrl = url;
     }); 
   }
  var currentUserUID = localStorage.getItem('currentuser');

  console.log(currentUserUID);
    this.chatservice.getMessage().subscribe((msg: any) => {
      console.log('Received message:', msg);
      //this.textlist=[];
      console.log(msg.data.user,"id yha h");
      const sender = msg.data.user != currentUserUID ? 'other':'me';
      this.messages.push({ text: msg.data.text, sender });
      this.scrollToBottom();
    });
    
   
  }
  scrollToBottom() {
    if (this.messageContainer) {
     
        const element = this.messageContainer.nativeElement;
        element.scrollBottom = element.scrollHeight;
      
      
    }
  }


  callchatapi() {
    let url = './assets/data.json';
    this.http.get(url).subscribe((result: any) => {
      this.itemList = [];
      const ans = result.chatsdata;
      console.log(ans);
      for (let i = 0; i < ans.length; i++) {
        const obj: chatdata = {
          name: ans[i].name,
          time: ans[i].time,
        };
        this.itemList.push(obj);
      }
    });
  }
  textlist: string[] = [];
  textfromuser: string = '';
  usersendmsg: any = '';
   sendtext() {
  this.usersendmsg = this.textfromuser;
  
  
 
 // this.messages.push({ text: this.textfromuser, sender: 'me' });
     this.chatservice.sendMessage(this.textfromuser);
   
    this.textfromuser = '';
 
  }

  isListOpen: boolean = false;

  openList() {
    this.isListOpen = !this.isListOpen;
  }

  selectItem(item: string) {
    this.name = item;
    this.isListOpen = false;
  } 

  imageUrl: any='';

 

  async openImageModal() {
   

   const modal = await this.modalController.create({
      component: ImageModalComponent,
    
    });
  return modal.present();
  }

}








interface chatdata {
  name: string;
  time: string;
}
