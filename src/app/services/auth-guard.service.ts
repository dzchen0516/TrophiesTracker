import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/';
import { TrophyServiceService } from './trophy-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService : TrophyServiceService) { }

  //This is the guard to decide if a route/path can be navigated
  //if this returns true, navigation will continue
  canActivate() : boolean {
    return this.authService.isAuthenticated();
  }
}
