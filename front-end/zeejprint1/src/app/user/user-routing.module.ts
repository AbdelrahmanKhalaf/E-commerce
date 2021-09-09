import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../prodact/not-found/not-found.component';
import { ActivationEmailComponent } from './profile/activation-email/activation-email.component';
import { DetailsComponent } from './profile/details/details.component';
import { UpdateDetailsComponent } from './profile/update-details/update-details.component';
import { UpdateEmailComponent } from './profile/update-email/update-email.component';
import { UpdateImgComponent } from './profile/update-img/update-img.component';
import { UpdatePasswordComponent } from './profile/update-password/update-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/profile/profile', pathMatch: 'full' },
  {path:'profile/setting',component:UpdateDetailsComponent},
  {path:'update-imge',component:UpdateImgComponent},
  {path:'profile/update-email',component:UpdateEmailComponent},
  {path:'update-password',component:UpdatePasswordComponent},
  {path:'activate-email',component:ActivationEmailComponent},
  {path:'profile',component:DetailsComponent},
  { path: '**', component: NotFoundComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
