import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdactsRoutingModule } from './prodacts-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AllProdactsComponent } from './all-prodacts/all-prodacts.component';
import { DetailsProdactComponent } from './details-prodact/details-prodact.component';
import { UpdateProdactComponent } from './update-prodact/update-prodact.component';
import { AddProdactComponent } from './add-prodact/add-prodact.component';
import { AddAttributComponent } from './add-attribut/add-attribut.component';
import { UpdateAttributComponent } from './update-attribut/update-attribut.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UpdateImgComponent } from './update-img/update-img.component';


@NgModule({
  declarations: [
    AllProdactsComponent,
    DetailsProdactComponent,
    UpdateProdactComponent,
    AddProdactComponent,
    AddAttributComponent,
    UpdateAttributComponent,
    UpdateCategoryComponent,
    NotFoundComponent,
    UpdateImgComponent,
  ],
  imports: [
    CommonModule,
    ProdactsRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    MatProgressSpinnerModule,
    ImageCropperModule
  ]
})
export class ProdactsModule { }
