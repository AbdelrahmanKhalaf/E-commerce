import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { ProdactModule } from './prodact/prodact.module';
import { UserModule } from './user/user.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './shard/interceptors/auth.interceptor';
import { UsersModule } from './users/users.module';
import { AgePipe } from './shard/pipe/age.pipe';
import { CountPricePipe } from './shard/pipe/count-price.pipe';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    ProdactModule,
    UserModule,
    HttpClientModule,
    UsersModule,
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
