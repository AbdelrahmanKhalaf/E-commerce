import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OredersModule } from './oreders/oreders.module';
import { ProdactsModule } from './prodacts/prodacts.module';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AllInventariesComponent } from './inventaries/all-inventaries/all-inventaries.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './shard/interceptors/auth.interceptor';
import { HistoryModule } from './history/history.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavBarComponent,
    SideBarComponent,
    FooterComponent,
    AllInventariesComponent,
    HomeComponent,
    AboutUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    UsersModule,
    OredersModule,
    ProdactsModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    HistoryModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    CategoryModule,
    SubcategoryModule,
    MatProgressSpinnerModule  ,
    ImageCropperModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true,
    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
