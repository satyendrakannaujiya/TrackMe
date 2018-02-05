import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyStatusPage } from './journey-status';

@NgModule({
  declarations: [
    JourneyStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(JourneyStatusPage),
  ],
})
export class JourneyStatusPageModule {}
