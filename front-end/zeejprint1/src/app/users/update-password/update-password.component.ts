import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {


  public errorMessage:any;
  public message:any
  form = new FormGroup({
    newPass:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })
  constructor(private user : ProdactsService , private router : Router ) { }
  get newPass(){
    return this.form.get('newPass')
  }
  get password(){
    return this.form.get('password')
  }
  ngOnInit(): void {

  }
  makeChange(){
    let data:any = {
      newPass:this.newPass.value,
      password:this.password.value
    }
    this.user.changPassword(data).subscribe((res:any)=>{
      this.message = res.message_en
      localStorage.removeItem('token')
      this.router.navigate(['/auth/login'])
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

}
