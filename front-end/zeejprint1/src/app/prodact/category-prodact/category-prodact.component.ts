import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Plugins } from 'protractor/built/plugins';
import { IOrder } from 'src/app/shard/models/IOrder';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';
import { SideBarComponent } from '../layout/side-bar/side-bar.component';

@Component({
  selector: 'app-category-prodact',
  templateUrl: './category-prodact.component.html',
  styleUrls: ['./category-prodact.component.css']
})
export class CategoryProdactComponent implements OnInit {
  public id: any;
  public prodacts: any;
  public messageError: any;
  public prodactSale: any;
  public categories: any;
  public conditionCateg = 0;
  public prams = []
  public message: any;
  public errorMessage: any;
  public userId:any;
  public defultCount:any;
  public detailsOrder:any;
  public errorMessageBad:any;
  constructor(private prodactServ: ProdactsService, private route: ActivatedRoute, private router: Router) { }
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
    this.prodactServ.addOrder(data).subscribe((res:any)=>{
      this.message = res.message_en

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
  clic(value){
    this.detailsOrder = this.prodacts[value]
  }
  ngOnInit(): void {

    this.defultCount = 1
    this.route.params.subscribe((prams: any) => {
      if (prams.id) {
        this.id = this.route.snapshot.paramMap.get('id');
        this.prodactServ.getAllSubCatgByIdCategories(this.id).subscribe((res: any) => {
          this.categories = res.categories
          this.conditionCateg = 0
        })
        this.prodactServ.ProdactesbyCateg(this.id).subscribe((res: any) => {
          this.prodacts = res.prodact;
          this.conditionCateg = 1
          this.messageError = '';
        }, (err: any) => {
          if (err.status = 400) {
            this.prodacts = []
            this.messageError = err.error.error_en
          }
        })
      }
    })
    this.route.queryParamMap.subscribe((prams: any) => {
      if (prams.params.sale) {
        this.prodactServ.filterProdactsSale(prams.params.sale).subscribe((res: any) => {
          this.prodacts = res.prodact
          this.conditionCateg = 1
          this.messageError = null
        }, (err) => {
          if (err.status = 400) {
            this.prodacts = []
            this.messageError = err.error.error_en
          }
        })
      }
      if (prams.params.gt) {
        this.prodactServ.filterProdactsLtAndGt(prams.params.gt, prams.params.lt).subscribe((res: any) => {
          this.prodacts = res.prodact
          this.conditionCateg = 1
          this.messageError = null
        }, (err) => {
          if (err.status = 400) {
            this.prodacts = []
            this.messageError = err.error.error_en
          }
        })
      }
      if (prams.params.value) {
        this.prodactServ.filterProdactsAttribute(prams.params.attribute, prams.params.value).subscribe((res: any) => {
          this.prodacts = res.prodact
          this.conditionCateg = 1

          this.messageError = null
        }, (err) => {
          if (err.status = 400) {
            this.prodacts = []
            this.messageError = err.error.error_en
          }
        })
      }
      if (prams.params.size) {
        this.prodactServ.filterProdactsAttribute(prams.params.attribute, prams.params.value).subscribe((res: any) => {
          this.prodacts = res.prodact
          this.conditionCateg = 1

          this.messageError = null
        }, (err) => {
          if (err.status = 400) {
            this.prodacts = []
            this.messageError = err.error.error_en
          }
        })
      }
    })
    this.prodactServ.myInfromtion().subscribe((res:any)=>{
      this.userId = res.user[0]._id

    })
  }

}
