import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';

import { HeaderComponent } from '../../components/header/header.component'


@NgModule({
	declarations: [
		TransactionsComponent,
		HeaderComponent
	],
	imports: [
		CommonModule,
		TransactionsRoutingModule,
		NzButtonModule,
		IconsProviderModule,
		NzModalModule
	]
})
export class TransactionsModule {

	


}
