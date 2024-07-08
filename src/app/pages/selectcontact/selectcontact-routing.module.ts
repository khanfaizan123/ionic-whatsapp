import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectcontactPage } from './selectcontact.page';

const routes: Routes = [
  {
    path: '',
    component: SelectcontactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectcontactPageRoutingModule {}
