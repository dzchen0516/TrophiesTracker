import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrophyServiceService } from '../services/trophy-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    email: '';
	password: '';
	passwordVerify: '';
	username: '';
	avatar: '';
	
	constructor(private trophyService: TrophyServiceService) { }

  ngOnInit() {
  }

	signUp(){
		console.log(this.email);
		console.log(this.username);
		console.log(this.password);
		console.log(this.passwordVerify);
		
		this.trophyService.userSignup(this.email, this.username, this.password, ' ');
	}

}
