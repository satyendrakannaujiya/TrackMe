import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PositionMapPage} from "../position-map/position-map";
import { LocationProvider } from "../../providers/location/location";
import { JourneyDetails } from "../../providers/journey-details/journey-details.model";
/**
 * Generated class for the JourneyStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-journey-status',
  templateUrl: 'journey-status.html',
})
export class JourneyStatusPage {
	longitude:number;
    latitude:number;
    details;
   // journeydetails:JourneyDetails;
     journeyDetails: JourneyDetails = new JourneyDetails();
 
  constructor(public navCtrl: NavController, public navParams: NavParams,public locationprovider:LocationProvider) {
        
          //   let name = this.navParams.get('hii');

          //   console.log(name);
          //         //  var obj = this.navParams.get('journeyDetails');
          //         // console.log("object "+obj);

          // //  console.log("journey details "+ this.journeyDetails);

  	   this.locationprovider.findLocation().then((resp)=>{
        console.log("response "+resp);
             this.latitude = resp.latitude;
             this.longitude = resp.longitude;
           console.log("latitude  "+this.latitude);
           console.log("longitude  "+this.longitude);
           

          })
  }
   ngOnInit() {
    console.log("onon init jounery details component");
   // this.journeyDetails = this.navParams.get('journeyDetails');
      this.details = this.navParams.get('journeyDetails');
     console.log(this.details);
   // console.log(typeof this.journeyDetails);

    //console.log("journey status in oninit "+this.journeyDetails);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JourneyStatusPage');
  }


  showMap(){

          console.log("Show map method called");
            this.navCtrl.push(PositionMapPage,{
              latitude:this.latitude,
              longitude:this.longitude
            });

     }

}
