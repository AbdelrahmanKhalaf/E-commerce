import { Component, OnInit } from '@angular/core';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrls: ['./all-categories.component.css']
})
export class AllCategoriesComponent implements OnInit {
  public categories :any;
  public message:any =[]
  constructor(private prodactService : ProdactsService) { }

  ngOnInit(): void {
    this.prodactService.getAllCategory().subscribe((res:any)=>{
      this.categories = res.categories
    })
  }
  delete(id:any,index:any){
    this.prodactService.deleteCategory(id).subscribe((res:any)=>{

      if (index > -1) {
        this.categories.splice(index, 1);
      }
      this.message.push(res.message_en)
    })
  }

}
