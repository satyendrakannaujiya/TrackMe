import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { ContactModel } from "../../providers/contacts/contact.model";

/**
 * Generated class for the ContactMgmtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-contact-mgmt",
  templateUrl: "contact-mgmt.html"
})
export class ContactMgmtPage {
  contacts: ContactModel[] = [];
  constructor(public navCtrl: NavController) {}

  fetchContacts() {}
}
