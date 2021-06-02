import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NzLayoutModule,
    NzCardModule,
    NzGridModule,
    NzInputModule,
    IconsProviderModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule
  ]
})
export class LoginModule { }
