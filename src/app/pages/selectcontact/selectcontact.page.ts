import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-selectcontact', 
  templateUrl: './selectcontact.page.html',
  styleUrls: ['./selectcontact.page.scss'],
})
export class SelectcontactPage implements OnInit {

  constructor(
    private modal:ModalController
  ) { }


 

  ngOnInit() {
  }

  backpage(){
    this.modal.dismiss();
  }

}
