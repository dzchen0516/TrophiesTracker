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
  submitAttempt: boolean = false;
  results: Observable<any>;
  constructor(private trophyService: TrophyServiceService, public formBuilder: FormBuilder) { 
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    console.log(this.loginForm.controls.email.value);
    console.log(this.loginForm.controls.password.value);
    
    if(!this.loginForm.valid) {
			this.submitAttempt = true;
			console.log("Form is invalid");
    }
    else {
      this.trophyService.userLogin(this.loginForm.controls.email.value, 
                                    this.loginForm.controls.password.value);
      this.submitAttempt = false;
    }
  }

}
