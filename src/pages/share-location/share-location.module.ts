import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareLocationPage } from './share-location';

@NgModule({
  declarations: [
    ShareLocationPage,
  ],
  imports: [
    IonicPageModule.forChild(ShareLocationPage),
  ],
})
export class ShareLocationPageModule {}
