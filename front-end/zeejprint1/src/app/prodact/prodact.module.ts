import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdactRoutingModule } from './prodact-routing.module';
import { ProdactComponent } from './prodact.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProdactsComponent } from './prodacts/prodacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaleProdactComponent } from './sale-prodact/sale-prodact.component';
import { CategoryProdactComponent } from './category-prodact/category-prodact.component';
import { DetailsProdactsComponent } from './details-prodacts/details-prodacts.component';


@NgModule({
  declarations: [
    ProdactComponent,
    SideBarComponent,
    NotFoundComponent,
    ProdactsComponent,
    SaleProdactComponent,
    CategoryProdactComponent,
    DetailsProdactsComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    ProdactRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class ProdactModule { }
