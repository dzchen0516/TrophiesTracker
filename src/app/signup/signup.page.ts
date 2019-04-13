import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrophyServiceService } from '../services/trophy-service.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { UsernameValidator } from  '../validators/username';

@Component({
	 selector: 'app-signup',
	 templateUrl: './signup.page.html',
	 styleUrls: ['./signup.page.scss']
})

export class SignupPage implements OnInit {
	
	public signupForm: FormGroup;
	public submitAttempt: boolean = false;
	
	constructor(private trophyService: TrophyServiceService, public formBuilder: FormBuilder)
	{ 
		this.signupForm = formBuilder.group({
	        email: ['', Validators.compose([Validators.required])],
	        username: ['', Validators.compose([UsernameValidator.isValid, Validators.required])],
			password: ['', Validators.compose([Validators.required])],
			confrimPassword: ['', ],
			avatar: ['', Validators.compose([Validators.required])]
	    });
	}

	ngOnInit() 
	{
	  
	}
	
	signUp()
	{
		console.log(this.signupForm.controls.username);
		
		if(!this.signupForm.valid){
			
			// This can be moved up when we have it redirecting to a new page.
			this.submitAttempt = true;
			
			console.log("Form is invalid");
		}else{
			console.log("Form is valid");
			
			this.trophyService.userSignup(
				this.signupForm.controls.email.value, 
				this.signupForm.controls.username.value, 
				this.signupForm.controls.password.value, 
				this.signupForm.controls.avatar.value);
		}
	}
}
