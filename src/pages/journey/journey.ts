import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { GroupContactProvider } from "../../providers/group-contact/group-contact";
import { LocationProvider } from "../../providers/location/location";
import { NavParams } from "ionic-angular/navigation/nav-params";
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
@IonicPage()
@Component({
  selector: "page-journey",
  templateUrl: "journey.html"
})
export class JourneyPage {
  isDisabled: boolean = true;
  from: string;
  to: string;
  currentLocation;
  latitude:number;
  longitude:number;
  constructor(
    public navCtrl: NavController,
    private gcProvider: GroupContactProvider,
    public locationprovider:LocationProvider,
    private nativeGeocoder: NativeGeocoder,
    public navParams : NavParams

  ) {

       this.from = navParams.get("from");
       console.log("constructor called");
  }

  ionViewWillEnter(){
    console.log("ionViewDidLoad JourneyPage");
        this.from = this.navParams.get("from");
        console.log("ionviewwill enter called");
    // this.currentLocation = this.locationprovider.getCurrentLocation();
    // this.to = "India";
    // this.from = this.currentLocation.locality + "," + this.currentLocation.subLocality;

  }

  shareLocation() {
    this.navCtrl.push("ShareLocationPage",{
              from:this.from,
              to:this.to
            });

  //        this.locationprovider.getCurrentLocation().then((resp)=>{

  //              console.log("resp  "+resp);
  //           this.latitude=resp.coords.latitude;
  //         this.longitude = resp.coords.longitude;
  //           console.log("long "+this.longitude);
  //           console.log("latit  "+this.latitude);

  //         this.nativeGeocoder.reverseGeocode(this.latitude,this.longitude)
  //        .then((result: NativeGeocoderReverseResult) =>
  //       {
  //           console.log("result "+result);
  //           //return result;
  //            this.from = result.locality + "," + result.subLocality;
            

  //      }

  //  )
  // .catch((error: any) => 
  //   {
  //     console.log(" error in reversegeocode "+error);
  //    //this.cityname= "error";
  //   }
  //   );

  //     }).catch((error) => {
  //    console.log('Error getting location', error);
  //     });
   

  //   // this.navCtrl.push("ShareLocationPage", {
    //   from: this.from,
    //   to: this.to
    // });
  }

  // changeLocation() {
  //   this.isDisabled = !this.isDisabled;
  // }
}
