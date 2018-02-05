import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { ContactModel } from "./contact.model";

@Injectable()
export class ContactsProvider {
  private contacts: ContactModel[] = [];
  private static CONTACT_DB: string = "CONTACTS";

  constructor(private storage: Storage) {
    console.log("Hello ContactsProvider Provider");
  }

  addContact(contact: ContactModel) {
    this.contacts.push(contact);
    this.storage.set(ContactsProvider.CONTACT_DB, this.contacts);
  }

  fetchContacts(): Promise<ContactModel[]> {
    // return this.storage.get(ContactsProvider.CONTACT_DB).then(contacts => {
    //   this.contacts = contacts;
    //   return this.contacts.slice();
    // });

    let contactsPromise: Promise<any> = this.storage.get(
      ContactsProvider.CONTACT_DB
    );

    return new Promise((resolve, reject) => {
      contactsPromise.then(contacts => {
        this.contacts = contacts;
        return this.contacts.slice();
      });
    });
  }
}
