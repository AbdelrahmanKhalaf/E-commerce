import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { dataCategory } from 'src/app/shard/models/dataCat';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-update-subcategories',
  templateUrl: './update-subcategories.component.html',
  styleUrls: ['./update-subcategories.component.css']
})
export class UpdateSubcategoriesComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private ProdactSe: ProdactsService) { }

  public errorMessage: any;
  public id: any;
  public category:any;
  Form = new FormGroup({

    title_ar: new FormControl(null, [
      Validators.required,
    ]),
    title_en: new FormControl(null, [
      Validators.required,
    ]),
  });
  get title_en() {
    return this.Form.get('title_en');
  }

  get title_ar() {
    return this.Form.get('title_ar');
  }
  register() {
    const DataUser: dataCategory = {
      title_ar: this.title_ar?.value,
      title_en: this.title_en?.value,
    };
    this.ProdactSe.updateSubCategory(DataUser, this.id).subscribe((res: any) => {
      this.router.navigate(['subcategory/all-subcategory'])
    }, (err: any) => {
      if (err.status === 502) {
        this.errorMessage = err.error.error;
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
      if (err.error.error_en) {
        this.errorMessage = err.error.error_en;
      }
      if (err.error.error_ar) {
        this.errorMessage = err.error.error.ar;
      }
      if (err.status === 404) {
        this.errorMessage = err.error.error;
      }
      if (err.status === 401) {
        this.errorMessage = err.error.error;
      }
    })
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.ProdactSe.getSubCategory(this.id).subscribe((res:any)=>{
      this.category = res.categories[0]

    })
  }

}
