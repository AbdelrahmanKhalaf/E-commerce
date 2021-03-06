import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllOrdersComponent } from './all-orders/all-orders.component';

const routes: Routes = [
  { path: '', redirectTo: '/orders/all-orders', pathMatch: 'full' },
  {path:"orders/all-orders",component:AllOrdersComponent}]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OredersRoutingModule { }
