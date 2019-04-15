import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router/';
import { TrophyServiceService } from './trophy-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private authService : TrophyServiceService) { }

  //This guard will check if the user has been
  //authenticated, if it's true, it'll redirect
  //the user to the scoreboard page. Otherwise,
  //it'll redirect the user to the login page
  canActivate() : boolean {
    if(this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
