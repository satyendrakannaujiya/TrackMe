import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from "@ionic-native/google-maps";
/**
 * Generated class for the PositionMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-position-map',
  templateUrl: 'position-map.html',
})
export class PositionMapPage {
     latitude:number;
     longitude:number;
      map: GoogleMap;
  userName: string = "Sunil";
  constructor(public navCtrl: NavController, public navParams: NavParams) {


  	this.latitude = this.navParams.get("latitude");
  	this.longitude = this.navParams.get("longitude");
    console.log("latitude "+this.latitude);
    console.log("longitude "+this.longitude);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PositionMapPage");
    this.loadMap();
  }

  loadMap() {
    console.log("inside loadMap page");
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.latitude,
          lng: this.longitude
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create("map", mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log("Map is ready!");

      // Now you can use all methods safely.
      this.map
        .addMarker({
          title: this.userName,
          icon: "assets/",
          animation: "DROP",
          position: {
            lat: this.latitude,
            lng: this.longitude
          }
        })
        .then(marker => {
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            alert("clicked");
          });
        });
    });
  }
}
