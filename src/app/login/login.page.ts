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
  email: '';
  password: '';
  constructor(private trophyService: TrophyServiceService) { }

  ngOnInit() {
  }

  login() {
    console.log(this.email);
    console.log(this.password);
    this.trophyService.userLogin(this.email, this.password);
  }

}
