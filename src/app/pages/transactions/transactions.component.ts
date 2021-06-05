import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Transaction } from 'src/app/models/Transaction';
import { DataService } from 'src/app/services/data.service';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

	addModalVisible: boolean = false;
	addingTransaction: boolean = false;
	transaction = new Transaction();
	selectedValue: string = null;
	allcategories: Array<Category> = [];
	categories: Array<Category> = [];
	date: Date = new Date();

	constructor(
		private dataService: DataService,
		private message: NzMessageService
	) { }

	async ngOnInit() {
		this.allcategories = await this.dataService.getCategories();
		this.categories = this.allcategories.filter((category) => { return category.type === this.transaction.type });
	}


	showAddModal() {
		this.addModalVisible = true;
	}

	hideAddModal() {
		this.addModalVisible = false;
		this.transaction = new Transaction();
	}

	async addTransaction() {
		try {
			this.addingTransaction = true;
			if (this.date) {
				this.transaction.timestamp = this.date.getTime();
			}
			const newtrans = await this.dataService.createTransaction(this.transaction);
			this.message.create("success", "Transaction saved successfully!");
			console.log(newtrans.id);
			this.addingTransaction = false;
			this.hideAddModal();
		}
		catch (error) {
			this.addingTransaction = false;
			this.message.create("error", "Failed to save transaction");
		}
	}

}
