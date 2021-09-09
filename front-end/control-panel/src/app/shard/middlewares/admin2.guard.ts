import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ProdactsService } from '../services/prodacts.service';

@Injectable({
  providedIn: 'root'
})
export class Admin2Guard implements CanActivate {
  constructor(private router: Router, private user: ProdactsService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.user.myInfromtion().subscribe((res: any) => {
      if (res.user[0].isAdmin) {
        return true;
      }
      this.router.navigate(['auth/login'], {
        queryParams: { returnUrl: state.url },
      });
      return true;
     })
    return true
  }

}
