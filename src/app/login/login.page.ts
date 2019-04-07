import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrophyServiceService } from '../services/trophy-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  results: Observable<any>;
  username: '';
  password: '';
  constructor(private trophyService: TrophyServiceService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.username);
    console.log(this.password);
    this.trophyService.userLogin(this.username, this.password);
  }

}
