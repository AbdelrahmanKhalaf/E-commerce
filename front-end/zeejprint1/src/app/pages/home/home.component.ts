import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/shard/models/IOrder';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public category:any;
  public page :any;
  public limit:any;
  public prodacts:any;
  public message :any;
  public errorMessage:any
  public errorMessageBad:any
  public userId:any;
  public defultCount:any;
  public detailsOrder:any;
  public prodactSale = []
  constructor(private prodactServer : ProdactsService , private router : Router) { }
  clic(value){
    this.detailsOrder = this.prodacts[value]


  }
  ngOnInit(): void {
    this.defultCount = 1
    this.page = 1;
    this.limit = 9;
    this.prodactServer.getAllSubCatg().subscribe((res:any)=>{
      this.category = res.categories

    })
    this.prodactServer.myInfromtion().subscribe((res:any)=>{
      this.userId = res.user[0]._id

    })
    this.prodactServer.allProdactes(this.page,this.limit).subscribe((res:any)=>{
      this.prodacts = res.prodact
    })


    this.prodactServer.saleProdactes().subscribe((res:any)=>{
      this.prodactSale = res.prodact
      // this.prodactSale = unique
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
      userId:this.userId2.value,
      prodactId:this.prodactId.value
    }
    this.prodactServer.addOrder(data).subscribe((res:any)=>{
      this.message = 'done add your order in your cart'

      // this.router.navigate(['/user/my-orders'])
    },(err:any)=>{

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

}
