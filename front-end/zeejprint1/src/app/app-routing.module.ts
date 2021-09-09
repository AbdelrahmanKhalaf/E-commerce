import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shard/middlewares/auth.guard';

const routes: Routes = [
  { path: 'prodacts', loadChildren: () => import('./prodact/prodact.module').then(m => m.ProdactModule) },
  { path: '', redirectTo: '/pages/home', pathMatch: 'full' },
  { path: "pages", loadChildren:()=>import ('./pages/pages.module').then(m => m.PagesModule),},
  { path: "auth", loadChildren:()=>import ('./auth/auth.module').then(m => m.AuthModule)},
  { path: "user", loadChildren:()=>import ('./users/users.module').then(m => m.UsersModule) ,
canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
