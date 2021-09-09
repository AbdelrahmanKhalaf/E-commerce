import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  public Id:any;
  public errorMessage:any;
  public subCatg:any
  constructor(private prodactServer :ProdactsService , private router :Router,private route : ActivatedRoute) { }
 form = new FormGroup({
  kindOfCategory: new FormControl('',[Validators.required]),
})

get kindOfCategory(){
  return this.form.get('kindOfCategory')
}
  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id');
    this.prodactServer.getAllSubCatg().subscribe((res:any)=>{
      this.subCatg = res.categories
    })
  }
  addCategory(){
    let data:any = {
      kindOfCategory:this.kindOfCategory?.value
    }
    this.prodactServer.addCategoryToProdact(this.Id,data).subscribe((res:any)=>{
      this.router.navigate(["/prodacts/all-prodacts"])

    },(err:any)=>{
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

}
