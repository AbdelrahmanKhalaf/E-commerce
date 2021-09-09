import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAddWalt } from 'src/app/shard/models/IaddWalt';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';
import { environment } from 'src/environments/environment';
declare const Stripe: any

@Component({
  selector: 'app-walt',
  templateUrl: './walt.component.html',
  styleUrls: ['./walt.component.css']
})
export class WaltComponent implements OnInit {
  public message: any;
  public errorMessage: any;
  public user: any;
  constructor(private prodact: ProdactsService, private router: Router, private route: ActivatedRoute) { }
  form = new FormGroup({
    walt: new FormControl("", Validators.required)
  })
  get walt() {
    return this.form.get('walt')
  }
  ngOnInit(): void {
    this.prodact.myInfromtion().subscribe((res: any) => {
      this.user = res.user[0]

    })
    this.route.queryParams.subscribe((pram: any) => {
      if (pram.session_id) {

        let data: IAddWalt = {
          walt: pram.walt
        }



        this.prodact.addWalt(data).subscribe((res: any) => {
          this.message = res.message
          this.router.navigate(['/user/details'])
        }, (err: any) => {
          if (err.status === 502) {
            this.errorMessage = err.error;
          }
          if (err.status === 501) {
            this.errorMessage = err.error.error;
          }
          if (err.status === 500) {

            this.errorMessage = err.error.error;
          }
          if (err.status === 400) {
            this.errorMessage = err.error.error;
          }
          if (err.error.error_ar) {
            this.errorMessage = err.error.error_ar;
          }
          if (err.error.error_en) {
            this.errorMessage = err.error.error_en;
          }
          if (err.status === 404) {
            this.errorMessage = err.error.error;
          }
          if (err.status === 401) {
            this.errorMessage = err.error.error_ar;
          }
        })



      }

    })
  }
  save() {

    const dataProd = {
      walt: this.walt.value,
      customer_email: this.user.email,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: "sar",
          unit_amount: this.walt.value * 100,
          product_data: {
            name: "walt Price",
            images: [`https://zeejprint.com/website/images/services/graphic-design/marketing-and-advertising.jpg`]
          }
        }
      }
      ]
    }
    this.prodact.checWalt(dataProd).subscribe((res: any) => {
      console.log(res);
      const stripe = Stripe(environment.sercet_key)
      console.log(stripe);

      stripe.redirectToCheckout(
        { sessionId: res.sessionId }
      )

    }, (err: any) => {
      if (err.status === 502) {
        this.errorMessage = err.error;
      }
      if (err.status === 501) {
        this.errorMessage = err.error.error;
      }
      if (err.status === 500) {

        this.errorMessage = err.error.error;
      }
      if (err.status === 400) {
        this.errorMessage = err.error.error;
      }
      if (err.error.error_ar) {
        this.errorMessage = err.error.error_ar;
      }
      if (err.error.error_en) {
        this.errorMessage = err.error.error_en;
      }
      if (err.status === 404) {
        this.errorMessage = err.error.error;
      }
      if (err.status === 401) {
        this.errorMessage = err.error.error_ar;
      };
    })

  }


}
