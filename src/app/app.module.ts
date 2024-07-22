import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { getFirestore } from "firebase/firestore";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import 'hammerjs';

import {MessagingModule } from '@angular/fire/messaging';
import {AngularFireMessaging} from '@angular/fire/compat/messaging';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from  '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';

import { getAuth } from 'firebase/auth';

import { SwiperModule } from 'swiper/angular';
import { ImageModalComponent } from './image-modal/image-modal.component';

// Step 2: Add the following line...



const config: SocketIoConfig = { url: 'https://ionic-whatsapp.onrender.com', options: {} };


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule,
     HttpClientModule,
     provideFirebaseApp(()=>initializeApp(environment.firebase))
     ,provideAuth(()=>getAuth()),
     SocketIoModule.forRoot(config),
     SwiperModule,MessagingModule,

     AngularFireModule.initializeApp(environment.firebase), 

     ],
  providers: [MessagingModule,AngularFireMessaging],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  

})
export class AppModule {}
