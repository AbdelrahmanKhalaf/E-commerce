import { Component, OnInit } from '@angular/core';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public details:any;
  constructor(private user : ProdactsService) { }

  ngOnInit(): void {
    this.user.myInfromtion().subscribe((res:any)=>{
      this.details = res.user[0]
    },(err:any)=>{
    })
  }

}
