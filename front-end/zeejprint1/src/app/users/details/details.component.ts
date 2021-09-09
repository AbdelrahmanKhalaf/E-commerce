import { Component, OnInit } from '@angular/core';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public userDetails:any;
  constructor(private user : ProdactsService) { }

  ngOnInit(): void {
    this.user.myInfromtion().subscribe((res:any)=>{
      this.userDetails = res.user[0]
    })
  }

}
