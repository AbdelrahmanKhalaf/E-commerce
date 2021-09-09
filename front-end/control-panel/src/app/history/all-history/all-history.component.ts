import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-all-history',
  templateUrl: './all-history.component.html',
  styleUrls: ['./all-history.component.css']
})
export class AllHistoryComponent implements OnInit {
  public histories: any;
  public errorMessage: any;
  public page: any
  public NumberOfPages: any = []
  public limit: any;
  public status: any;
  public prams: any;
  public number: any = [];
  public numberFilter: any = []
  public message: any = [];
  constructor(private prodactServies: ProdactsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // limit of histrory
    this.limit = Number(15);
    this.route.queryParams.subscribe((prams: any) => {
      this.prams = prams
      // count of history in page
      this.page = prams.page
      // get histroy by number of NumberOfPages
      if (prams.status == "all" || !prams.status) {
        // get limit number of pages and pages
        this.prodactServies.getAllHistory(this.limit, prams.page).subscribe((res: any) => {
          this.NumberOfPages = []
          this.histories = res.history
          res.length = Math.floor(res.length / this.limit) + 1
          if (Math.floor(res.length) % 2 == 0) {
            res.lenght = Math.floor(res.length + 1 )
          }
          if (Math.floor(res.length) % 2 == 1) {
            res.lenght = Math.floor(res.length)
          }
          if (res.lenght > this.NumberOfPages.length) {
            for (let i = 0; i < res.length; i++) {
              this.NumberOfPages.push(i)
            }
          }

        }, (err: any) => {
          if (err.status === 500) {
            this.errorMessage = err.error;
          }
        })
      }
      if (prams.status && prams.status != "all") {
        this.prodactServies.filterHistoryByStatus(prams.status, this.limit, prams.page).subscribe((res: any) => {
          this.histories = res.history
          this.NumberOfPages = []

          res.length = Math.floor(res.length / this.limit) + 1

          if (Math.floor(res.length) % 2 == 1) {
            res.lenght = Math.floor(res.length + 2)
          }
          if (Math.floor(res.length) % 2 == 0) {
            res.lenght = Math.floor(res.length )
          }
          if (res.lenght > this.NumberOfPages.length) {
            for (let i = 0; i < res.length; i++) {
              this.NumberOfPages.push(i)
            }
          }
        })
      }
    }, (err: any) => {
      if (err.status === 500) {
        this.errorMessage = err.error;
      }
    })
  }
  filter(status: any) {
    this.router.navigate(['/history/all-history'], { queryParams: { 'status': status, } })
    this.status = status
  }
  prodact(page: any) {
    this.router.navigate(['/history/all-history'], { queryParams: { 'page': page, 'limit': this.limit } })
  }
  perves() {
    if (this.page > 1 && this.NumberOfPages.length) {
      this.page = this.page - 1
    }
    this.router.navigate(['/history/all-history'], { queryParams: { "page": this.page, "limit": this.limit } })
  }
  next() {
    if (this.page >= 1 && Number(this.NumberOfPages.length) > Number(this.page)) {
      this.page = Number(this.page) + 1
      this.router.navigate(['/history/all-history'], { queryParams: { "page": this.page, "limit": this.limit } })
    }
    if (this.page == undefined) {
      this.router.navigate(['/history/all-history'], { queryParams: { "page": 1, "limit": this.limit } })
    }
  }
  prodactwithFilter(page: any) {
    this.router.navigate(['/history/all-history'], { queryParams: { 'status': this.status, 'page': page, 'limit': this.limit } })
  }
  perveswithFilter() {
    if (this.page > 1 && this.NumberOfPages.length) {
      this.page = this.page - 1
    }
    this.router.navigate(['/history/all-history'], { queryParams: { 'status': this.status, "page": this.page, "limit": this.limit } })
  }
  nextwithFilter() {
    if (this.page >= 1 && Number(this.NumberOfPages.length) > Number(this.page)) {
      this.page = Number(this.page) + 1
      this.router.navigate(['/history/all-history'], { queryParams: { 'status': this.status, "page": this.page, "limit": this.limit } })
    }
    if (this.page == undefined) {
      this.router.navigate(['/history/all-history'], { queryParams: { 'status': this.status, "page": 1, "limit": this.limit } })
    }
  }
  historyDelete(id: any, index: any) {
    this.histories.pop(index)
    this.prodactServies.deleteHistory(id).subscribe((res: any) => {
      this.message.push(res.message)

    })

  }
}
