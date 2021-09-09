import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUpdateUser } from 'src/app/shard/models/dataUpdateUser';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {
  constructor(private user : ProdactsService , private router : Router) { }
  public message:any;
  public errorMessage:any
  public details:any;
  form = new FormGroup({
    name:new FormControl('',[Validators.required]),
    age:new FormControl('',[Validators.required]),
    phone:new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required]),
    gender:new FormControl('',[Validators.required ])
  })
  get name (){return this.form.get('name')}
  get age (){return this.form.get('age')}
  get phone (){return this.form.get('phone')}
  get password (){return this.form.get('password')}
  get gender (){return this.form.get('gender')}

  updateInfo(){
    let data : IUpdateUser = {
      name:this.name.value,
      age:this.age.value,
      phone:this.phone.value,
      password:this.password.value,
      gender:this.gender.value
    }
    this.user.updateMyInformtion(data).subscribe((res:any)=>{
      this.router.navigate(['/user'])
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
    this.user.myInfromtion().subscribe((res:any)=>{
      this.details = res.user[0]

    })
  }

}
