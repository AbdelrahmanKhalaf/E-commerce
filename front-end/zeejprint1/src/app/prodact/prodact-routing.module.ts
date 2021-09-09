import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleProdactComponent } from './sale-prodact/sale-prodact.component';
import { DetailsProdactsComponent } from './details-prodacts/details-prodacts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProdactComponent } from './prodact.component';
import { CategoryProdactComponent } from './category-prodact/category-prodact.component';

const routes: Routes = [
 { path: '', redirectTo: '/prodacts', pathMatch: 'full' },
 { path: 'all-prodacts/:id', component: DetailsProdactsComponent},
 { path: 'pages/home/sale/:id', component: SaleProdactComponent},
 { path: 'filter', component: CategoryProdactComponent},

 { path: 'category/:id', component: CategoryProdactComponent},
 { path: 'category/:id/:id', component: DetailsProdactsComponent},
 { path: 'pages/home/sale/:id/:id', component: DetailsProdactsComponent},
 { path: 'pages/home/:id', component: DetailsProdactsComponent},
 { path: '', component: ProdactComponent},
 { path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdactRoutingModule { }
