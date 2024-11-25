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

import {AngularFireMessaging} from '@angular/fire/compat/messaging';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from  '@angular/common/http';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';

import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { SwiperModule } from 'swiper/angular';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { AuthService } from './services/auth/auth.service';

// Step 2: Add the following line...



const config: SocketIoConfig = { url: 'https://ionic-whatsapp.onrender.com', options: {} };


@NgModule({
  declarations: [AppComponent,],
  imports: [BrowserModule,
     IonicModule.forRoot(), 
     AppRoutingModule,
     HttpClientModule,
    SocketIoModule.forRoot(config),
     SwiperModule,
     provideFirebaseApp(() => initializeApp(environment.firebase)),
     provideAuth(() => getAuth()),
    //  AngularFireModule.initializeApp(environment.firebase),
    //  AngularFireAuthModule
  
    //  provideMessaging(() => getMessaging())
    
     

     ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  

})
export class AppModule {}
