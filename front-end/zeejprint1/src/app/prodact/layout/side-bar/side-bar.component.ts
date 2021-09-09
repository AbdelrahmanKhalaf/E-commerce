import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Key } from 'selenium-webdriver';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public prodactSale: any;
  public prams: any
  constructor(private router: Router, private prodactServ: ProdactsService, private route: ActivatedRoute) { }
  filterSale(sale: Number) {
    this.router.navigate([`/filter`], { queryParams: { 'sale': sale, } })
  }
  filterpriceLtAndGt(gt: Number, lt: Number) {
    this.router.navigate([`/filter`], { queryParams: { 'lt': lt, "gt": gt } })
  }
  filterpriceAttribute(value: string) {
    this.router.navigate([`/filter`], { queryParams: { 'attribute': 'color', "value": value } })
  }
  filterpriceAttributeSize(value: string) {
    this.router.navigate([`/filter`], { queryParams: { 'attribute': 'size', "value": value } })
  }
  filterAll(value: string) {
    this.router.navigate([`/filter`], { queryParams: { 'attribute': 'size', "value": value } })
  }

  // Plus(value2: any, key: any) {
  //   this.route.queryParamMap.subscribe((prams: any) => {
  //     this.prams = prams.params
  //     this.router.navigate([`/filter`], { queryParams: { attribute: prams.params.attribute || key ? prams.params.attribute : '', value: prams.params.value || value2 ? prams.params.value : '', sale: prams.params.sale || value2 ? prams.params.sale : '' }, })

  //   })

  // }
  ngOnInit(): void {

    this.prodactServ.saleProdactes().subscribe((res: any) => {
      this.prodactSale = res.prodact
      // this.prodactSale = unique
    })
  }
}
