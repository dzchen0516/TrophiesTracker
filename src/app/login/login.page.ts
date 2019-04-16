import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrophyServiceService } from '../services/trophy-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  results: Observable<any>;
  email: '';
  password: '';
  constructor(private trophyService: TrophyServiceService, public formBuilder: FormBuilder) { 
    this.loginForm = formBuilder.group({
      emailInput: ['', Validators.compose([Validators.pattern['+@+'], Validators.required])]
    });
  }

  ngOnInit() {
  }

  login() {
    console.log(this.email);
    console.log(this.password);
    this.trophyService.userLogin(this.email, this.password);
  }

}
