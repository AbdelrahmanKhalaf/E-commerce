import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UpdateEmailComponent } from './update-email/update-email.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ActivateEmailComponent } from './activate-email/activate-email.component';
import { DetailsComponent } from './details/details.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { ActivateImgComponent } from './activate-img/activate-img.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AgePipe } from '../shard/pipe/age.pipe';
import { CountPricePipe } from '../shard/pipe/count-price.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ResendMessageComponent } from './resend-message/resend-message.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CanceldComponent } from './my-orders/canceld/canceld.component';
import { SuccssesComponent } from './my-orders/succsses/succsses.component';
import { WaltComponent } from './walt/walt.component';
@NgModule({
  declarations: [
    UpdateEmailComponent,
    ActivateEmailComponent,
    DetailsComponent,
    UpdateDetailsComponent,
    MyOrdersComponent,
    ActivateImgComponent,
    SideBarComponent,
    UpdatePasswordComponent,
    AgePipe,
    CountPricePipe,
    NavBarComponent,
    ResendMessageComponent,
    CanceldComponent,
    SuccssesComponent,
    WaltComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule, ReactiveFormsModule,
    ImageCropperModule

  ]
})
export class UsersModule { }
