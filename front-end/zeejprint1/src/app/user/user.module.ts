import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DetailsComponent } from './profile/details/details.component';
import { UpdateDetailsComponent } from './profile/update-details/update-details.component';
import { UpdateEmailComponent } from './profile/update-email/update-email.component';
import { UpdateImgComponent } from './profile/update-img/update-img.component';
import { UpdatePasswordComponent } from './profile/update-password/update-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetailsComponent,
    UpdateDetailsComponent,
    UpdateEmailComponent,
    UpdateImgComponent,
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class UserModule { }
