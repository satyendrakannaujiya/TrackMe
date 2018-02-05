import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";

import { Observable } from "rxjs/Observable";
import { JourneyDetails } from "./journey-details.model";

@Injectable()
export class JourneyDetailsProvider {
  private readonly JOURNEY_DETAILS: string = "journey_details";
  // Since it is an observable no need to get it everytime
  // that is why it is initailzed in constructor
  private journeyDetailsList: Observable<JourneyDetails[]>;
  private jouneyDetailsListForMember: Observable<JourneyDetails[]>;

  constructor(private fireStore: AngularFirestore) {
    console.log("fireStore : " + fireStore);
    this.journeyDetailsList = this.fireStore
      .collection(this.JOURNEY_DETAILS)
      .valueChanges();
    this.jouneyDetailsListForMember = this.fireStore
      .collection(this.JOURNEY_DETAILS)
      .valueChanges();
  }

  fetchJourneyDetails() {
    return this.journeyDetailsList;
  }
    fetchformember(){

      return this.jouneyDetailsListForMember ;
    }

  addNewJourney(jouneryDetails: JourneyDetails) {
    this.fireStore.collection(this.JOURNEY_DETAILS).add(jouneryDetails);
  }
}
