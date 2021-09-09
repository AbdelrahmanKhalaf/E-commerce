import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdataUser } from 'src/app/shard/models/IdataUser';
import { IRegister } from 'src/app/shard/models/IRegister';
import { UsersService } from 'src/app/shard/servises/users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  public nameId : any ;
  public user:any;
  constructor(private userServe: UsersService ,private route : ActivatedRoute, private router:Router) { }
  public errorMessage :any ;
  makeUpdateUser = new FormGroup({
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
   address: new FormControl(null, [
      Validators.required,
    ]),

    blocked: new FormControl(null, [
      Validators.required,
    ]),

  });
  get name() {
    return this.makeUpdateUser.get('name');
  }
  get address() {
    return this.makeUpdateUser.get('address');
  }
  get phone() {
    return this.makeUpdateUser.get('phone');
  }
  get blocked() {
    return this.makeUpdateUser.get('blocked');
  }

  update() {
    const DataUser: IdataUser = {
      name: this.name?.value,
      phone: this.phone?.value,
      address: this.address?.value,
      blocked:this.blocked?.value
    };
    this.userServe.upateInfoUser(this.nameId,DataUser).subscribe((res: any) => {
        this.router.navigate(["/users/all-users"])


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
    this.nameId = this.route.snapshot.paramMap.get('name')
    this.userServe.getUserInfo(this.nameId).subscribe((res:any)=>{
      this.user = res[0]

    })
  }

}
