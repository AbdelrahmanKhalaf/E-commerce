import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ilogin } from 'src/app/shard/models/Ilogin.model';
import { AuthService } from 'src/app/shard/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService , private router :Router,private route :ActivatedRoute) { }
  public errorMessage :any ;
  makeUserRegister = new FormGroup({

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

  });

  get email() {
    return this.makeUserRegister.get('email');
  }

  get password() {
    return this.makeUserRegister.get('password');
  }

  register() {
    const DataUser: Ilogin = {
      email: this.email?.value,
      password: this.password?.value,
    };
    this.auth.login(DataUser).subscribe((res: any) => {
      localStorage.setItem("token",res.bearer)
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      console.log(returnUrl);

      this.router.navigate([returnUrl || '/home']);
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
