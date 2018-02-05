import { Component } from "@angular/core";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { HomePage } from "../../pages/home/home";
import { MenuController } from "ionic-angular/components/app/menu-controller";
import { NavParams } from "ionic-angular/navigation/nav-params";
import { Storage } from "@ionic/storage";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { Firebase } from "@ionic-native/firebase";
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from "firebase";


interface userProfiles{

        
         user_name:string;
         profile_img:string;
         password:string;
         mobile_no:string;
}
interface userId extends userProfiles{

     id:string;
}

@Component({
  selector: "login",
  templateUrl: "login.html"
})
export class LoginComponent {
  username: string;
  mobileNo: string = "";
  profile_img : string ="";
  otp: string = "";
  password: string;
  usermob:string;
  text:string;
   userprofiles:any;
   userprofilecol:any;
  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private menuCtrl: MenuController,
    private storage: Storage,
    private alertCtrl: AlertController,
    private fireStore: AngularFirestore
  ) {
    console.log("Hello LoginComponent Component ", navCtrl);
    this.text = "Login component";
    this.menuCtrl.swipeEnable(false);
    console.log(fireStore);
  }

  ionViewCanEnter() {
    console.log("Ion View Can enter");
    console.log(this.navParams);
    this.mobileNo = this.navParams.get("mobileNo");
    console.log("mobileNo");
  }

  navigateToSignUp() {
    this.navCtrl.push("SignupPage");
  }

  authenticate() {
    console.log("Authenticating ....");

     this.userprofilecol = this.fireStore.collection('user_profiles');

           // let userprofiles1 = this.userprofilecol.valueChanges();

           // console.log("userprofile1"+ userprofiles1);
           // userprofiles1.subscribe((val)=>{
           //   console.log(val);
           // })

    //   this.userprofiles = this.userprofilecol.snapshotChanges().map(action => {
    //   console.log("action " + typeof action);
    //   return action.map(a => {
    //     console.log("a-->" + typeof a);
    //     const data = a.payload.doc.data() as userProfiles;
    //     const id = a.payload.doc.id;
    //     return { id, data };
    //   });
    // });

              this.userprofiles = this.userprofilecol.valueChanges();
               console.log(this.userprofiles);
         this.userprofiles.subscribe( val =>{
                          console.log(val);

                          var tt : string = "";
                    console.log(this.username);
                  const temp =  val.filter( aa =>{
                      console.log("aa user: "+aa.user_name);
                        if(aa.user_name == this.username)
                        {
                           tt = aa.password;
                           //this.password=aa.data.password;
                           this.usermob = aa.mobile_no;
                           this.username = aa.user_name;
                           this.profile_img = aa.profile_img;
                          console.log("matched");
                        }

                  });


        
           console.log("temp after filter "+tt);

           if(tt == "" || tt != this.password)
              {
                   console.log("within invalid ");
                     let abc = this.alertCtrl.create({
                     title: "Warning",
                     subTitle:"Username or password is wrong",
                      
                   buttons: ["OK"]
                    });
                    abc.present(); 
              }
              else{

              console.log("within valid ");
                   console.log(this.usermob);
                   this.storage.clear().then(()=>{
  
    this.storage.set("MYPROFILE",{"user_name":this.username,"mobile_no":this.usermob,"password":tt,"profile_img":this.profile_img})
       this.storage.set("MYMOBILENO",this.usermob);
       this.storage.set("LoginVerified", true);
        this.navCtrl.setRoot(HomePage);
 

                   });


              }

//               })
//     // const mobileNo = this.navParams.get("mobileNo");
//     // const verificationId = this.navParams.get("verificationId");
//     // const credential = firebase.auth.PhoneAuthProvider.credential(
    //   verificationId,
    //   this.otp
    // );
    // firebase
    //   .auth()
    //   .signInWithCredential(credential)
    //   .then(
    //     info => {
    //       console.log("login successfull");
    //       console.log(info);
    //       this.storage.set("LoginVerified", true);
    //       this.navCtrl.setRoot(HomePage);
    //     },
    //     error => {
    //       console.log("error occured...");
    //       let alert = this.alertCtrl.create({
    //         title: "Error Occured",
    //         subTitle:
    //           "Unable to login. Try again with valid credentials." + error,
    //         buttons: ["OK"]
    //       });
    //       alert.present();
    //       this.storage.set("LoginVerified", false);
    //     }
    //   );
    // this.storage.get(this.mobileNo).then(value => {
    //   if (value === this.otp) {
    //     this.storage.set("LoginVerified", true);
    //     this.navCtrl.setRoot(HomePage);
    //   } else {
    //     let alert = this.alertCtrl.create({
    //       title: "Error Occured",
    //       subTitle:
    //         "Please enter a valid number." +
    //         this.mobileNo +
    //         " otp from db : " +
    //         value,
    //       buttons: ["OK"]
    //     });
    //     alert.present();
    //     this.storage.set("LoginVerified", false);
    //   }
    // });

    // this.navCtrl.push(HomePage);
});


  // validateUser() {
  //   // firebase.auth.PhoneAuthProvider.credential();
  // }

  // navigateToSignUp() {
  //   this.navCtrl.push("SignupPage");
  // }
}
}

