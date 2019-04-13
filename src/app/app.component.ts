import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TrophyServiceService } from './services/trophy-service.service';
import { Router } from '@angular/router';
import { LoginPage } from './login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private trophyService: TrophyServiceService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //subscribe to the BehaviorSubject authticationState in
      //trophyService, if the authenticationState changed this
      //will redirect the user to different page according to the
      //lastest state
      //this.trophyService.authenticationState.subscribe(state => {
          //console.log("trophyService: state changed: ", state);
          //if(state) {
            //if the user has been authenticated
            //it will redirect the user to the scoreboard page
            //this.router.navigate(['trophy', 'scoreboard']);
          //}
          //else {
            //if the user has not been authenticated
            //it will redirect the user to the login page
            //this.router.navigate(['login']);
          //}
      //});
    });
  }
}
