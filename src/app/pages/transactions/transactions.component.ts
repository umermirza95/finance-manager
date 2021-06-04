import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Transaction } from 'src/app/models/Transaction';
import { DataService } from 'src/app/services/data.service';


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
	allcategories:Array<Category>=[];
	categories:Array<Category>=[];

	constructor(
		private dataService: DataService
	) { }

	async ngOnInit() {
		this.allcategories = await this.dataService.getCategories();
		this.categories=this.allcategories.filter((category)=>{return category.type === this.transaction.type });
	}


	showAddModal() {
		this.addModalVisible = true;
	}

	hideAddModal() {
		this.addModalVisible = false;
	}

	addTransaction() {
		this.addModalVisible = false;
	}

}
