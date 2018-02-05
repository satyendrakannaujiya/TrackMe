import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, Menu } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { LoginComponent } from "../components/login/login";
import { MenuController } from "ionic-angular/components/app/menu-controller";
import { NavController } from "ionic-angular/navigation/nav-controller";
import { Storage } from "@ionic/storage";
// import { Firebase } from "@ionic-native/firebase";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  // set this to empty
  rootPage: any = "";
  @ViewChild(Nav) navCtrl: NavController;
  @ViewChild(Menu) menuCtrl: MenuController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      console.log("storage : " + storage);

     // uncomment this for login -> signup
      this.storage.get("LoginVerified").then((value: boolean) => {
        if (value) {
          this.rootPage = "HomePage";
        } else {
          this.rootPage = LoginComponent;
        }
      });
    });
  }

  navigateTo(page: string) {
    this.navCtrl.push(page);
    this.menuCtrl.close();
  }

  signOut() {
    console.log("inside sign out");
    this.storage.set("LoginVerified", false).then(()=>{

      this.navCtrl.setRoot(LoginComponent);
      this.menuCtrl.close();
    })
    
  }
}
