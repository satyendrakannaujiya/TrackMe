// import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GroupContact } from "./group-contact.model";
import { AngularFirestore } from "angularfire2/firestore";
import { UserProfile } from "../user-profiles/user-profile.model";
import { Observable } from "rxjs/Observable";

@Injectable()
export class GroupContactProvider {
  private readonly USER_PROFILES:string = "user_profiles";
  private userProfiles: Observable<any[]>;

  /**constructor
   *
   * @param fireStore
   */
  constructor(private fireStore: AngularFirestore) {
    console.log("inside the constructor of group contact provider");
    // this.userProfiles = this.fireStore
    //   .collection(this.USER_PROFILES)
    //   .valueChanges();
  }

  /**
   *returns all the records from userPorfiles
   */
  getAllRegisteredUsers(): Observable<UserProfile[]> {

    // console.log("get all registered users");
    //   console.log(this.userProfiles);
    //     this.userProfiles.subscribe((user)=>{
    //           console.log("inside subscribe");
    //     });
    this.userProfiles = this.fireStore
      .collection(this.USER_PROFILES)
      .valueChanges();
    return this.userProfiles;
  }
}
