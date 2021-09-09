import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(route:any, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['auth/login'], {
      queryParams: { returnUrl: state.url },
    });
    return true;
  }

}
