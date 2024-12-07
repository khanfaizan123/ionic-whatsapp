import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subject,BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket:Socket) { }
  private imageUrlSource = new BehaviorSubject<string>('');
  imageUrl$ = this.imageUrlSource.asObservable();

  setImageUrl(url: string) {
    this.imageUrlSource.next(url);
  }

  getImageUrl(): string {
    return this.imageUrlSource.value;
  }
  joinRoom(phoneNumber: string) {
    this.socket.emit('join', phoneNumber);
}

  sendMessage(msg: string,receiverphonenumber:string,userphonenumber:any) {
    console.log(msg);
    const uid = localStorage.getItem('currentuser');
    const token=localStorage.getItem('fcm_token');
    console.log(uid,receiverphonenumber);
    this.socket.emit('message', { text: msg,user: uid,token:token,receiverphone:receiverphonenumber,userphonenumber:userphonenumber });
    
  }
public getMessage() {
  return this.socket.fromEvent('received').pipe(map((data)=>data));
  }


}
