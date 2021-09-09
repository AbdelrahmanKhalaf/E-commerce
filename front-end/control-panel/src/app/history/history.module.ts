import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllHistoryComponent } from './all-history/all-history.component';
import { DetailsHistoryComponent } from './details-history/details-history.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    AllHistoryComponent,
    DetailsHistoryComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatProgressSpinnerModule

  ]
})
export class HistoryModule { }
