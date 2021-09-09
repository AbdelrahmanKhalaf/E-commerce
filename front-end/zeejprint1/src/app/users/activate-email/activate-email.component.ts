import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IchangeEmail } from 'src/app/shard/models/ChangeEmail';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-activate-email',
  templateUrl: './activate-email.component.html',
  styleUrls: ['./activate-email.component.css']
})
export class ActivateEmailComponent implements OnInit {
  public errorMessage:any;
  public message:any
  form = new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email]),
  })
  constructor(private user : ProdactsService , private route : ActivatedRoute) { }
  public token:any;
  get email(){
    return this.form.get('email')
  }
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')
    this.user.activateEmail(this.token).subscribe((res:any)=>{
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

}
