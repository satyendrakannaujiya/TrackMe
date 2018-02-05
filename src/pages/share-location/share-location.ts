import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { GroupContactProvider } from "../../providers/group-contact/group-contact";
import { GroupContact } from "../../providers/group-contact/group-contact.model";
import { NavParams } from "ionic-angular/navigation/nav-params";
import { UserProfile } from "../../providers/user-profiles/user-profile.model";
import { JourneyDetails } from "../../providers/journey-details/journey-details.model";
import { Position } from "../../providers/journey-details/position.model";
import { Firebase } from "@ionic-native/firebase";
import { AngularFirestore } from "angularfire2/firestore";
import { Storage } from "@ionic/storage";
import { HomePage } from "../home/home";
import * as firebase from "firebase";

interface Members{

  mobile_no : string;
  profile_img: string;
}
@IonicPage()
@Component({
  selector: "page-share-location",
  templateUrl: "share-location.html"
})
export class ShareLocationPage {
  linkImage: string = "assets/imgs/link.svg";
  isHidden: boolean = true;
  groupContacts: GroupContact[] = [];
  members : Members[] = [];
  
  positions : Position[] = [];
  private from: string;
  private to: string;
  constructor(
    private navCtrl: NavController,
    private gcProvider: GroupContactProvider,
    private navParams: NavParams,
    private firebase: Firebase,
    private firestore : AngularFirestore,
    private storage:Storage
  ) {
    this.from = navParams.get("from");
    this.to = navParams.get("to");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ShareLocationPage");
    // this.groupContacts = this.fetchContacts();
       
      this.gcProvider.getAllRegisteredUsers().subscribe(users => {
      console.log("inside subscibe");
      console.log("all users +"+users);
      this.groupContacts = users.map((userProfile: UserProfile) => {
           console.log(userProfile);
        return new GroupContact(userProfile, false);
      });
      console.log(this.groupContacts);
      // console.log(obj);
      //obj.unsubscribe();
    });

    //obj.unsubscribe();
  }

  private fetchContacts() {
    // return this.groupContactProvider.fetchGroupContacts();
  }

  select(id: string, item: any) {
    console.log(item);
    if (item.color === "") {
      item.setAttribute("color", "primary");
      console.log("if condition");
    } else {
      item.color = "";
      console.log("else condition");
    }
  }

  toggleSearchBar() {
    console.log(this.isHidden);
    this.isHidden = !this.isHidden;
  }

  toggleConnectivity(groupContact: GroupContact) {
    groupContact.isConnected = !groupContact.isConnected;
  }

  searchItems(event: any) {
    this.groupContacts = this.groupContacts;
    let value = event.target.value;
    if (value === undefined || value.trim() === "") {
      return;
    }
    this.groupContacts = this.groupContacts.filter(
      (groupContact: GroupContact) => {
        // if searched string is found any where in the name
        return (
          groupContact.userProfile.user_name
            .toLowerCase()
            .indexOf(value.toLowerCase()) > -1 ||
          groupContact.userProfile.mobile_no.indexOf(value) > -1
        );
      }
    );
  }

  startNewJouney() {

    var connectWith = this.groupContacts.filter(
      (groupcontact: GroupContact) => {
        return groupcontact.isConnected;
      }
    );

       
   // console.log("connect with"+ connectWith[0].userProfile.mobile_no);
      for (let i=0;i<connectWith.length;i++)
                 {
                   let profile_img=connectWith[i].userProfile.profile_img;
                   let mobile_no = connectWith[i].userProfile.mobile_no;
                        this.members[i] = { "mobile_no":mobile_no,"profile_img":""};

                   // this.members[i].mobile_no=mobile_no
                   //  this.members[i].profile_img= connectWith[i].userProfile.profile_img;
                 }
                 console.log(this.members);
                 console.log("memeber after inserting :"+this.members[0].mobile_no);

                 let current_position = this.from;


                   
             // let date = new Date();
             // console.log("date  "+date);

             // this.date_time = new Position(new Date(),this.from);
             // console.log("data_time "+ this.date_time);
             this.positions[0] = { "data_time":new Date(),"location":this.from};
             console.log(this.positions);
           this.storage.get("MYPROFILE").then((myprofile)=>
           {
             console.log("my pforfile "+myprofile.user_name);
             console.log("members  "+this.members);
             console.log("positoin "+this.positions);
             console.log("this.from "+ this.from);
             console.log("nogdf"+ myprofile.mobile_no);
             console.log("indinf "+myprofile.profile_img);
             console.log(this.to);
              // this.firestore.collection("journey_details").add({"newdata":"hello"});

            //  let newjourney = new JourneyDetails();

this.firestore.collection("journey_details").add({"current_position":this.from,"from":this.from,"members":this.members,"positions":this.positions,"started_by":{"mobile_no":myprofile.mobile_no,"profile_img":myprofile.profile_img,"user_name":myprofile.user_name},"status":"incomplete","to":this.to});
           });
          




    this.navCtrl.setRoot(HomePage);




  }

  private createJourneyDetails(): JourneyDetails {
    return new JourneyDetails();
  }
}
