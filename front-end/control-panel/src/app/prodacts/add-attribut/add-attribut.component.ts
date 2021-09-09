import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IaddAttribut } from 'src/app/shard/models/IaddAttribute';
import { IupdateAttribut } from 'src/app/shard/models/IupadteAttribut';
import { IAddProdact } from 'src/app/shard/models/prodactAdd';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-add-attribut',
  templateUrl: './add-attribut.component.html',
  styleUrls: ['./add-attribut.component.css']
})
export class AddAttributComponent implements OnInit {
  public Id :any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private prodactServ: ProdactsService
  ) { }
  public errorMessage :any ;
  public subCatg :any;
  public attribute:any;

  form =new FormGroup({
    attributes:new FormArray([
    new FormGroup({
      key_ar:new FormControl( '', [Validators.required]),
      key_en:new FormControl('',[Validators.required]),
      value_en:new FormControl( '',[Validators.required]),
      value_ar:new FormControl('',[Validators.required]),
     })
    ]),
  })

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
    const DataUser: IupdateAttribut = {
      attributes: this.attributes.value,
    };
    this.prodactServ.addAttribute(this.Id,DataUser).subscribe((res: any) => {
      this.router.navigate(["/prodacts/all-prodacts"])
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
    this.Id = this.route.snapshot.paramMap.get('id')

  }

}
