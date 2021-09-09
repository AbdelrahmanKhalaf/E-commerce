import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { UpdateCategoriesComponent } from './update-categories/update-categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DetailsCategoryComponent } from './details-category/details-category.component';


@NgModule({
  declarations: [
    AllCategoriesComponent,
    AddCategoriesComponent,
    UpdateCategoriesComponent,
    DetailsCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class CategoryModule { }
