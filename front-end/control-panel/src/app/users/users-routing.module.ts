import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGurde } from '../shard/middlewares/auth-gurde.service';
import { AllUsersComponent } from './all-users/all-users.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/users/all-users', pathMatch: 'full' },
  { path: 'users/all-users', component:UsersComponent ,canActivate:[AuthGurde]},// redirect to `first-component`
  {path:'users/all-users/details-user/:name',component:DetailsUserComponent},
  {path:'orders/all-orders/details-user/:name',component:DetailsUserComponent},
  {path:'history/all-history/details-user/:name',component:DetailsUserComponent},
  {path:'users/all-users/details-user/update/:name',component:UpdateUserComponent}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
