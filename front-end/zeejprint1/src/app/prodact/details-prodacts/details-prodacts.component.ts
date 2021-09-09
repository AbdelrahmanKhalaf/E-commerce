import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shard/models/IOrder';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-details-prodacts',
  templateUrl: './details-prodacts.component.html',
  styleUrls: ['./details-prodacts.component.css'],
})
export class DetailsProdactsComponent implements OnInit {
  constructor(private prodactServ: ProdactsService, private route: ActivatedRoute) { }
  public id: any;
  public prodact: any
  public sale: any
  public img: any = []
  public dateNow: any = Date.now();
  public message: any;
  public errorMessage: any;
  public errorMessageBad: any
  public detailsOrder: any
  public defultCount: any;
  public userId: any;

  ngOnInit(): void {
    this.defultCount = 1
    this.id = this.route.snapshot.paramMap.get('id');
    this.prodactServ.detailsProdact(this.id).subscribe((res: any) => {
      this.prodact = res.prodact[0];
      this.detailsOrder = res.prodact[0]
      this.img = res.prodact[0].img
      this.sale =
        res.prodact[0].price -
        res.prodact[0].price * (res.prodact[0].sale / 100);
    });
    this.prodactServ.myInfromtion().subscribe((res: any) => {
      this.userId = res.user[0]._id

    })
  }
  form = new FormGroup({
    userId: new FormControl('', [Validators.required]),
    prodactId: new FormControl('', [Validators.required]),
    count: new FormControl('', [Validators.required]),
    address_en: new FormControl('', [Validators.required]),
  })
  get count() {
    return this.form.get('count')
  }
  get address_en() {
    return this.form.get('address_en')
  }
  get address_ar() {
    return this.form.get('address_ar')
  }
  get userId2() {
    return this.form.get('userId')
  }
  get prodactId() {
    return this.form.get('prodactId')
  }

  addOrder() {
    let data: IOrder = {
      count: this.count.value,
      address_en: this.address_en.value,
      userId: this.userId2.value,
      prodactId: this.prodactId.value
    }
    this.prodactServ.addOrder(data).subscribe((res: any) => {
      this.message = 'done add your order in your cart'
      // this.router.navigate(['/user/my-orders'])
    }, (err: any) => {

      if (err.status === 502) {
        this.errorMessage = err.error;
      }
      if (err.status === 501) {
        this.errorMessage = err.error;
      }
      if (err.status === 500) {

        this.errorMessageBad = err.error;
      }
      if (err.status === 400) {
        this.errorMessage = err.error;
      }
      if (err.status === 404) {
        this.errorMessage = err.error;
      }
      if (err.status === 401) {
        this.errorMessage = err.error.error;
      }
    })
  }

  // Next/previous controls





}
