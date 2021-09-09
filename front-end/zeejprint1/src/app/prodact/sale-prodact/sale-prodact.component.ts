import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-sale-prodact',
  templateUrl: './sale-prodact.component.html',
  styleUrls: ['./sale-prodact.component.css']
})
export class SaleProdactComponent implements OnInit {
  public sale :any ;
  public prodacts:any;
  constructor(private prodactServ : ProdactsService , private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.sale = this.route.snapshot.paramMap.get('id')
    this.prodactServ.ProdactesbySale(this.sale).subscribe((res:any)=>{
      this.prodacts = res.prodact
    })
  }

}
