import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomepagePageRoutingModule } from './homepage-routing.module';

import { HomepagePage } from './homepage.page';
import { NoContentComponent } from 'src/app/pages/no-content/no-content.component';
import { SwiperModule } from 'swiper/angular';
import { ImageModalComponent } from 'src/app/image-modal/image-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,  
    
    SwiperModule, 
   
   
    IonicModule,
    HomepagePageRoutingModule
  ],
  declarations: [HomepagePage,NoContentComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class HomepagePageModule {}
