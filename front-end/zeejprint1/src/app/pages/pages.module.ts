import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServisesComponent } from './servises/servises.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ServisesComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule, ReactiveFormsModule

  ]
})
export class PagesModule { }
