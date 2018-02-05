import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { LoginComponent } from "../../components/login/login";
import { SMS } from "@ionic-native/sms";
import { Storage } from "@ionic/storage";
import { Firebase } from "@ionic-native/firebase";
import { AngularFirestore } from "angularfire2/firestore";
import { Camera, CameraOptions } from "@ionic-native/camera";
// import { AlertController } from "ionic-angular";
import * as firebase from "firebase";
import {
 
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
//import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html"
})
export class SignupPage {
      public idata:boolean=false;
   public photos: any;
  public base64Image: string;
  public mobileNo: string;
  private otp: string = "";
  countryCode: string = "+91";
  message : string= "";
  verificationId: string="";
  username:string="";
  password:string="";
  profile_img :string = "";
  image_data:string;
  // private verificationId: string = "";
  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private sms: SMS,
    private storage: Storage,
    private firebase: Firebase,
    private firestore : AngularFirestore,
    public camera:Camera
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SignupPage");
  }

  sendOtp() {
    console.log("mobile No : " + this.mobileNo);
    if (this.validatedNumber(this.mobileNo)) {
      this.sms
        .send(
          this.mobileNo,
          `Message From TrackMe: \n Your otp is \n ${this.otp}.`,
          {
            replaceLineBreaks: true
          }
        )
        .then(() => {
          console.log("Message sent successfully.");
          this.storage.set(this.mobileNo, this.otp);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  sendMessage() {
    if (this.validatedNumber(this.mobileNo)) {
      let noWithCourntryCode = this.countryCode + this.mobileNo;
      this.firebase
        .verifyPhoneNumber(noWithCourntryCode, 15)
        .then(credential => {
          console.log(credential);
          this.verificationId=credential.verificationId
          console.log(this.verificationId);
          // this.navCtrl.setRoot(LoginComponent, {
          //   mobileNo: this.countryCode + this.mobileNo,
          //   this.verificationId=credential.verificationId
          // });
        })
        .catch(err => {
          let alert = this.alertCtrl.create({
            title: "Error Occured",
            subTitle:
              "Something went wrong while sending OTP.Please try after sometime." +
              err,
            buttons: ["OK"]
          });
          alert.present();
        });
    }
  }
      Verify(){
                 const credential = firebase.auth.PhoneAuthProvider.credential(
                       this.verificationId,
                        this.otp
                       );
               
      firebase
      .auth()
      .signInWithCredential(credential)
      .then(
        info => {

          console.log("login successfull");
          console.log(info);
               let alert = this.alertCtrl.create({
            title: "Sucess",
            subTitle:"OTP Verified!",
            buttons: ["OK"]
          });
          alert.present();

          //this.storage.set("LoginVerified", true);
            
        //  this.navCtrl.setRoot(HomePage);
        },
        error => {
          this.message = "Error otp not mached"
          console.log("error occured...");
          // let alert = this.alertCtrl.create({
          //   title: "Error Occured",
          //   subTitle:
          //     "Unable to login. Try again with valid credentials." + error,
          //   buttons: ["OK"]
          // });
          // alert.present();
          this.storage.set("LoginVerified", false);
        }
      );



      }
  validatedNumber(mobileNo: string) {
    if (mobileNo === undefined || mobileNo.length < 10) {
      let alert = this.alertCtrl.create({
        title: "Error Occured",
        subTitle: "Please enter a valid number.",
        buttons: ["OK"]
      });
      alert.present();
      return false;
    }
    return true;
  }


      takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      targetHeight : 128,
      targetWidth : 128,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        this.base64Image = "data:image/jpeg;base64," + imageData;
        //this.photos.push(this.base64Image);
        //this.photos.reverse();
        this.image_data = this.base64Image;
        this.idata = true;
      },
      err => {
        // Handle error
      }
    );
  }


         Register(){
         
              console.log("Register clicked");
               this.firestore
                      .collection("user_profiles")
                              .add({ mobile_no: this.mobileNo, user_name: this.username ,password:this.password,profile_img:this.image_data});
                              this.navCtrl.setRoot(LoginComponent);
                 // this.storage.set("MyUsername",this.username);
                  //this.storage.set("MyPassword",this.password);
                 // this.storage.set("MyProfileImg",this.profile_img);
         }
  // navigateToLogin() {
  //   this.navCtrl.setRoot(LoginComponent, {
  //     mobileNo: this.mobileNo,
  //     verificationId: this.verificationId
  //   });
  // }
}
