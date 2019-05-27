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

  //this behaviorSubject can be subscribed to get the latest
  //authentication state. This is set to false by default
  //which means the user is not authenticated at the beginning
  authenticationState = new BehaviorSubject(false);

  //url of the api call
  base_url = 'http://159.203.15.30/trophyapi/api/users/';

  //storage to store the token
  //http to make api calls
  //plt to validate the token
  constructor(private storage : Storage, 
              private http : HttpClient, 
              private plt : Platform) {
              
              //if everything(localStorage etc.) on the
              //patform(or device) is ready, validate the token
              //to see if the user has been authenticated
              this.plt.ready().then(() => {
                 console.log("trohpyService checking authentication token");
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
		}, error => {
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
		}, error => {
			console.log(error)
		});
		
	}

  //check to see of the user has been authenticated
  isAuthenticated() {
    return this.authenticationState.value;
  }


  //check to see if the token is valid
  checkToken() {
    return this.storage.get(TOKEN_KEY).then(token => {
      if(token) {
		console.log(token);
        //TODO: need to talk to the server and validate the token,
        //      it will assume the token is valid for now for testing purpose
        //this.authenticationState.next(true);
        //setup header
		    const httpOptions = { headers: new HttpHeaders({
			    'Content-Type': 'application/json',
			    'Accept': 'application/json'
			    }) 
		    };

        //get data
		    this.http.get(this.base_url, httpOptions)
		    .subscribe( //subscribe to get results
			    data => {
            this.authenticationState.next(true);
				    console.log(data);
		      }, error => {
            this.authenticationState.next(false);
			      console.log(error)
        });
        
      }
    });
  }

  //retrieve all the users
  getUsers() {
	this.storage.get(TOKEN_KEY).then(token => {  
		if(token) {
			const httpOptions = { headers: new HttpHeaders({
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + token
				}) 
			};

			//get data
			this.http.get(this.base_url, httpOptions)
			.subscribe( //subscribe to get results
				data => {
					console.log(data);
	 	 	}, error => {
				  console.log(error)
			});
		}
	});
  }

  //retrieve all the trophies
  getTrophies() {
	this.storage.get(TOKEN_KEY).then(token => {  
		if(token) {
			const httpOptions = { headers: new HttpHeaders({
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + token
				}) 
			};

			var getTrophiesUrl = this.base_url.slice(0, -6) + "trophies";
			//get data
			this.http.get(getTrophiesUrl, httpOptions)
			.subscribe( //subscribe to get results
				data => {
					console.log(data);
	 	 	}, error => {
				  console.log(error)
			});
		}
	});
  }

  //retrieve all users' trophies
  getUsersTrophies() {
	this.storage.get(TOKEN_KEY).then(token => {  
		if(token) {
			const httpOptions = { headers: new HttpHeaders({
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + token
				}) 
			};

			var getUsersTrophyUrl = this.base_url.slice(0, -2) + "_trophies";
			//get data
			this.http.get(getUsersTrophyUrl, httpOptions)
			.subscribe( //subscribe to get results
				data => {
					console.log(data);
	 	 	}, error => {
				  console.log(error)
			});
		}
	});
  }
}
