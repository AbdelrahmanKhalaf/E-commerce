import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAddProdact } from 'src/app/shard/models/prodactAdd';
import { AuthService } from 'src/app/shard/services/auth.service';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-add-prodact',
  templateUrl: './add-prodact.component.html',
  styleUrls: ['./add-prodact.component.css']
})
export class AddProdactComponent implements OnInit {

  constructor(
    private prodactSrver : ProdactsService,
    private fb : FormBuilder ,
     private router : Router
     )
    { }
  public errorMessage :any ;
  public subCatg :any;

  form =new FormGroup({
    attributes:new FormArray([]),
    price:new FormControl('',[Validators.required]),
    sale:new FormControl('',[Validators.required]),
    kindOfCategory:new FormControl('',[Validators.required]),
    title_ar:new FormControl('',[Validators.required]),
    title_en:new FormControl('',[Validators.required]),
    des_en:new FormControl('',[Validators.required]),
    des_ar:new FormControl('',[Validators.required]),
    keywords:new FormControl('',[Validators.required]),
  })
  get price():any{
    return this.f['price'];
  }
  get title_ar(){
    return this.f['title_ar'];
  }
  get title_en(){
    return this.f['title_en'];
  }
  get des_ar(){
    return this.f['des_ar'];
  }
  get keywords(){
    return this.f['keywords'];
  }
  get des_en(){
    return  this.f['des_en'];
  }
  get sale(){
    return this.f['sale'];
  }
  get kindOfCategory(){
    return this.f['kindOfCategory'];
  }
  get attributes(){
    return  this.f['attributes'];
  }
  get key_ar(){
    return  this.getAtrb['key_ar'];
  }
  get key_en(){
    return this.getAtrb['key_ar'];
  }
  get value_ar(){
    return  this.getAtrb['value_ar'];
  }
  get value_en(){
    return  this.getAtrb['value_en'];
  }
  get f (){
    return this.form.controls
  }
  makeDone() {
    const DataUser: IAddProdact = {
      price: this.price.value,
      sale: this.sale.value,
      kindOfCategory: this.kindOfCategory.value,
      attributes: this.attributes.value,
      keywords:this.keywords.value,
      des_ar:this.des_ar.value,
      des_en:this.des_en.value,
      title_ar:this.title_ar.value,
      title_en:this.title_en.value
    };
    this.prodactSrver.addProdact(DataUser).subscribe((res: any) => {
      this.router.navigate(["/prodacts/all-prodacts"])
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
 get getAtrb():any{
   return this.form.controls['attributes'] as FormArray
 }
 addAtrb(){
   const atrbutForm =new FormGroup({
    key_ar:new FormControl( '', [Validators.required]),
    key_en:new FormControl('',[Validators.required]),
    value_en:new FormControl( '',[Validators.required]),
    value_ar:new FormControl('',[Validators.required]),
   })
   this.getAtrb.push(atrbutForm)
 }
 remove(index:any){
  let atr :any= this.form.controls['attributes'] as FormArray
  this.getAtrb.removeAt(index)
}
  ngOnInit(): void {
   this.prodactSrver.getAllSubCatg().subscribe((res:any)=>{
     this.subCatg = res.categories
   })
  }
}
