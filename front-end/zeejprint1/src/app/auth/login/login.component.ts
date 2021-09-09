import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from 'src/app/shard/models/Ilogin';
import { AuthService } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth : AuthService ,private router : Router, ) { }
 form = new FormGroup({
   email:new FormControl(null,[Validators.required,Validators.email]),
   password:new FormControl(null,[Validators.required])
 })
 public errorMessage :any;
 public message:any
 get email(){
   return this.form.get('email')
 }
 get password(){
  return this.form.get('password')
}
makeLogin(){
  let dataLogin :ILogin={
     email:this.email.value,
     password:this.password.value
  }
  this.auth.login(dataLogin).subscribe((res:any)=>{
    this.router.navigate(['/home']);
  localStorage.setItem('token',res.bearer)
  },(err:any)=>{
    if (err.status === 502) {
      this.errorMessage = err.error;
    }
    if (err.status === 501) {
      this.errorMessage = err.error;
    }
    if (err.status === 500) {

      this.errorMessage = err.error;
    }
    if (err.status === 400) {
      this.errorMessage = err.error;
    }
    if (err.error.error_ar) {
      this.errorMessage = err.error.error_ar;
    }
    if (err.error.error_en) {
      this.errorMessage = err.error.error_en;
    }
    if (err.status === 404) {
      this.errorMessage = err.error;
    }
    if (err.status === 401) {
      this.errorMessage = err.error.error_ar;
    }
  })
}
  ngOnInit(): void {
  }

}
