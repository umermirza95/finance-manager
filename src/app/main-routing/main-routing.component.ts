import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import firebase from "firebase/app";
import "firebase/auth";

@Component({
	selector: 'app-main-routing',
	templateUrl: './main-routing.component.html',
	styleUrls: ['./main-routing.component.css']
})
export class MainRoutingComponent implements OnInit {

	isCollapsed = false;

	constructor(
		private router : Router
	) { }

	ngOnInit(): void {
	}

	async logout() {
		await firebase.auth().signOut();
		this.router.navigate(["login"]);
	}

}
