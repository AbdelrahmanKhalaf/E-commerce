import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from 'src/app/shard/models/ICategory';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  constructor( private router :Router,private route :ActivatedRoute , private ProdactSe : ProdactsService) { }
  public errorMessage :any ;
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
    const DataUser: ICategory = {
      title_ar: this.title_ar?.value,
      title_en: this.title_en?.value,
    };
    this.ProdactSe.addCategory(DataUser).subscribe((res: any) => {
      this.router.navigate(['category/all-category'])
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
      if (err.status === 404) {
        this.errorMessage = err.error.error;
      }
      if (err.status === 401) {
        this.errorMessage = err.error.error;
      }
    })
  }

  ngOnInit(): void {
  }

}
