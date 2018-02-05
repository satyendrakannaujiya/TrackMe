import { NgModule, Input } from "@angular/core";
import { IonicPageModule } from "ionic-angular";

import { JourneyDetailsComponent } from "./journey-details";

@NgModule({
  declarations: [JourneyDetailsComponent],
  imports: [IonicPageModule.forChild(JourneyDetailsComponent)],
  exports: [JourneyDetailsComponent]
})
export class JourneyDetailsModule {
  constructor() {}
}
