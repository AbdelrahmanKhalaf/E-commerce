import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/shard/servises/users.service';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {
  public name :any;
  public user :any;
  constructor(private route : ActivatedRoute , private router : Router , private UserServe : UsersService) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name')
    this.UserServe.getUserInfo(this.name).subscribe((res:any)=>{
      this.user = res[0]

    })
  }

}
