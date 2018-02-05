//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coordinates, Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { Observable } from "rxjs/Observable";

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {
	      longitude: number;
  latitude: number;
  location;

  constructor(private geolocation: Geolocation, private platform: Platform,private nativeGeocoder: NativeGeocoder) {
    console.log('Hello LocationProvider Provider');

  }

    _findGeoCode() {
    this.nativeGeocoder
      .reverseGeocode(this.latitude, this.longitude)
      .then((result: NativeGeocoderReverseResult) => {
        
        //this.location = JSON.stringify(result);
          this.location = result;

        console.log(JSON.stringify(result));
          //return {latitude:this.latitude,longitude:this.longitude};
      })
      .catch((error: any) => console.log(error));

    this.nativeGeocoder
      .forwardGeocode("Berlin")
      .then((coordinates: NativeGeocoderForwardResult) =>
        console.log(
          "The coordinates are latitude=" +
            coordinates.latitude +
            " and longitude=" +
            coordinates.longitude
        )
      )
      .catch((error: any) => console.log(error));
  }
// AIzaSyBqp6JNiqYEAnqCufO92tzCOPWABEEIgd8
  _findGpsCordinates() {
    return this.geolocation.getCurrentPosition();
    
  }

  // loadMap() {
  //   this.navCtrl.push(PositionMapPage, {
  //     latitude: this.latitude,
  //     longitude: this.longitude
  //   });
  // }

  findLocation() :Promise<any>{
    return this._findGpsCordinates()
      .then(resp => {
        console.log(resp);
        this.latitude = resp.coords.latitude;

        this.longitude = resp.coords.longitude;
        console.log("latitude "+this.latitude);
        console.log("longitude "+ this.longitude);
        //this._findGeoCode();
          return {latitude:this.latitude,longitude:this.longitude};
      })
      .catch(error => {
        console.log("Error occured while finding coordinates .....");
      });
  }


     
}

