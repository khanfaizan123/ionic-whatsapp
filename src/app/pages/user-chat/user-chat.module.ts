import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserChatPageRoutingModule } from './user-chat-routing.module';
import { UserChatPage } from './user-chat.page';

import { ImageModalComponent } from 'src/app/image-modal/image-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    
    IonicModule,
    UserChatPageRoutingModule
  ], 
  declarations: [UserChatPage,ImageModalComponent],
  providers:[]
  

})
export class UserChatPageModule {}
