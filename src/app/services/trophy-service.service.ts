import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrophyServiceService {
  url = 'http://159.203.15.30/trophyapi/api/users/token.json';

  constructor(private http : HttpClient) { }

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
        console.log(data)
      }, error => {;
        console.log(error)
      });
  }
}
