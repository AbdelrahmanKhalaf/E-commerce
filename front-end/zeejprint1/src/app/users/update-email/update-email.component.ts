import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IchangeEmail } from 'src/app/shard/models/ChangeEmail';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.css']
})
export class UpdateEmailComponent implements OnInit {

  public errorMessage:any;
  public message:any
  form = new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email]),
    password:new FormControl('',[Validators.required])
  })
  constructor(private user : ProdactsService , private router : Router ) { }
  get email(){
    return this.form.get('email')
  }
  get password(){
    return this.form.get('password')
  }
  ngOnInit(): void {

  }
  makeChange(){
    let data:IchangeEmail = {
      email:this.email.value,
      password:this.password.value
    }
    this.user.changeEmail(data).subscribe((res:any)=>{
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
