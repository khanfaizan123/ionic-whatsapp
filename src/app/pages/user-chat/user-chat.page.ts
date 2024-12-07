import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewChecked,
  AfterViewInit,
} from '@angular/core';

import {
  ActionSheetController,
  IonContent,
  ModalController,
  NavParams
} from '@ionic/angular';
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
  @ViewChild(IonContent) content!: IonContent;
  @ViewChild('messageContainer', { static: false })
  messageContainer!: ElementRef;
  messages: { text: string; sender: 'me' | 'other' ,time: Date}[] = [];
  showScrollToBottom: boolean = false;

  constructor(
    private modalController: ModalController,
    private http: HttpClient,
    private chatservice: ChatService,
    private actionSheetController: ActionSheetController,
    private navParams: NavParams
  ) {
    this.receiverphonenumber = this.navParams.get('receiverphonenumber');
    console.log(this.receiverphonenumber);

  }

  name: any = '';
  itemList: any[] = [];
  userphonenumber:any;
  ionViewWillEnter() {
    this.name = localStorage.getItem('mytime');
    this.callchatapi();
  }
 
  backpage() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    console.log('ngoninit');

    if (localStorage.getItem('photo')) {
      this.imageUrl = localStorage.getItem('photo');
    } else {
      this.chatservice.imageUrl$.subscribe((url) => {
        this.imageUrl = url;
      });
    }

    var currentUserUID = localStorage.getItem('currentuser');
     this.userphonenumber=localStorage.getItem('userphonenumber');
    console.log(currentUserUID,this.userphonenumber,"user ki details yha h");
    this.chatservice.joinRoom(this.userphonenumber);

    this.chatservice.getMessage().subscribe((msg: any) => {
      console.log('Received message:', msg);
      const sender = msg.data.user != currentUserUID ? 'other' : 'me';
      if( msg.data.receiverphone==this.receiverphonenumber && msg.data.userphonenumber==this.userphonenumber ){
      this.messages.push({ text: msg.data.text, sender,  time: new Date() });
      }else if( msg.data.userphonenumber==this.userphonenumber && msg.data.receiverphone==this.receiverphonenumber ){
        this.messages.push({ text: msg.data.text, sender,  time: new Date() });
      }
      this.scrollToBottom();
    });
  }
  // scrollToBottom() {
  //   if (this.messageContainer) {
  //     setTimeout(() => {
  //       this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  //     }, 100);
  //   }
  // }

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
          phonenumber:ans[i].phonenumber
        };
        this.itemList.push(obj);
      }
     
    });
  }
  textlist: string[] = [];
  textfromuser: string = '';
  
  sendtext() {
    // this.messages.push({ text: this.textfromuser, sender: 'me' });
    
    this.chatservice.sendMessage(this.textfromuser,this.receiverphonenumber,
      this.userphonenumber);
    this.textfromuser = '';
  }

  isListOpen: boolean = false;

  openList() {
    this.isListOpen = !this.isListOpen;
  }
  receiverphonenumber:string='';
  selectItem(item:any) {
    this.name = item?.name;
    this.receiverphonenumber=item?.phonenumber;
    this.isListOpen = false;
    console.log(this.receiverphonenumber,item?.phonenumber,this.name)

  }

  imageUrl: any = '';

  async openImageModal() {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
    });
    return modal.present();
  }

  // Handle scrolling
  onScroll(event: any) {
    this.content.getScrollElement().then((el) => {
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= 60; // Tolerance for near-bottom
      this.showScrollToBottom = !atBottom;
    });
  }

  // Scroll to the bottom of the chat
  scrollToBottom() {
    this.content.scrollToBottom(300); // Smooth scroll to the bottom
    this.showScrollToBottom = false; // Hide the button
  }
}

interface chatdata {
  name: string;
  time: string;
  phonenumber:string;
}
