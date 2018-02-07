import { Component, Input } from "@angular/core";
import { JourneyDetails } from "../../providers/journey-details/journey-details.model";
import { NavController } from "ionic-angular";
import { JourneyStatusPage } from "../../pages/journey-status/journey-status";

/**
 * Generated class for the JourneyDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "journey-details",
  templateUrl: "journey-details.html"
})
export class JourneyDetailsComponent {
  @Input("journey-param") param: JourneyDetails;

  journeyDetails: JourneyDetails = new JourneyDetails();
  constructor(public navctrl:NavController) {}

  ngOnInit() {
    console.log("jounery details component");
    this.journeyDetails = this.param;
    console.log(typeof this.journeyDetails);

    console.log(this.journeyDetails);
  }

  journeyStatus(obj:JourneyDetails){

    console.log(obj);
    // console.log("journey status from component");
       
    // console.log(this.journeyDetails);

    this.navctrl.push(JourneyStatusPage,{
       
        journeyDetails:obj
    });
  }
}
