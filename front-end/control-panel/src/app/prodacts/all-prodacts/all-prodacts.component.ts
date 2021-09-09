import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-all-prodacts',
  templateUrl: './all-prodacts.component.html',
  styleUrls: ['./all-prodacts.component.css']
})
export class AllProdactsComponent implements OnInit {
  public page: any
  public limit: any;
  public pages: any = []
  public prodacts :any ;
  public message :any = []

  constructor(private prodactServi: ProdactsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // to get query prams
    // this.route.queryParams.subscribe((prams:any)=>{
    //   console.log(prams);

    // })
    this.limit = 4
    this.route.queryParams.subscribe((prams: any) => {

      this.prodactServi.allProdactes(prams.page, this.limit).subscribe((res: any) => {
        // res.lenght = Math.floor(res.lenght / this.limit)
        res.lenght = res.lenght / this.limit

        if (Math.floor(res.lenght) % 2 == 1) {
          res.length = Math.floor( res.lenght )
        }
        if (Math.floor(res.lenght) % 2 == 0) {
          res.length = Math.floor( res.lenght + 1 )
        }
        if(res.length  > this.pages.length){
          for (let i = 0; i <res.lenght ; i++) {
            this.pages.push(i)
          }
        }
        this.prodacts = res.prodact
      })
      this.page = prams.page
    })
  }
  prodact(page: any) {
    this.router.navigate(['/prodacts/all-prodacts'], { queryParams: { 'page': page, 'limit': this.limit } })
  }
  perves(){
    if(this.page > 1 &&  this){
      this.page = this.page - 1
    }
    this.router.navigate(['/prodacts/all-prodacts' ],{queryParams:{"page":this.page , "limit":this.limit} })
  }
  next(){
    if(this.page >=  1 && Number(this.pages.length)  > Number(this.page) ){
      this.page = Number(this.page)+ 1
      this.router.navigate(['/prodacts/all-prodacts' ],{queryParams:{"page":this.page , "limit":this.limit} })
    }
    if(this.page == undefined){
      this.router.navigate(['/prodacts/all-prodacts' ],{queryParams:{"page":1 , "limit":this.limit} })
    }
  }
  delete(id:any,index:any,indexProdact:any,i:any){
    this.prodacts[indexProdact].attributes.pop(i)
    this.prodactServi.delateAttribute(id,index).subscribe((res:any)=>{
      this.message.push(res.message_en)
    })
  }
  prodactDelete(id:any,indexProdact:any){
    this.prodacts.pop(indexProdact)
    this.prodactServi.deleteProdact(id).subscribe((res:any)=>{
      this.message.push(res.message_en)
    })
  }
  deleteCategoryProdact(id:any ,idCategory:any,indexProdact:any , indexCategory:any){
    this.prodacts[indexProdact].kindOfCategory.pop(indexCategory)
    this.prodactServi.deleteCategoryToProdact(id,idCategory).subscribe((res:any)=>{
      this.message.push(res.message_en)
    })
  }
}

