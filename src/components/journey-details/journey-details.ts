import { Component, Input } from "@angular/core";
import { JourneyDetails } from "../../providers/journey-details/journey-details.model";

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
  constructor() {}

  ngOnInit() {
    console.log("jounery details component");
    this.journeyDetails = this.param;
    console.log(typeof this.journeyDetails);

    console.log(this.journeyDetails);
  }
}
