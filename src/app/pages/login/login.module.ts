import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
   
    
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
  ,providers:[AuthService]
})
export class LoginPageModule {}
