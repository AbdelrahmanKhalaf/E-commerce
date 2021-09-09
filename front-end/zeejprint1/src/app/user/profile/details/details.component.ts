import { Component, OnInit } from '@angular/core';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private user : ProdactsService) { }
  public userDetails :any
  ngOnInit(): void {
    this.user.myInfromtion().subscribe((res:any)=>{
      this.userDetails = res.user[0]
      console.log(res);

    })
  }
  click(){
    return "hi"
  }

}
