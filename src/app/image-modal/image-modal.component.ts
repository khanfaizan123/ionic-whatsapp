import { Component, Input, OnInit } from '@angular/core';
import { CameraSource, Camera, CameraResultType } from '@capacitor/camera';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent implements OnInit  {

 imageUrl:any;

  constructor(private modalController: ModalController,private actionSheetController:ActionSheetController,private chatservice:ChatService) {}
  ngOnInit(): void {
    if(localStorage.getItem('photo')){
      this.imageUrl=localStorage.getItem('photo');
   }else{
     this.chatservice.imageUrl$.subscribe(url => {
       this.imageUrl = url;
     }); 
   }
    this.presentActionSheet();
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image',
      buttons: [
        {
          text: 'Photo',
          icon: 'camera',
          handler: () => {
            this.takePicture(CameraSource.Camera);
          }
        },
        {
          text: 'Gallery',
          icon: 'image',
          handler: () => {
            this.takePicture(CameraSource.Photos);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async takePicture(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: source,
      });

      this.imageUrl = image.dataUrl;
      this.chatservice.setImageUrl(this.imageUrl);
      localStorage.setItem('photo',this.imageUrl);
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  }

  close() {
    this.modalController.dismiss();
  }

}
