import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage'

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
  url = 'http://159.203.15.30/trophyapi/api/users/token.json';

  //storage to store the token
  //http to make api calls
  constructor(private storage : Storage, private http : HttpClient) { }

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

    //post data
    this.http.post(this.url, JSON.stringify(body), httpOptions)
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
}
