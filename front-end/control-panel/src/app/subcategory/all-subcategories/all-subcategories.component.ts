import { Component, OnInit } from '@angular/core';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-all-subcategories',
  templateUrl: './all-subcategories.component.html',
  styleUrls: ['./all-subcategories.component.css']
})
export class AllSubcategoriesComponent implements OnInit {
  public subCategory :any=[]
  public message:any = [ ]
  constructor(private ProdactServices : ProdactsService) { }

  ngOnInit(): void {
    this.ProdactServices.getAllSubCatg().subscribe((res:any)=>{
      this.subCategory = res.categories

    })
  }
  delete(id:any,index:any){
    this.ProdactServices.deleteSubCategory(id).subscribe((res:any)=>{
      if (index > -1) {
        this.subCategory.splice(index, 1);
      }
      this.message.push(res.message_en)
    })
  }

}
