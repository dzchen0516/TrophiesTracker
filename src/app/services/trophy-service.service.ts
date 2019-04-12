import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage'
import { Platform } from '@ionic/angular';

//authentication token
const TOKEN_KEY = 'auth-token';


@Injectable({
  providedIn: 'root'
})
export class TrophyServiceService {

  //this behaviorSubject can subscribed to get the latest
  //authentication state. This default is set to false
  //which means the user is not authenticated at the beginning
  authenticationState = new BehaviorSubject(false);

  //url of the api call
  base_url = 'http://159.203.15.30/trophyapi/api/users/';

  //storage to store the token
  //http to make api calls
  //plt to 
  constructor(private storage : Storage, 
              private http : HttpClient, 
              private plt : Platform) {
              
              //if everything(localStorage etc.) on the
              //patform(or device) is ready, validate the token
              //to see if the user has been authenticated
              this.plt.ready().then(() => {
                 this.checkToken();
              });  
    }

   //handle user login
   userLogin(email : string, password : string) {
		//setup header
		const httpOptions = { headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Accept': 'application/json'
			}) 
		};
    
		//prepare data
		let body = {
			email: email,
			password: password
		};

		var token_url = this.base_url + 'token.json';

		//post data
		this.http.post(token_url, JSON.stringify(body), httpOptions)
		.subscribe( //subscribe to get results
			data => {
				console.log(data);
        
				//Store the token
				this.storage.set(TOKEN_KEY, data['data']['token']).then(
				res => {
					//change the authentication state to notify the observers
					this.authenticationState.next(true);
				}
			);
		}, error => {;
			console.log(error)
		});
	}

	userSignup(email : string, username : string, password : string, avatar : string){
		//setup header
		const httpOptions = { headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Accept': 'application/json'
			}) 
		};
		
		//prepare data
		let body = {
			email: email,
			password: password,
			username: username,
			avatar: avatar
		};
		
		var register_url = this.base_url + 'register';
		
		//post data
		this.http.post(register_url, JSON.stringify(body), httpOptions)
		.subscribe( //subscribe to get results
			data => {
				console.log(data);
        
				//Store the token
				this.storage.set(TOKEN_KEY, data['data']['token']).then(
				res => {
					//change the authentication state to notify the observers
					this.authenticationState.next(true);
				}
			);
		}, error => {;
			console.log(error)
		})
		
	}

  //check to see of the user has been authenticated
  isAuthenticated() {
    return this.authenticationState.value;
  }


  //check to see if the token is valid
  checkToken() {
    //TODO
  }
}
