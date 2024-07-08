import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserChatPageRoutingModule } from './user-chat-routing.module';
import { UserChatPage } from './user-chat.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    
    IonicModule,
    UserChatPageRoutingModule
  ], 
  declarations: [UserChatPage],
  providers:[]
  

})
export class UserChatPageModule {}
