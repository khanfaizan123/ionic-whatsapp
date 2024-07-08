import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket:Socket) { }

  sendMessage(msg: string) {
    console.log(msg);
    this.socket.emit('message', msg);
  }
public getMessage() {
    return this.socket.fromEvent('received').pipe(map((data)=>data));
  }
}
