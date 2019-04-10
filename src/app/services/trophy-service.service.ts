import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrophyServiceService {
	url = 'http://159.203.15.30/trophyapi/api/users/token';
	constructor(private http : HttpClient) { }

	userLogin(username : string, password : string) {
  
		//setup header test

		const httpOptions = { headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			})
		};

		let body = {
			email:"dpeters@avant.ca",
			password: "admin"
		}

		//post data
		this.http.post(this.url, JSON.stringify(body), httpOptions)
		.subscribe( //subscribe 
			data => {
				console.log(data['_body'])
			}, error => {
				console.log(error)
		});


		// GET
		//var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMwLCJleHAiOjE1NTQ5MzU3MjJ9.MajcYOYFJzBmTznZk33U9fugC_Wg0X3-CcmdfMU2dvE";

		/*const httpOptions = { headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'Authorization': 'Bearer ' + token
			})
		};

		this.http.get("http://159.203.15.30/trophyapi/api/users", httpOptions)
		.subscribe( //subscribe
				data => {
					console.log(data['_body'])
			}, error => {
				console.log(error)
		});*/
    }
}
