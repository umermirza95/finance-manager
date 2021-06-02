import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from "firebase/app";
import "firebase/auth";


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	validateForm!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private router : Router
	) { }

	ngOnInit(): void {
		this.validateForm = this.fb.group({
			userName: [null, [Validators.required, Validators.email]],
			password: [null, [Validators.required]]
		});
	}

	submitForm(): void {
		for (const i in this.validateForm.controls) {
			this.validateForm.controls[i].markAsDirty();
			this.validateForm.controls[i].updateValueAndValidity();
		}
		if (!this.validateForm.valid) return;
		firebase.auth().signInWithEmailAndPassword(
			this.validateForm.controls.userName.value,
			this.validateForm.controls.password.value
		).then((user) => {
				this.router.navigate(["/transactions"]);
		}).catch(() => {

		})
	}

}
