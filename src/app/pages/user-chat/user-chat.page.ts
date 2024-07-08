import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer';
import { ChatService } from 'src/app/services/chat.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

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

  constructor(private modal: ModalController, private http: HttpClient,private chatservice:ChatService) {}

  name: any = '';
  itemList: any[] = [];
  ionViewWillEnter() {
    this.name = localStorage.getItem('mytime');
    this.callchatapi();
    
   
  }
  backpage() {
    this.modal.dismiss();
   
  }

  ngOnInit() {
    console.log("ngoninit");
    console.log('Subscribing to getMessage...');
 
    this.chatservice.getMessage()
    .subscribe((message: any) => {
      console.log('Received message:', message);
      //this.textlist=[];
      this.textlist.push(message.data);
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
  
  
    // Assuming sendMessage returns a Promise or is awaited correctly
     this.chatservice.sendMessage(this.textfromuser);
    //this.textlist.push(this.textfromuser);
   
 
   
    
    // Clear input after sending message
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
}








interface chatdata {
  name: string;
  time: string;
}
