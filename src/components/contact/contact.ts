import { Component, Input } from "@angular/core";
import { IonicPage } from "ionic-angular/navigation/ionic-page";

/**
 * Generated class for the ContactComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@IonicPage()
@Component({
  selector: "contact",
  templateUrl: "contact.html"
})
export class ContactComponent {
  text: string;
  private profileImg: string;
  @Input("contactId") contactId;
  @Input("journeyDetails") journeryDetails;

  imgs: Array<any> = [
    "assets/imgs/avatars/1.svg",
    "assets/imgs/avatars/2.svg",
    "assets/imgs/avatars/3.svg",
    "assets/imgs/avatars/4.svg",
    "assets/imgs/avatars/5.svg"
  ];

  constructor() {
    console.log("Hello ContactComponent Component");
    this.text = "Contact Details";
    this.profileImg = this.imgs[Math.floor(Math.random() * 5)];
  }
}
