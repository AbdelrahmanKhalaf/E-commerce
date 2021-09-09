import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IResend } from 'src/app/shard/models/emailActivate';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-resend-message',
  templateUrl: './resend-message.component.html',
  styleUrls: ['./resend-message.component.css']
})
export class ResendMessageComponent implements OnInit {
  public message :any;
  public errorMessage:any
  form = new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email]),
  })
  get email(){return this.form.get('email')}
  constructor(private user : ProdactsService) { }
  resendEmailActivate(){
    let date :IResend ={
      email:this.email.value
    }
    this.user.resendEmail(date).subscribe((res:any)=>{
      this.message = res.message_en
      if(res.error){
        this.errorMessage = "try agine after 2 hours from now"
      }

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
      if (err.error.error_en) {
        this.errorMessage = err.error.erorr_en;
      }
      if (err.error.error_ar) {
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
