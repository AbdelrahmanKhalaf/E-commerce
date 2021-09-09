import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllInventariesComponent } from './inventaries/all-inventaries/all-inventaries.component';
import { HomeComponent } from './pages/home/home.component';
import { Admin2Guard } from './shard/middlewares/admin2.guard';
import { AuthGuard } from './shard/middlewares/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
  { path: 'home', component:HomeComponent,
}, // redirect to `first-component`
  { path: 'inventaries', component:AllInventariesComponent,    canActivate:[AuthGuard,Admin2Guard]
}, // redirect to `first-component`
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
    canActivate:[AuthGuard,Admin2Guard]

  },
  {
    path: 'prodacts',
    loadChildren: './prodacts/prodacts.module#ProdactsModule',
    canActivate:[AuthGuard,Admin2Guard]

  },
  {
    path: 'orders',
    loadChildren: './oreders/oreders.module#OredersModule',
    canActivate:[AuthGuard,Admin2Guard]

  },

  {
    path: 'history',
    loadChildren: './history/history.module#HistoryModule',
    canActivate:[AuthGuard,Admin2Guard]
  },
  {
    path: 'category',
    loadChildren: './category/category.module#CategoryModule',
    canActivate:[AuthGuard,Admin2Guard]
  },{
    path: 'subcategory',
    loadChildren: './subcategory/subcategory.module#SubcategoryModule',
    canActivate:[AuthGuard,Admin2Guard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
