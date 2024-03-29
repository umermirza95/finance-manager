import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Transaction } from 'src/app/models/Transaction';
import { DataService } from 'src/app/services/data.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Utilities } from 'src/app/utilities/Utilities';
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

interface ColumnItem {
	name: string;
	sortOrder: NzTableSortOrder | null;
	sortFn: NzTableSortFn | null;
	sortDirections: NzTableSortOrder[];
}

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

	addModalVisible: boolean = false;
	deleteModalVisible: boolean = false;
	addingTransaction: boolean = false;
	transaction = new Transaction();
	selectedValue: string = null;
	allcategories: Array<Category> = [];
	categoryTable: any = {};
	transactions: Array<Transaction> = [];
	categories: Array<Category> = [];
	date: Date = new Date();
	rangeDate: Array<Date>;
	filter: any = {
		from: new Date().getTime(),
		to: new Date().getTime(),
		type: null,
		active: false
	};
	sort: any = {
		dateSort: 'descend',
		amountSort: null,
	};
	totalExpense: string = "";
	totalIncome: string = "";
	dateParser = Utilities.dateParser;
	listOfColumns: ColumnItem[] = [
		{
			name: 'Amount',
			sortOrder: null,
			sortFn: (a: Transaction, b: Transaction) => a.amount > b.amount ? 1 : -1,
			sortDirections: ['ascend', 'descend',]
		},
		{
			name: 'Date',
			sortOrder: 'descend',
			sortFn: (a: Transaction, b: Transaction) => a.timestamp > b.timestamp ? 1 : -1,
			sortDirections: ['ascend', 'descend'],

		}
	];

	constructor(
		private dataService: DataService,
		private message: NzMessageService
	) { }

	async ngOnInit() {

		this.initFilter();
		this.allcategories = await this.dataService.getCategories();
		this.allcategories.forEach((cat) => {
			this.categoryTable[cat.id] = { name: cat.name }
		});
		this.onTypeChanged(this.transaction.type);
		this.fetchTransactions();
	}

	initFilter() {
		let date = new Date();
		this.rangeDate = [];
		this.rangeDate[0] = new Date(date.getFullYear(), date.getMonth(), 1);
		this.rangeDate[1] = new Date(date.getFullYear(), date.getMonth(), new Date(date.getFullYear(), date.getMonth(), 0).getDate() + 1);
		this.filter.from = this.rangeDate[0].getTime();
		this.filter.to = this.rangeDate[1].getTime();
	}

	onTypeChanged(newType: string) {
		this.categories = this.allcategories.filter((category) => { return category.type === newType });
		this.transaction.categoryId = null;
	}

	async fetchTransactions() {
		try {
			this.transactions = await this.dataService.getTransactions(this.filter);
			this.ontransactionsReceived();
		}
		catch (error) {
			console.log(error);
			this.message.create("error", "Failed to fetch transactions");
		}
	}


	ontransactionsReceived() {
		this.totalExpense = "";
		this.totalIncome = "";
		let exp = 0;
		let inc = 0;
		this.transactions.forEach(trans => {
			if (trans.type === Utilities.transactionTypes.expense) {
				exp += trans.amount;
			}
			else {
				inc += trans.amount;
			}
		});
		this.totalExpense = exp.toLocaleString();
		this.totalIncome = inc.toLocaleString();
	}

	showAddModal(trans: Transaction = null) {
		if (trans) {
			this.transaction = trans.createCopy();
			this.date = new Date(this.transaction.timestamp);
			console.log(this.transaction.id);
		}
		else {
			this.transaction = new Transaction();

		}
		this.categories = this.allcategories.filter((category) => { return category.type === this.transaction.type });
		this.addModalVisible = true;
	}

	showDeleteModal(trans: Transaction) {
		this.transaction = trans.createCopy();
		this.deleteModalVisible = true;
	}

	hideAddModal() {
		if (!this.addingTransaction) {
			this.addModalVisible = false;
			this.deleteModalVisible = false;
		}
	}

	async addTransaction() {
		try {
			this.addingTransaction = true;
			this.transaction.timestamp = this.date.getTime();
			let newtrans: Transaction;
			if (this.transaction.id) {
				newtrans = await this.dataService.editTransaction(this.transaction);
			}
			else {
				newtrans = await this.dataService.createTransaction(this.transaction);
			}
			this.fetchTransactions();
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

	async deleteTransaction() {
		try {
			this.addingTransaction = true;
			await this.dataService.deleteTransaction(this.transaction);
			this.fetchTransactions();
			this.message.create("success", "Transaction deleted successfully!");
			this.deleteModalVisible = false;
			this.addingTransaction = false;
		}
		catch (error) {
			this.addingTransaction = false;
			this.message.create("error", "Failed to delete transaction");
		}
	}

	applyFilter() {
		this.filter.from = this.rangeDate[0].getTime();
		this.filter.to = this.rangeDate[1].getTime();
		this.totalExpense = "";
		this.totalIncome = "";
		this.transactions = [];
		this.fetchTransactions();
		this.filter.active = false;
	}

}
