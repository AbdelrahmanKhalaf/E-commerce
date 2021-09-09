import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shard/services/auth.service';
import { ProdactsService } from 'src/app/shard/services/prodacts.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public token :any;
  public user :any
  constructor(public auth : AuthService,public User : ProdactsService) { }

  ngOnInit(): void {
    this.User.myInfromtion().subscribe((res:any)=>{
      this.user = res.user[0]
    })
    this.token = localStorage.getItem('token');
  }

}
