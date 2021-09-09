import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAttributComponent } from './add-attribut/add-attribut.component';
import { AddProdactComponent } from './add-prodact/add-prodact.component';
import { AllProdactsComponent } from './all-prodacts/all-prodacts.component';
import { DetailsProdactComponent } from './details-prodact/details-prodact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UpdateAttributComponent } from './update-attribut/update-attribut.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { UpdateImgComponent } from './update-img/update-img.component';
import { UpdateProdactComponent } from './update-prodact/update-prodact.component';

const routes: Routes = [
  { path: '', redirectTo: '/prodacts/all-prodacts', pathMatch: 'full' },
  {
    path: "prodacts/all-prodacts", component: AllProdactsComponent,
  },
  { path: "prodacts/all-prodacts/update/:id", component: UpdateProdactComponent },
  { path: "prodacts/all-prodacts/add-prodact", component: AddProdactComponent },
  { path: "prodacts/all-prodacts/add-attribut/:id", component: AddAttributComponent },
  { path: "prodacts/all-prodacts/update-attribut/:id/:queryid", component: UpdateAttributComponent },
  { path: "prodacts/all-prodacts/details-prodact/:id", component: DetailsProdactComponent },
  { path: "prodacts/all-prodacts/details-prodact/:id/:idImg", component: UpdateImgComponent },
  { path: "orders/all-orders/details-prodact/:id", component: DetailsProdactComponent },
  { path: "history/all-history/details-prodact/:id", component: DetailsProdactComponent },
  { path: "prodacts/all-prodacts/update-category/:id", component: UpdateCategoryComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdactsRoutingModule { }
