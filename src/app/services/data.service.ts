import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/Category';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import firebase from "firebase/app";
import "firebase/auth";
import { Transaction } from '../models/Transaction';

const BASE_URL = environment.baseApiUrl;
const CATEGORY = BASE_URL + "/category";
const TRANSACTION=BASE_URL+"/transaction";

@Injectable({
	providedIn: 'root'
})
export class DataService {
	headers: any = {};

	constructor(
		private http: HttpClient
	) {}

	async getHeaders(){
		return new Promise(async (resolve,reject)=>{
			let idToken=await firebase.auth().currentUser.getIdToken();
			resolve({Authorization:"Bearer "+idToken});
		});
	}

	getCategories(): Promise<Array<Category>> {
		return new Promise<Array<Category>>(async (resolve, reject) => {
			this.headers= await this.getHeaders();
			this.http.get<Array<Category>>(CATEGORY,{headers:this.headers}).subscribe((res) => {
				resolve(res);
			})
		});
	}

	createTransaction(transaction:Transaction) : Promise<Transaction>{
		return new Promise<Transaction>(async (resolve,reject)=>{
			this.headers= await this.getHeaders();
			this.http.post<Transaction>(TRANSACTION, transaction.toJson(), {headers:this.headers}).subscribe((res)=>{
				resolve(res);
			},(error)=>{
				console.log(error);
				reject(error);
			});
		});
	}

}
