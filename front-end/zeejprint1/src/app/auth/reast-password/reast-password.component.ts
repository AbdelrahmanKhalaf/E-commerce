import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-reast-password',
  templateUrl: './reast-password.component.html',
  styleUrls: ['./reast-password.component.css']
})
export class ReastPasswordComponent implements OnInit {
  public message: any;
  public errorMessage: any;
  public token: any;
  constructor(private user: ProdactsService, private route: ActivatedRoute) { }

  form = new FormGroup({
    newPass: new FormControl('', [Validators.required, Validators.email]),
  })
  get newPass() {
    return this.form.get('newPass')
  }

  cahangePassword() {
    let data: any = {
      newPass: this.newPass.value
    }
    this.user.reastPassword(data, this.token).subscribe((res: any) => {
      this.message = res.message_en
    }, (err: any) => {
      if (err.status === 502) {
        this.errorMessage = err.error;
      }
      if (err.status === 501) {
        this.errorMessage = err.error;
      }
      if (err.status === 500) {

        this.errorMessage = err.error;
      }
      if (err.error.error_en) {
        this.errorMessage = err.error.error_en;
      }
      if (err.error.error_ar) {
        this.errorMessage = err.error.error_ar;
      }
      if (err.status === 400) {
        this.errorMessage = err.error.error_en;
      }
      if (err.status === 404) {
        this.errorMessage = err.error;
      }
      if (err.status === 401) {
        this.errorMessage = err.error.error_en;
      }
    })
  }
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')
  }

}
