import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { TrophyServiceService } from '../services/trophy-service.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { UsernameValidator } from  '../validators/username';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';

import { finalize } from 'rxjs/operators';
 
const STORAGE_KEY = 'my_image';

@Component({
	 selector: 'app-signup',
	 templateUrl: './signup.page.html',
	 styleUrls: ['./signup.page.scss']
})

export class SignupPage implements OnInit {
	
	public signupForm: FormGroup;
	public submitAttempt: boolean = false;
	
	img = {};
	
	constructor(private trophyService: TrophyServiceService, public formBuilder: FormBuilder,
	private webview: WebView, 
	private toastController: ToastController, 
	private filePath: FilePath, 
	private storage: Storage, 
	private camera: Camera, 
	private file: File, 
	private actionSheetController: ActionSheetController,
	private platform: Platform,
	private ref: ChangeDetectorRef)
	{ 
		this.signupForm = formBuilder.group({
	        email: ['', Validators.compose([Validators.required])],
	        username: ['', Validators.compose([UsernameValidator.isValid, Validators.required])],
			password: ['', Validators.compose([Validators.required])],
			confrimPassword: ['', ],
			avatar: ['',]
	    });
	}

	ngOnInit() 
	{
	  
	}
	
	async selectImage() {
		const actionSheet = await this.actionSheetController.create({
			header: "Select Image source",
			buttons: [{
					text: 'Load from Library',
					handler: () => {
						this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
					}
				},
				{
					text: 'Cancel',
					role: 'cancel'
				}
			]
		});
		await actionSheet.present();
	}
	
	takePicture(sourceType: PictureSourceType) {
		var options: CameraOptions = {
			quality: 100,
			sourceType: sourceType,
			saveToPhotoAlbum: false,
			correctOrientation: true
		};
	 
		this.camera.getPicture(options).then(imagePath => 
		{
			if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) 
			{
				
				this.filePath.resolveNativePath(imagePath)
					.then(filePath => {
						let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
						let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
						this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
					});
			}
		});
	}
	
	createFileName() {
		var d = new Date(),
			n = d.getTime(),
			newFileName = n + ".jpg";
		return newFileName;
	}
	 
	copyFileToLocalDir(namePath, currentName, newFileName) {
		this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
			this.updateStoredImages(newFileName);
		}, error => {
			this.presentToast('Error while storing file.');
		});
	}
	 
	updateStoredImages(name) {
		this.storage.get(STORAGE_KEY).then(img => {
			let arr = JSON.parse(img);
			if (!arr) {
				let newImage = [name];
				this.storage.set(STORAGE_KEY, JSON.stringify(newImage));
			} else {
				arr.push(name);
				this.storage.set(STORAGE_KEY, JSON.stringify(arr));
			}
	 
			let filePath = this.file.dataDirectory + name;
			let resPath = this.pathForImage(filePath);
	 
			let newEntry = {
				name: name,
				path: resPath,
				filePath: filePath
			};
	 
			this.img = newEntry;
			this.ref.detectChanges(); // trigger change detection cycle
		});
	}

	pathForImage(img) {
		if (img === null) {
			return '';
		} else {
			let converted = this.webview.convertFileSrc(img);
			return converted;
		}
	}
 
	async presentToast(text) {
		const toast = await this.toastController.create({
		message: text,
		position: 'bottom',
		duration: 3000
		});
		toast.present();
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
