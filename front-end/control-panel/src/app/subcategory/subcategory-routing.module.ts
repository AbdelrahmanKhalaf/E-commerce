import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGurde } from '../shard/middlewares/auth-gurde.service';
import { AddSubcategoriesComponent } from './add-subcategories/add-subcategories.component';
import { AllSubcategoriesComponent } from './all-subcategories/all-subcategories.component';
import { DetailsSubcategoryComponent } from './details-subcategory/details-subcategory.component';
import { UpdateSubcategoriesComponent } from './update-subcategories/update-subcategories.component';

const routes: Routes = [{ path: '', redirectTo: '/subcategory/all-subcategory', pathMatch: 'full' },
{ path: 'subcategory/all-subcategory', component: AllSubcategoriesComponent, canActivate: [AuthGurde] },// redirect to `first-component`];
{ path: 'subcategory/all-subcategory/update-subcategory/:id', component:UpdateSubcategoriesComponent ,canActivate:[AuthGurde]},// redirect to `first-component`
{ path: 'subcategory/all-subcategory/add-subcategory', component:AddSubcategoriesComponent ,canActivate:[AuthGurde]},// redirect to `first-component`
{ path: 'subcategory/all-subcategory/details-subcategory/:id', component:DetailsSubcategoryComponent ,canActivate:[AuthGurde]},// redirect to `first-component`
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcategoryRoutingModule { }
