import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrophyServiceService {
  url = 'http://159.203.15.30/trophyapi/api/users/token';

  constructor(private http : HttpClient) { }

  userLogin(username : string, password : string) {
    //setup header
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const httpOptions = { headers };
    
    //prepare data
    let body = {
      username: username,
      password: password
    };

    //post data
    this.http.post(this.url, JSON.stringify(body), httpOptions)
    .subscribe( //subscribe 
      data => {
        console.log(data['_body'])
      }, error => {;
        console.log(error)
      });
  }
}
