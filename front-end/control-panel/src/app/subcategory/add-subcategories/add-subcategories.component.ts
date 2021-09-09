import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ISubCategory } from 'src/app/shard/models/ISubCategory';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-add-subcategories',
  templateUrl: './add-subcategories.component.html',
  styleUrls: ['./add-subcategories.component.css']
})
export class AddSubcategoriesComponent implements OnInit {
  constructor( private router :Router,private route :ActivatedRoute , private ProdactSe : ProdactsService) { }
  public subCatg:any
  public errorMessage :any ;
  Form = new FormGroup({

  title_ar: new FormControl(null, [
      Validators.required,
    ]),

    title_en: new FormControl(null, [
      Validators.required,
    ]),
    IdCategory: new FormControl(null, [
      Validators.required,
    ]),

  });

  get title_en() {
    return this.Form.get('title_en');
  }

  get title_ar() {
    return this.Form.get('title_ar');
  }
  get IdCategory() {
    return this.Form.get('IdCategory');
  }


  register() {
    const DataUser: ISubCategory = {
      title_ar: this.title_ar?.value,
      title_en: this.title_en?.value,
      IdCategory:this.IdCategory?.value
    };
    this.ProdactSe.addSubCategory(DataUser).subscribe((res: any) => {
      this.router.navigate(['/subcategory/all-subcategory/'])
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
        this.errorMessage = err.error.error;
      }
      if (err.error.error_en) {
        this.errorMessage = err.error.error_en;
      }
      if (err.status === 404) {
        this.errorMessage = err.error;
      }
      if (err.status === 401) {
        this.errorMessage = err.error;
      }
    })
  }

  ngOnInit(): void {    this.ProdactSe.getAllCategory().subscribe((res:any)=>{
    this.subCatg = res.categories;
    console.log(res.categories);


  })
  }

}
