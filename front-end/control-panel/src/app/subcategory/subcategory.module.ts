import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoryRoutingModule } from './subcategory-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSubcategoriesComponent } from './add-subcategories/add-subcategories.component';
import { UpdateSubcategoriesComponent } from './update-subcategories/update-subcategories.component';
import { AllSubcategoriesComponent } from './all-subcategories/all-subcategories.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DetailsSubcategoryComponent } from './details-subcategory/details-subcategory.component';


@NgModule({
  declarations: [
    AddSubcategoriesComponent,
    UpdateSubcategoriesComponent,
    AllSubcategoriesComponent,
    DetailsSubcategoryComponent
  ],
  imports: [
    CommonModule,
    SubcategoryRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatProgressSpinnerModule

  ]
})
export class SubcategoryModule { }
