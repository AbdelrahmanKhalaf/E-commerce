import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllHistoryComponent } from './all-history/all-history.component';
import { DetailsHistoryComponent } from './details-history/details-history.component';

const routes: Routes = [
  { path: '', redirectTo: '/history/all-history', pathMatch: 'full' },
  {path:"history/all-history",component:AllHistoryComponent},
  {path:"history/all-history/details/:id",component:DetailsHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
