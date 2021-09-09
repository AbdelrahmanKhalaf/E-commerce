import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGurde } from '../shard/middlewares/auth-gurde.service';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { DetailsCategoryComponent } from './details-category/details-category.component';
import { UpdateCategoriesComponent } from './update-categories/update-categories.component';

const routes: Routes = [
  { path: '', redirectTo: '/category/all-category', pathMatch: 'full' },
  { path: 'category/all-category', component:AllCategoriesComponent ,canActivate:[AuthGurde]},// redirect to `first-component`
  { path: 'category/all-category/update-category/:id', component:UpdateCategoriesComponent ,canActivate:[AuthGurde]},// redirect to `first-component`
  { path: 'category/all-category/add-category', component:AddCategoriesComponent ,canActivate:[AuthGurde]},// redirect to `first-component`
  { path: 'category/all-category/details-category/:id', component:DetailsCategoryComponent ,canActivate:[AuthGurde]},// redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
