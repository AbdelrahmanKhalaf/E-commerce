import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OredersRoutingModule } from './oreders-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AllOrdersComponent } from './all-orders/all-orders.component';


@NgModule({
  declarations: [
    AllOrdersComponent
  ],
  imports: [
    CommonModule,
    OredersRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class OredersModule { }
