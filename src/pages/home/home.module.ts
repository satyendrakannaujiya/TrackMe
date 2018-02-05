import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { HomePage } from "./home";
import { ContactPageModule } from "../../components/contact/contact.module";
import { JourneyDetailsModule } from "../../components/journey-details/journey-details.module";

@NgModule({
  declarations: [HomePage],
  imports: [JourneyDetailsModule, IonicPageModule.forChild(HomePage)]
})
export class HomePageModule {}
