import { NgModule } from '@angular/core';
import { MainRoutingComponent } from './main-routing.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';



const routes:Routes=[
	{
		path:"",
		component:MainRoutingComponent,
		canActivate:[AuthGuard],
		children:[
			{
				path: 'transactions',
				loadChildren: () => import('../pages/transactions/transactions.module').then(m => m.TransactionsModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MainRoutingModule { }
