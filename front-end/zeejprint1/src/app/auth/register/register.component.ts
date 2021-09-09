import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRegister } from 'src/app/shard/models/IRegister';
import { AuthService } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  public errorMessage:any;
  public message :any;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });
  get name() {
    return this.form.get('name')
  };
  get phone() {
    return this.form.get('phone')
  };
  get email() {
    return this.form.get('email')
  };
  get address() {
    return this.form.get('address')
  };
  get password() {
    return this.form.get('password')
  };
  get confirmPassword() {
    return this.form.get('confirmPassword')
  };
  makeRegister() {
    let dataUser: IRegister = {
      name: this.name.value,
      phone: this.phone.value,
      email: this.email.value,
      address: this.address.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value
    }
    this.auth.makeRegister(dataUser).subscribe((res:any)=>{
      this.message = res.message_en
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
