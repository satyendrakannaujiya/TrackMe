import { Component } from '@angular/core';
import { Storage } from "@ionic/storage";
/**
 * Generated class for the ProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfileComponent {



  text: string;
     profile_name:string;
     profile_mob:string;
     image_data:string;
  constructor(public store:Storage) {
    console.log('Hello ProfileComponent Component');
    this.text = 'Hello World';
      this.store.get("MYPROFILE").then((profile)=>{

           this.profile_name = profile.user_name;
           this.profile_mob = profile.mobile_no;
           this.image_data = profile.profile_img;

      });


  }

}
