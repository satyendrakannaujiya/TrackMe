import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PositionMapPage } from './position-map';

@NgModule({
  declarations: [
    PositionMapPage,
  ],
  imports: [
    IonicPageModule.forChild(PositionMapPage),
  ],
})
export class PositionMapPageModule {}
