import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../prodact/not-found/not-found.component';
import { ActivateEmailComponent } from './activate-email/activate-email.component';
import { ActivateImgComponent } from './activate-img/activate-img.component';
import { DetailsComponent } from './details/details.component';
import { CanceldComponent } from './my-orders/canceld/canceld.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { SuccssesComponent } from './my-orders/succsses/succsses.component';
import { ResendMessageComponent } from './resend-message/resend-message.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { UpdateEmailComponent } from './update-email/update-email.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { WaltComponent } from './walt/walt.component';

const routes: Routes = [
  { path: 'details', component: DetailsComponent },
  { path: '', redirectTo: '/user/details', pathMatch: 'full' },
  { path: 'setting', component: UpdateDetailsComponent },
  { path: 'update-imge', component: ActivateImgComponent },
  { path: 'update-email', component: UpdateEmailComponent },
  { path: 'walt-add', component: WaltComponent },
  { path: 'update-password', component: UpdatePasswordComponent },
  { path: 'activate-email/:token', component: ActivateEmailComponent },
  { path: 'resend-email', component: ResendMessageComponent },
  { path: 'my-orders/canceld', component: CanceldComponent },
  { path: 'my-orders/success', component: SuccssesComponent },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
