import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import firebase from "firebase/app";
import "firebase/auth";

const BASE_URL = environment.baseApiUrl;
const CATEGORY = BASE_URL + "/category";

@Injectable({
	providedIn: 'root'
})
export class DataService {
	header: any = {};

	constructor(
		private http: HttpClient
	) {
		this.initService();
	}

	async initService(){
		let idToken=await firebase.auth().currentUser.getIdToken();
		this.header={Authorization:"Bearer "+idToken}
	}

	getCategories(): Promise<Array<Category>> {
		return new Promise<Array<Category>>((resolve, reject) => {
			this.http.get<Array<Category>>(CATEGORY,{headers:this.header}).subscribe((res) => {
				resolve(res);
			})
		});
	}

}
