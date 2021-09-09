import { Component, OnInit } from '@angular/core';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {
  public orders :any
  constructor(private ProdactServices : ProdactsService ) { }

  ngOnInit(): void {
    this.ProdactServices.getAllOrders().subscribe((res:any)=>{
      this.orders = res.orders

    })
  }

}
