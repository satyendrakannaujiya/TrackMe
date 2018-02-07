import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { MenuController } from "ionic-angular/components/app/menu-controller";
import { IonicPage } from "ionic-angular/navigation/ionic-page";
import { JourneyDetailsProvider } from "../../providers/journey-details/journey-details";
import { JourneyDetails } from "../../providers/journey-details/journey-details.model";
import { Observable } from "rxjs/Observable";
import { Storage } from "@ionic/storage";
import { UserProfile } from "../../providers/user-profiles/user-profile.model";
import { Position } from "../../providers/journey-details/position.model";
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { LocationProvider } from "../../providers/location/location";
import { PositionMapPage} from "../position-map/position-map";
import { JourneyStatusPage } from "../journey-status/journey-status";

@IonicPage()
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  journeyDetailsList: JourneyDetails[]=[];
  tempList = [];
  newlist = [];
  mymobile:string="";
  longitude:number;
  latitude:number;
  from : string;
  location;
 // journeyDetails: JourneyDetails = new JourneyDetails();
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public storage: Storage,
    private journeyDetailsProvider: JourneyDetailsProvider,
    private nativeGeocoder: NativeGeocoder,
     public locationprovider:LocationProvider
  ) {
    menuCtrl.swipeEnable(true);
    console.log("Notifications Provider : " + journeyDetailsProvider);


      // this.locationprovider.findLocation().then((resp)=>{
      //   console.log("response "+resp);
      //        this.latitude = resp.latitude;
      //        this.longitude = resp.longitude;
      //      console.log("latitude  "+this.latitude);
      //      console.log("longitude  "+this.longitude);
           

      // })
       // location = this.locationprovider.location;
       //  this.from = this.location.locality + "," + this.location.subLocality;
       //   console.log("this.from "+this.from);

       //   this.latitude = this.locationprovider.latitude;
       //   this.longitude = this.locationprovider.longitude;
       //   console.log(":inside longitude and latitude"+ this.latitude + " ..." + this.longitude);

   
  }

  

  ionViewDidLoad() {
    console.log("inside ionViewDidLoad : -->");
        

    this.journeyDetailsProvider.fetchJourneyDetails().subscribe(list => {
      console.log("inside subscribe");
      console.log("list " + list);
     this.tempList = list;
     console.log(this.tempList);
       console.log(this.tempList[0].members);

              this.storage.get("MYMOBILENO").then(mobileno=>{

                for(let i=0;i<this.tempList.length;i++)
                     {
                        var flag=0;
                        let tt = this.tempList[i].members;
                            for(let j=0;j<tt.length;j++)
                                 {
                                     if(tt[j].mobile_no == mobileno)
                                          {
                                              flag = 1;
                                              console.log(tt[j].mobile_no);
                                              this.newlist.push(this.tempList[i]);
                                              break;
                                          }
                                 }
                                 

                     }
             })

              this.journeyDetailsList = this.newlist;
           
    });
  }

  showMenu() {
    this.menuCtrl.toggle();
  }

  navigateTo(page: string) {
      console.log("navigate to strt new journey "+ this.from);

       this.navCtrl.push(page,{
                 from:this.from
            });

    
  }

  showStatus(contactId: string) {

    this.navCtrl.push("JourneyStatusPage", {
      contactId: "1"
    });

  }
     showMap(){

          console.log("Show map method called");
            this.navCtrl.push(PositionMapPage,{
              latitude:this.latitude,
              longitude:this.longitude
            });

     }

     journeyStatus(journeyDetails:JourneyDetails){

       var journeyDetails: JourneyDetails = new JourneyDetails();
         journeyDetails=journeyDetails;
                console.log("journey details "+journeyDetails);
                //  console.log(journeyDetails.from);
       console.log("journey status");
       this.navCtrl.push(JourneyStatusPage,{
         journeyDetails:JourneyDetails
       });


     }
}
