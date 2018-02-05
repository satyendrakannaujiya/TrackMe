import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { UserProfile } from "./user-profile.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserProfilesProvider {
  private readonly USER_PROFILES = "user_profiles";

  private $userProfile: Observable<UserProfile[]>;
  private mobileNo: string = "7388960367";
  /**
   *constructor
   * @param firestore
   */
  constructor(private firestore: AngularFirestore) {
    this.$userProfile = firestore
      .collection<UserProfile>(this.USER_PROFILES, ref => {
        return ref.where("mobile_no", "==", this.mobileNo).limit(1);
      })
      .valueChanges();
  }

  getUserProfileWith(mobileNo: string): Observable<UserProfile[]> {
    return this.$userProfile;
  }

  createNewProfile(userProfile: UserProfile) {
    this.firestore.collection(this.USER_PROFILES).add(userProfile);
  }
}
