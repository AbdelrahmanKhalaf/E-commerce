import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IdataUser } from '../models/IdataUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) { }
  getUsers(){
    return this.http.get(`${environment.urlDev}users`)
  }
  getUserInfo(name:any){
    return this.http.get(`${environment.urlDev}admin/user/${name}`)
  }
  upateInfoUser(name:any,data:IdataUser){
    return this.http.put(`${environment.urlDev}/admin/changeInf/${name}`
    ,data)
  }
}
