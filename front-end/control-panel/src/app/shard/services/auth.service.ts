import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Ilogin } from '../models/Ilogin.model';
import { IRegister } from '../models/IRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router:Router) { }
  getToken():any{
    localStorage.getItem('token')
  }
  removToken():any{
    localStorage.removeItem('token'),
    this.router.navigate(['/auth/login']);

  }
  makeRegister(IRegister:IRegister){
    return this.http.post(`${environment.urlDev}singup`,IRegister)
  }
  login(ILogin:Ilogin){
    return this.http.post(`${environment.urlDev}auth/login/admin`,ILogin)

  }
}
