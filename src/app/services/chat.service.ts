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

  sendMessage(msg: string) {
    console.log(msg);
    const uid = localStorage.getItem('currentuser');
    console.log(uid);
    this.socket.emit('message', { text: msg,user: uid });
    
  }
public getMessage() {
  return this.socket.fromEvent('received').pipe(map((data)=>data));
  }


}
