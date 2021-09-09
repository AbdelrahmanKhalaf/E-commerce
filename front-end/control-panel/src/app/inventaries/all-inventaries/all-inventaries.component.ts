import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-all-inventaries',
  templateUrl: './all-inventaries.component.html',
  styleUrls: ['./all-inventaries.component.css']
})
export class AllInventariesComponent implements OnInit {
  public inventories :any
  public errorMessage:any
  constructor(private prodactServies : ProdactsService , private router : Router,private route : ActivatedRoute) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe((prams: any) => {
      if(prams.status == "all" || !prams.status){
        this.prodactServies.getInventaries().subscribe((res:any)=>{
          this.inventories = res.inventary
          console.log(res);

        },(err:any)=>{
          console.log(err);
          if (err.status === 500) {
            this.errorMessage = err.error;
          }

        })
      }
      if(prams.status && prams.status != "all"){
        this.prodactServies.filterInventariesByStatus(prams.status).subscribe((res:any)=>{
          this.inventories = res.inventary

        })
      }

    },(err:any)=>{
      console.log(err);
      if (err.status === 500) {
        this.errorMessage = err.error;
      }

    })
  }
   filter(status:any){
    this.router.navigate(['/inventaries'], { queryParams: { 'status':status,  } })

   }
}


