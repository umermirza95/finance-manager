import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

	addModalVisible: boolean = false;
	addingTransaction: boolean = false;

	constructor() { }

	ngOnInit(): void {

	}


	showAddModal(){
		this.addModalVisible=true;
	}

	hideAddModal() {
		this.addModalVisible = false;
	}

	addTransaction() {
		this.addModalVisible = false;
	}

}
