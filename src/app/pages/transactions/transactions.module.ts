import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';


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
		NzModalModule,
		NzRadioModule,
		FormsModule,
		NzDatePickerModule,
		NzSelectModule,
		NzFormModule
	]
})
export class TransactionsModule {

	


}
