import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegister } from 'src/app/shard/models/IRegister';
import { AuthService } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private auth: AuthService) { }
  public errorMessage :any ;
  makeUserRegister = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/[569]\d{11}$/),
      Validators.minLength(11),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.maxLength(30),
    ]),

    password: new FormControl(null, [
      Validators.required,
      Validators.maxLength(28),
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl(null, [
      Validators.required,
      Validators.maxLength(28),
      Validators.minLength(8),
    ]),
  });
  get name() {
    return this.makeUserRegister.get('name');
  }
  get email() {
    return this.makeUserRegister.get('email');
  }
  get phone() {
    return this.makeUserRegister.get('phone');
  }
  get password() {
    return this.makeUserRegister.get('password');
  }
  get confirmPassword() {
    return this.makeUserRegister.get('confirmPassword');
  }
  register() {
    const DataUser: IRegister = {
      name: this.name?.value,
      phone: this.phone?.value,
      email: this.email?.value,
      password: this.password?.value,
      confirmPassword: this.confirmPassword?.value
    };
    this.auth.makeRegister(DataUser).subscribe((res: any) => {
      console.log(res);

    }, (err: any) => {
      console.log(err);

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
        this.errorMessage = err.error.error_ar;
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
