import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactMgmtPage } from './contact-mgmt';

@NgModule({
  declarations: [
    ContactMgmtPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactMgmtPage),
  ],
})
export class ContactMgmtPageModule {}
