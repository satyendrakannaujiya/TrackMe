import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-journey-status",
  templateUrl: "journey-status.html"
})
export class JourneyStatusPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad JourneyStatusPage");
  }
}
