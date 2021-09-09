import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IaddAttribut } from 'src/app/shard/models/IaddAttribute';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-update-attribut',
  templateUrl: './update-attribut.component.html',
  styleUrls: ['./update-attribut.component.css']
})
export class UpdateAttributComponent implements OnInit {

  public Id :any;
  public IdAttribout :any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private prodactServ: ProdactsService
  ) { }
  public errorMessage :any ;
  public subCatg :any;
  public attribute:any;

  form = new FormGroup({
      key_ar:new FormControl( '', [Validators.required]),
      key_en:new FormControl('',[Validators.required]),
      value_en:new FormControl( '',[Validators.required]),
      value_ar:new FormControl('',[Validators.required]),
  })


  get key_ar(){
    return  this.form.get('key_ar');
  } get key_en(){
    return  this.form.get('key_en');
  } get value_en(){
    return  this.form.get('value_en');
  } get value_ar(){
    return  this.form.get('value_ar');
  }
  makeDone() {
    const DataUser: IaddAttribut = {
      key_ar:this.key_ar?.value,
      key_en:this.key_en?.value,
      value_ar:this. value_ar?.value,
     value_en:this.value_en?.value,

    };
    this.prodactServ.updateAttribute(this.Id,this.IdAttribout,DataUser).subscribe((res: any) => {
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
  ngOnInit(): void {
    this.IdAttribout = this.route.snapshot.paramMap.get('queryid')
    this.Id = this.route.snapshot.paramMap.get('id')
    this.prodactServ.getAttribute(this.Id,this.IdAttribout).subscribe((res:any)=>{
      this.attribute = res.attribute[0].attributes[0]
      console.log(res.attribute[0].attributes[0]);


    })
  }

}
