import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-details-subcategory',
  templateUrl: './details-subcategory.component.html',
  styleUrls: ['./details-subcategory.component.css']
})
export class DetailsSubcategoryComponent implements OnInit {
  public id :any;
  public category :any
  constructor(private route : ActivatedRoute , private prodactServ : ProdactsService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.prodactServ.getSubCategory(this.id).subscribe((res:any)=>{
      this.category = res.categories[0]

    })
  }

}
