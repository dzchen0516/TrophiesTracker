import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrophyServiceService } from '../services/trophy-service.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UsernameValidator } from  '../validators/username';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
	 selector: 'app-signup',
	 templateUrl: './signup.page.html',
	 styleUrls: ['./signup.page.scss']
})

export class SignupPage implements OnInit {
	
	public signupForm: FormGroup;
	public submitAttempt: boolean = false;
	
	imageResponse: any;
	options: any;
	
	constructor(private trophyService: TrophyServiceService, public formBuilder: FormBuilder, private imagePicker: ImagePicker)
	{ 
		this.signupForm = formBuilder.group({
	        email: ['', Validators.compose([Validators.required])],
	        username: ['', Validators.compose([UsernameValidator.isValid, Validators.required])],
			password: ['', Validators.compose([Validators.required])],
			confrimPassword: ['', ],
			avatar: ['', ]
	    });
	}

	ngOnInit() 
	{
	  
	}
	
	getImages() {
		this.options = {
		  // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
		  // selection of a single image, the plugin will return it.
		  maximumImagesCount: 1,
	 
		  // max width and height to allow the images to be.  Will keep aspect
		  // ratio no matter what.  So if both are 800, the returned image
		  // will be at most 800 pixels wide and 800 pixels tall.  If the width is
		  // 800 and height 0 the image will be 800 pixels wide if the source
		  // is at least that wide.
		  width: 500,
		  //height: 200,
	 
		  // quality of resized image, defaults to 100
		  quality: 100,
	 
		  // output type, defaults to FILE_URIs.
		  // available options are 
		  // window.imagePicker.OutputType.FILE_URI (0) or 
		  // window.imagePicker.OutputType.BASE64_STRING (1)
		  outputType: 1
		};
		this.imageResponse = [];
		this.imagePicker.getPictures(this.options).then((results) => {
		  for (var i = 0; i < results.length; i++) {
			this.imageResponse.push('data:image/jpeg;base64,' + results[i]);
		  }
		}, (err) => {
		  alert(err);
		});
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
				'');
		}
	}
}
